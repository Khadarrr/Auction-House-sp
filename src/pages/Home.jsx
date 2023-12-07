import "../App.css";
import Navbar from "../components/navbar/index";
import Card from "../components/card";
import Image from "../assets/H-img.jpg";
import AuctionImage from "../assets/auction.jpeg";
import { Link } from "@tanstack/react-router";
import CreateAuction from "../components/create-post";
import { useState } from "react";


export default function Homepage() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <nav  className="glass">
      <Navbar setSearchInput={setSearchInput} />
      </nav>
      <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url(${Image})` }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={AuctionImage} className="max-w-sm rounded-lg shadow-2xl" alt="Background" />
        <div>
        <h1 className="text-5xl  font-bold">Welcome to Auction Sphere!</h1>
        <p className="py-6">
              Explore and bid on a variety of items from sellers worldwide. Auction Sphere brings you exciting and diverse bidding experiences. Whether you're a seasoned bidder or new to auctions, discover, bid, and win with us.
            </p>
            <Link to="/register">
          <button className="btn btn-primary">Get Started</button>
          </Link>
          <button className="btn m-2 btn-primary"><CreateAuction/></button>
        </div>
      </div>
    </div>
    <main>
    <div className=" text-center py-8">
      <h1 className="text-3xl font-semibold">Recent Auctions</h1>
    </div>
    <div className=" container mx-auto mt-8">
        <Card searchInput={searchInput} />
      </div>
        
        </main>
      
      
    
    </>
  );
}
