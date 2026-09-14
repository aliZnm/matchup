import { auth, provider } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import './Login.css'
import GoogleLogo from '../assets/google-logo.webp'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate()

    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleGoogleSignIn(){
        await signInWithPopup(auth, provider);
        navigate('/')
    }

    async function handleEmailAuth(e){
        e.preventDefault()
        setError("")

        try{
            if(isSignUp){
                await createUserWithEmailAndPassword(auth, email, password)
            } else{
                await signInWithEmailAndPassword(auth, email, password)
            }
            navigate('/')
        } catch(err){
            setError(err.message)
        }
    }

    return(
        <div className="login-page">
            <div className="animated-background">
                <div className="orb orb1"></div>
                <div className="orb orb2"></div>
                <div className="orb orb3"></div>
            </div>
            <div className="login-content">
                <div className="login-top">
                        <h1 className="login-logo">MatchUp</h1>
                        <p className="login-tagline">Find your squad. Play together</p>
                        <p className="login-desc">Connect with gamers, post your game, and find players ready to match up!</p>
                </div>
                <div className="login-card">
                    <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
                    {error && <p className="login-error">{error}</p>}
                    <form onSubmit={handleEmailAuth}>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>

                        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
                    </form>

                    <div className="or-text">
                        <span>OR</span>
                    </div>
                    <button onClick={handleGoogleSignIn} className="google-button">
                        <img src={GoogleLogo} alt="Google" />
                        Continue with Google
                    </button>
                </div>
                
                <p className="login-switch">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    <span onClick={() => setIsSignUp(prev => !prev)}>{isSignUp ? " Sign In" : " Sign Up"}</span>
                </p>
            </div>
        </div>
    )
}