import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, doc, getDocs, getDoc, query, where } from "firebase/firestore";
import { useState, useEffect, use } from "react";
import ProfilePic from "../assets/default-avatar.jpg"
import './Profile.css'
import './PostCard.css'
import { updateDoc } from "firebase/firestore";

export default function Profile({currentUserUid}){
    const { uid } = useParams()
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState(null);
    const [posts, setPosts] = useState([]);
    const isOwnProfile = uid === currentUserUid
    const [editingDescription , setEditingDescription] = useState(false);
    const [descriptionInput, setDescriptionInput] = useState("");
    
    
    useEffect(() => {
        async function fetchProfile(){
            const userRef = doc(db, "users", uid)
            const userSnap = await getDoc(userRef)
            if(userSnap.exists()){
                setProfileData(userSnap.data())
            }
        }
        async function fetchPosts(){
            const q = query(collection(db, "posts"), where("uid", "==", uid))
            const snapshot = await getDocs(q)
            const postsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setPosts(postsData)
        }
        fetchProfile()
        fetchPosts()
    }, [uid])

    async function handleSaveDescription() {
        await updateDoc(doc(db, "users", uid), {
            description: descriptionInput
        })    
        setProfileData(prev => ({...prev, description: descriptionInput}))    
        setEditingDescription(false);
    }

    if(!profileData) return <h1>Loading..</h1>
    
    return(
        <div className="profile-page">
            <div className="profile-card">
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
                <div className="profile-pic-container">
                    <img src={ProfilePic} alt="profile picture" />
                </div>
                <h1 className="profile-username">@{profileData?.username}</h1>
                <p className="profile-joined">Member since {profileData?.createdAt ? new Date(profileData.createdAt.seconds * 1000).toLocaleDateString() : "Unknown"}</p>

                {editingDescription
                    ? <div className="edit-description">
                        <textarea
                        value={descriptionInput}
                        onChange={(e) => setDescriptionInput(e.target.value)}
                        placeholder="Write something about yourself..."
                        />
                        <div className="edit-btn-group">
                            <button onClick={handleSaveDescription}>Save</button>
                            <button onClick={() => setEditingDescription(false)}>Cancel</button>
                        </div>
                    </div>
                    : <>
                        <p className="profile-description">
                            {profileData?.description || "No description"}
                        </p>
                        
                        {isOwnProfile && <button className="edit-btn" onClick={() => {
                            setDescriptionInput(profileData?.description || "")
                            setEditingDescription(true)
                        }}>Edit Description</button>}
                        </>
                }

            </div>

            <div className="profile-posts">
                <h2>Posts</h2>
                {posts.length === 0
                ? <p>No posts yet.</p>
            : posts.map((post, index) => (
                <div key={index} className="feed-container">
                    <div className="profile-info">
                        <img src={ProfilePic} alt="profile picture" />
                        <h2>{profileData?.username}</h2>
                    </div>
                    <div className="feed-content">
                        <h1>{post.gameName}</h1>
                        <h2>Level {post.level}</h2>
                        <h2>Mic: {post.mic}</h2>
                        <h2>{post.gameUsername}</h2>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}