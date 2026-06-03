import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";



export default function CreateUsername({ user, setNeedsUsername }){
    const [username, setUsername] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        await setDoc(doc(db, "users", user.uid), {
            username,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: serverTimestamp()
        });
    }

   

    return(
        <div>
            <h1>Choose a username</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="@Username" />
                <button type="submit">
                    Continue
                </button>
            </form>
        </div>
    )
}