import { useEffect, useState } from 'react'
import './PostCard.css'
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, addDoc, collection, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import FilledHeart from '../assets/filledHeart.png'
import UnfilledHeart from '../assets/unfilledHeart.png'
import Comments from '../assets/comments.png'
import DefaultAvatar from '../assets/default-avatar.jpg'
export default function PostCard(props){

    const [showMenu, setShowMenu] = useState(false);
    const naviagte = useNavigate();
    const [comments, setComments] = useState([]);


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

    function timeAgo(timestamp){
        if(!timestamp) return ""
        const now = new Date()
        const postTime = new Date(timestamp.seconds*1000)
        const diff = Math.floor((now-postTime)/1000)

        if(diff < 60) return `${diff}s ago`
        if(diff < 3600) return `${Math.floor(diff/60)}m ago`
        if(diff < 86400) return `${Math.floor(diff/3600)}h ago`
        if(diff < 2592000) return`${Math.floor(diff/86400)}d ago`
        if(diff < 31536000) return `${Math.floor(diff / 2592000)}mo`
        return `${Math.floor(diff / 31536000)}y`

    }

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "posts", props.id, "comments"),
            (snapshot) =>{
                const commentsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setComments(commentsData)
            }
        )
        return unsubscribe
    }, [])

    return(
        <div className="feed-container" onClick={() => setShowMenu(false)}>
            <div className="profile-info" onClick={() => naviagte(`/profile/${props.uid}`)}>
                <img src={props.profilePic || DefaultAvatar} />
                <h2>{props.username}</h2>
            </div>
            <div className='post-header-right'>
                    <span className='post-time'>{timeAgo(props.createdAt)}</span>
                    {props.uid === props.currentUserUid && 
                        <button onClick={(e) => {e.stopPropagation(); toggleShowMenu()}} className='menu-button'>⋮</button>}
            </div>
            
                
            {showMenu &&
                <div className='menu-btns-container'>
                    <button>Hide</button>
                    <button onClick={handleDelete} style={{color: "#F08080"}}>Delete</button>
                </div>}
            <div className="feed-content">
                <h1>{props.gameName}</h1>
                <h2>Level {props.level}</h2>
                <h2>Mic: {props.mic}</h2>
                <h2>Username: {props.gameUsername}</h2>
                
            </div>
            <div className='post-actions'>
                <button onClick={handleLike} className='like-btn'>
                    <img src={props.likes?.includes(props.currentUserUid) ? FilledHeart : UnfilledHeart} alt="Like" />
                    {props.likes?.length || 0}
                </button>
                <button onClick={(e) => {e.stopPropagation(); naviagte(`/post/${props.id}`)}} className='comments-btn'>
                    <img src={Comments} alt="comments" />
                    {comments.length}
                </button>
            </div>


            <div className='comments-list'>
                {comments.slice(0, 3).map((comment, index) => (
                    <div key={index} className='comment-item'>
                        <span className='comment-username'>@{comment.username}</span>
                        <p>{comment.text}</p>
                    </div>
                ))}
        
                {comments.length > 3 &&
                    <p className='view-all-comments' onClick={(e) => {e.stopPropagation(); naviagte(`/post/${props.id}`)}}>
                        View all {comments.length} comments</p>
                }
            </div>

           
            
        </div>
    )
}
