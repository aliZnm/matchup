import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import ProfilePic from "../assets/default-avatar.jpg"
import './Profile.css'
export default function Profile(){
    const { uid } = useParams()
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        async function fetchProfile(){
            const userRef = doc(db, "users", uid)
            const userSnap = await getDoc(userRef)
            if(userSnap.exists()){
                setProfileData(userSnap.data())
            }
        }
        fetchProfile()
    }, [uid])
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
                <p className="profile-description">No description yet.</p>
            </div>
        </div>
    );
}