import Navbar from "../components/navbar";
import Footer from "../components/footer";
import UserProfile from "../components/user-profile";

export default function profilePage() {
    return (
        <>
        <nav><Navbar/></nav>
        
        <main><UserProfile/></main>
         <footer>
            <Footer/>
         </footer>
        </>
    )
}