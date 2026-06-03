import './PostCard.css'
export default function PostCard(props){
    return(
        <div className="feed-container">
            <div className="profile-info">
                <img src={props.profilePic} />
                <h2>{props.username}</h2>
            </div>
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
