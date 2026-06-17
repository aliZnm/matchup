import PostCard from "./PostCard";
import Profile from "../assets/profile.jpg"
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
        profilePic={post.profilePic}
        username={post.username}
        gameName={post.gameName}
        level={post.level}
        mic={post.mic ? "yes" : "no"}
        gameUsername={post.gameUsername}
        date={post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : ""}
        activeTab={activeTab}
        uid={post.uid}
        currentUserUid={user.uid}
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
              <button className={activeTab === "friends" ? "active-tab" : ""} onClick={() => setActiveTab("friends")}>Friends</button>
              <button className={activeTab === "myPosts" ? "active-tab" : ""} onClick={() => setActiveTab("myPosts")}>My Posts</button>
            </div>

             <div className="feed">
               {postElements}
            </div>
        </div>
        </>
      )
}