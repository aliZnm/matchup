import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { doc, getDoc, collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import './PostPage.css'
import FilledHeart from '../assets/filledHeart.png'
import UnfilledHeart from '../assets/unfilledHeart.png'
import ProfilePic from "../assets/default-avatar.jpg"

export default function PostPage({ user, username }){
    const { postId } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])

    useEffect(() => {
        async function fetchPost(){
            const postRef = doc(db, "posts", postId)
            const postSnap = await getDoc(postRef)
            if(postSnap.exists()){
                setPost({ id: postSnap.id, ...postSnap.data() })
            }
        }
        fetchPost()

        const unsubscribe = onSnapshot(
            collection(db, "posts", postId, "comments"),
            (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setComments(data)
            }
        )
        return unsubscribe
    }, [postId])

    if(!post) return <h1>Loading...</h1>

    async function handleCommentSubmit(formData){
    const comment = formData.get("comment")
    if(!comment) return
    await addDoc(collection(db, "posts", postId, "comments"), {
        text: comment,
        username: username,
        uid: user.uid,
        photoURL: user.photoURL,
        createdAt: serverTimestamp()
    })
}

    return(
    <div className="post-page">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        
        <div className="post-page-content">
            <div className="profile-info">
                <img src={post.photoURL || ProfilePic} alt="profile" />
                <h2>@{post.username}</h2>
            </div>
            <div className="feed-content">
                <h1>{post.gameName}</h1>
                <h2>Level {post.level}</h2>
                <h2>Mic: {post.mic}</h2>
                <h2>{post.gameUsername}</h2>
            </div>
            <div className="post-actions">
                <button className="like-btn">
                    <img src={post.likes?.includes(user?.uid) ? FilledHeart :  UnfilledHeart} alt='like'/>
                     {post.likes?.length || 0}
                </button>
                <form action={handleCommentSubmit} className="comment-form">
                    <input type="text" name="comment" placeholder="Write a comment..." />
                    <button type="submit">Post</button>
                </form>
            </div>
            <div className="comments-section">
                {comments.length === 0 
                    ? <p className="no-comments">No comments yet</p>
                    : comments.map((comment, index) => (
                        <div key={index} className="comment-item">
                            <div className='comment-profile'>
                                <img src={comment.photoURL || ProfilePic} alt="profile" />
                                <span className="comment-username">@{comment.username}</span>
                            </div>
                            <p className='comment-text'>{comment.text}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
)
}