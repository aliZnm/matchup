import PostCard from "./PostCard";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import CreatePost from "./CreatePost";
import './Feed.css'
export default function Feed({ user, username }){
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState("explore");

    useEffect(() =>{
        async function fetchPosts(){
            onSnapshot(collection(db, "posts"), (snapshot) =>{
                const postsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                })).sort((a, b) => {
                    const timeA = a.createdAt?.seconds || 0
                const timeB = b.createdAt?.seconds || 0
            return timeB - timeA
        })
                setPosts(postsData)
            })
            
           
        }
        fetchPosts()
    }, []);

    function closeForm(){
        setShowForm(false);
    }

    const filteredPosts = posts.filter(post => {
        if(activeTab === "myPosts") return post.uid === user.uid
        return true
    });

   


      const postElements = filteredPosts.map((post, index) => {
        return  <PostCard 
        key={index}
        profilePic={post.photoURL}
        username={post.username}
        gameName={post.gameName}
        level={post.level}
        mic={post.mic ? "yes" : "no"}
        gameUsername={post.gameUsername}
        date={post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : ""}
        activeTab={activeTab}
        uid={post.uid}
        currentUserUid={user.uid}
        id={post.id}
        likes={post.likes}
        createdAt={post.createdAt}
        />
      });

      return(
        <>
        <div className="feed-header">
            <h2>Find your next squad!</h2>
            <p>Post your game and connect with players ready to match up</p>
            <button onClick={() => setShowForm(prev => !prev)}>+ New Post</button>
        </div>
        {showForm && 
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={() => setShowForm(false)} className="close-btn">X</button>
                <CreatePost 
                closeForm={closeForm}
                user={user} 
                username={username}/>
            </div>
        </div>
        }
        <div className="feed-container-wrapper">
            <div className="tabs">
              <button className={activeTab === "explore" ? "active-tab" : ""} onClick={() => setActiveTab("explore")}>Explore</button>
              <button className={activeTab === "myPosts" ? "active-tab" : ""} onClick={() => setActiveTab("myPosts")}>My Posts</button>
            </div>

             <div className="feed">
               {activeTab === "myPosts" && filteredPosts.length === 0
               ? <p className="no-posts-text">You haven't made any posts yet.</p>
               : postElements}
            </div>

        </div>
        </>
      )
}