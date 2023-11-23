import "../App.css";
import Navbar from "../components/navbar/index";
import Card from "../components/card";
import Image from "../assets/H-img.jpg";
export default function Homepage() {
  return (
    <>
      <nav className="glass">
        <Navbar />
      </nav>
     <img src={Image} alt="" className="w-full h-96 object-cover" />
      <main>
      <Card/>
      </main>
    </>
  );
}
