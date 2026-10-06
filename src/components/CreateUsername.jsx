import { useState } from "react";
import { db } from "../firebase";
import { doc, getDocs, setDoc, serverTimestamp, query, collection, where } from "firebase/firestore";
import './CreateUsername.css'


export default function CreateUsername({ user, setNeedsUsername, username }){
    const [usernameInput, setUsernameInput] = useState("");
    const [error, setError] = useState("")
    async function handleSubmit(e) {
        e.preventDefault();
        const usernameQuery = query(
            collection(db, "users"),
            where("username", "==", usernameInput)
        )
        const snapshot = await getDocs(usernameQuery)

        if(!snapshot.empty){
            setError("Username already taken!")
            return
        }
        await setDoc(doc(db, "users", user.uid), {
            username: usernameInput,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: serverTimestamp()
        });
        setNeedsUsername(false);
    }

   

    return(
        <div className="username-container">
            <div className="username-card">
                <h1>Choose a username</h1>
                <p>This is how other players will find you</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <span>@</span>
                        <input type="text" onChange={(e) => setUsernameInput(e.target.value)} placeholder="username" />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                  <button type="submit">
                    Continue
                 </button>
             </form>
            </div>
        </div>
    )
}