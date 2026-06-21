import { useState } from 'react'
import './PostCard.css'
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import FilledHeart from '../assets/filledHeart.png'
import UnfilledHeart from '../assets/unfilledHeart.png'

export default function PostCard(props){

    const [showMenu, setShowMenu] = useState(false);
    const naviagte = useNavigate()

    async function handleLike(e){
        e.stopPropagation()
        const postRef = doc(db, "posts", props.id)
        const alreadyLiked = props.likes?.includes(props.currentUserUid)
        if(alreadyLiked){
            await updateDoc(postRef, {
                likes: arrayRemove(props.currentUserUid)
            })
        } else{
            await updateDoc(postRef, {
                likes: arrayUnion(props.currentUserUid)
            })
        }
    }


    function toggleShowMenu(){
        setShowMenu(prev => !prev);
    }


    function handleDelete(){
        deleteDoc(doc(db, "posts", props.id));
    }

    return(
        <div className="feed-container" onClick={() => setShowMenu(false)}>
            <div className="profile-info" onClick={() => naviagte(`/profile/${props.uid}`)}>
                <img src={props.profilePic} />
                <h2>{props.username}</h2>
            </div>
            {props.uid === props.currentUserUid && 
                <button onClick={(e) => {e.stopPropagation(); toggleShowMenu()}} className='menu-button'>⋮</button>}
                
            {showMenu &&
                <div className='menu-btns-container'>
                    <button>Hide</button>
                    <button onClick={handleDelete} style={{color: "#F08080"}}>Delete</button>
                </div>}
            <div className="feed-content">
                <h1>{props.gameName}</h1>
                <h2>Level {props.level}</h2>
                <h2>Mic: {props.mic}</h2>
                <h2>{props.gameUsername}</h2>
                <h3>{props.date}</h3>
            </div>
            <div className='post-actions'>
                <button onClick={handleLike} className='like-btn'>
                    <img src={props.likes?.includes(props.currentUserUid) ? FilledHeart : UnfilledHeart} alt="Like" />
                    {props.likes?.length || 0}
                </button>
            </div>
        </div>
    )
}
