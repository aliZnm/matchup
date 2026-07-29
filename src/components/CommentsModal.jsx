import { collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function CommentsModal({ postId, onClose, currentUserUid, username }){

    const [comments, setComments] = useState([]);

    useEffect(() =>{
        const unsubscribe = onSnapshot(
            collection(db, "posts", postId, "comments"),
            (snapshot) =>{
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setComments(data)
            }
        )
        return unsubscribe
    }, []);


    async function handleCommentSubmit(formData) {
        const comment = formData.get("comment")
        if(!comment) return
        await addDoc(collection(db, "posts", postId, "comments"), {
            text: comment,
            username: username,
            uid: currentUserUid,
            createdAt: serverTimestamp()
        })
    }



    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>x</button>
                <h2>Comments</h2>
                <div className="comments-modal-list">
                    {comments.length === 0
                        ? <p className="no-comments">No comments yet</p>
                        : comments.map((comment, index) =>(
                            <div key={index} className="comment-item">
                                <span className="comment-username">@{comment.username}</span>
                                <p>{comment.text}</p>
                            </div>
                        ))
                    }
                </div>
                <form action={handleCommentSubmit}>
                    <input type="text" name="comment" placeholder="Write a comment..." />
                    <button type="submit">Post</button>
                    </form>
            </div>
        </div>
    )
}