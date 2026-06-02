import PostCard from "./PostCard";
import Profile from "../assets/profile.jpg"
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import CreatePost from "./CreatePost";

export default function Feed(){

    const [posts, setPosts] = useState([]);
    useEffect(() =>{
        async function fetchPosts(){
            onSnapshot(collection(db, "posts"), (snapshot) =>{
                const postsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setPosts(postsData)
            })
            
           
        }
        fetchPosts()
    }, []);


      const postElements = posts.map((post, index) => {
        return  <PostCard 
        key={index}
        profilePic={post.profilePic}
        username={post.username}
        gameName={post.gameName}
        level={post.level}
        mic={post.mic ? "yes" : "no"}
        gameUsername={post.gameUsername}
        date={post.date}
        />
      });

      return(
        <>
        <CreatePost />
        <div>
            {postElements}
        </div>
        </>
      )
}