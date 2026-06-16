import { useState } from 'react'
import './PostCard.css'
export default function PostCard(props){

    const [showMenu, setShowMenu] = useState(false);
    function toggleShowMenu(){
        setShowMenu(prev => !prev);
    }

    return(
        <div className="feed-container" onClick={() => setShowMenu(false)}>
            <div className="profile-info">
                <img src={props.profilePic} />
                <h2>{props.username}</h2>
            </div>
            {props.uid === props.currentUserUid && 
                <button onClick={(e) => {e.stopPropagation(); toggleShowMenu()}} className='menu-button'>⋮</button>}
                
            {showMenu &&
                <div className='menu-btns-container'>
                    <button>Hide</button>
                    <button style={{color: "#F08080"}}>Delete</button>
                </div>}
            <div className="feed-content">
                <h1>{props.gameName}</h1>
                <h2>Level {props.level}</h2>
                <h2>Mic: {props.mic}</h2>
                <h2>{props.gameUsername}</h2>
                <h3>{props.date}</h3>
            </div>
        </div>
    )
}
