import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
export default function Login(){
    
    async function handleSignIn(){
        const result = await signInWithPopup(auth, provider)
        console.log(result.user);
    }

    return(
        <div className="login-container">
            <h1>Ready to match with new friends?</h1>
            <button onClick={handleSignIn}>Sign in  with Google</button>
        </div>
    )
}