import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import DefaultAvatar from '/src/assets/default-avatar.jpg'
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
export default function Navbar({ user }){

    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)

    async function handleLogOut() {
        await signOut(auth)
        
    }
   
    return(
        <nav>
        <h1>MatchUp</h1>
        <div className='nav-profile' onClick={(e)=> {e.stopPropagation(); setShowMenu(prev => !prev)}}>
            <img src={user?.photoURL || DefaultAvatar} alt="profile picture" className='nav-avatar' />
            {showMenu &&
            <div className=' nav-menu'>
                <button onClick={()=> navigate(`/profile/${user?.uid}`)}>View Profile</button>
                <button onClick={handleLogOut}>Log Out</button></div>}
        </div>
    </nav>
    );
}