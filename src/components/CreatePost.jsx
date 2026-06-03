import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import './CreatePost.css'
export default function CreatePost(props){
    async function handleSubmit(formData){
        
        const data = Object.fromEntries(formData)
         await addDoc(collection(db, "posts"), {
        gameName: data.gameName,
        level: data.level,
        mic: data.mic,
        gameUsername: data.gameUsername,
        date: new Date().toLocaleDateString()
    })
    } 
    return(

        <div className="post-form-container">
            <button onClick={props.closeForm}>X</button>
            <form action={handleSubmit}>
            <label>Game Name</label>
            <input type="text" name="gameName" placeholder="e.g. Valorant"/>
            
            <label>Rank / Level</label>
            <input type="text" name="level" placeholder="e.g. Gold, Diamond"/>
        
    
            <label>Game Username</label>
            <input type="text" name="gameUsername" placeholder="Your in-game name"/>

            <div className="mic-row">
            <label>Mic</label>
                <input type="checkbox" name="mic" value="Yes" defaultChecked/>
            </div>

            <button onClick={props.closeForm}>Post</button>
        </form>
        </div>
    )
}