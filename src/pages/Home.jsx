import "../App.css";
import Navbar from "../components/navbar/index";
import Card from "../components/card";
import Image from "../assets/H-img.jpg";
import AuctionImage from "../assets/auction.jpeg";


export default function Homepage() {
  return (
    <>
      <nav  className="glass">
        <Navbar />
      </nav>
      <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url(${AuctionImage})` }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={Image} className="max-w-sm rounded-lg shadow-2xl" alt="Background" />
        <div>
        <h1 className="text-5xl text-black font-bold">Welcome to Auction Sphere!</h1>
        <p className="py-6 text-black">
              Explore and bid on a variety of items from sellers worldwide. Auction Sphere brings you exciting and diverse bidding experiences. Whether you're a seasoned bidder or new to auctions, discover, bid, and win with us.
            </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
      <main>
      <Card/>
      </main>
    </>
  );
}
