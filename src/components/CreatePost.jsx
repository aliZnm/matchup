import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import './CreatePost.css'
import { useState } from "react";
export default function CreatePost({ user, username, closeForm }){
    const [errMessage, setErrMessage] = useState(false);

    
    async function handleSubmit(formData){
        const data = Object.fromEntries(formData)
        
        if(!data.gameName || !data.level || !data.gameUsername){
            setErrMessage(true);
            return
        }

         await addDoc(collection(db, "posts"), {
        uid: user.uid,
        username: username,
        photoURL: user.photoURL,
        gameName: data.gameName,
        level: data.level,
        mic: data.mic,
        gameUsername: data.gameUsername,
        createdAt: serverTimestamp()
    })
    closeForm()
    } 
    return(

        <div className="post-form-container">
            <form action={handleSubmit}>
            <label>* Game Name</label>
            <input type="text" name="gameName" placeholder="e.g. Valorant"/>
            
            <label>Rank / Level</label>
            <input type="text" name="level" placeholder="e.g. Gold, Diamond"/>
        
    
            <label>* Game Username</label>
            <input type="text" name="gameUsername" placeholder="Your in-game name"/>
                        
            <div className="mic-row">
            <label>Mic</label>
                <input type="checkbox" name="mic" value="Yes" defaultChecked/>
            </div>
            {errMessage && <p className="error-message">Please fill all required fields.</p>}


            <button type="submit">Post</button>
        </form>
        </div>
    )
}