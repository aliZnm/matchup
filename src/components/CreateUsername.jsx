import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import './CreateUsername.css'


export default function CreateUsername({ user, setNeedsUsername, username }){
    const [usernameInput, setUsernameInput] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
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
                  <button type="submit">
                    Continue
                 </button>
             </form>
            </div>
        </div>
    )
}