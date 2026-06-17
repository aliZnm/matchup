import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Feed from './components/Feed'
import { useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Login from './components/Login'
import './App.css'
import { doc, getDoc } from 'firebase/firestore'
import CreateUsername from './components/CreateUsername'
import Profile from './components/Profile'

export default function App() {
  const [user, setUser] = useState({displayName: "Abdul"});
  const [loading, setLoading] = useState(true);
  const [needsUsername, setNeedsUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if(currentUser){
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
       
        if(userSnap.exists()){
          setUsername(userSnap.data().username)

      
        }
        setNeedsUsername(!userSnap.exists());
      }

      setLoading(false)
    });
    return unsubscribe;
  }, []);

  if(loading){
    return <h1>Loading...</h1>;
  }

  if(!user){
    return <Login />;
  }

  if(needsUsername){
    return (
    <CreateUsername 
    user={user}
    setNeedsUsername={setNeedsUsername}
    />);
  }

  


  return (
   <>
   <Navbar />
   <Routes>
      <Route path="/" element={<Feed user={user} username={username}/>} />
      <Route path="/profile/:uid" element={<Profile />}/>
   </Routes>

   </>
  )
}

