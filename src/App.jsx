import Navbar from './components/Navbar'
import Feed from './components/Feed'
import { useEffect, useState } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Login from './components/Login'
import './App.css'

export default function App() {
  const [user, setUser] = useState({displayName: "Abdul"});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
  }, []);

  

  


  return (
   <>
   <Navbar />
   <Feed />
   </>
  )
}

