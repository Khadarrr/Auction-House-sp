import Navbar from "../components/navbar";
import CreatePost from "../components/create-post";
import UserProfile from "../components/user-profile";

export default function profilePage() {
    return (
        <>
        <nav><Navbar/></nav>
        
        <main><UserProfile/></main>
        
        </>
    )
}