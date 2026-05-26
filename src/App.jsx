import Navbar from './components/Navbar'
import PostCard from './components/PostCard'
import Profile from "./assets/profile.jpg"
import './App.css'

export default function App() {
  const posts = [{
    profilePic: Profile,
    username: "abdul",
    gameName: "Game Name",
    level: 3,
    mic: true,
    gameUsername: "abdul",
    date: "1-3-2020"
  },
  {
    profilePic: Profile,
    username: "abooood",
    gameName: "Game Name2",
    level: 4,
    mic: false,
    gameUsername: "ali",
    date: "1-3-2026"
  }];

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
  })


  return (
   <>
   <Navbar />
   {postElements}
   </>
  )
}

