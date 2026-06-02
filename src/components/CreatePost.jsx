import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreatePost(){
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
        <form action={handleSubmit}>
            <input type="text" name="gameName" placeholder="Game Name"/>
            <input type="text" name="level" placeholder="Level"/> 
            <label><input type="radio" name="mic" value="Yes"/>Yes</label>
            <label><input type="radio" name="mic" value="No"/>No</label>
            <input type="text" name="gameUsername" placeholder="Game Username"/>
            <button>Post</button>
        </form>
    )
}