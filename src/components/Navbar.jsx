import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";

export default function Navbar(){

    async function handleSignIn(){
        const result = await signInWithPopup(auth, provider)
        console.log(result.user);
    }
    
    return(
        <nav>
        <h1>MatchUp</h1>
        <button onClick={handleSignIn}>Sign in with Google</button>
    </nav>
    );
}