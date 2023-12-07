import React, { useState, useEffect } from "react";
import { getListings, placeBid } from "../../lib/api";
import { RiAuctionFill } from "react-icons/ri";
import Skeleton from "../loading-skeleton";


const Card = ({ searchInput }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isFinalBid, setIsFinalBid] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsData = await getListings(searchInput);
        setListings(listingsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error.message);
        setError('Failed to fetch listings. Please try again later.');
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchInput]);
    
  

  const handleBid = async (listingId) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      // Check if the user is logged in
      if (!accessToken) {
        // Alert the user and return
        window.alert("You must be logged in to place a bid.");
        return;
      }

      if (selectedItemId === listingId) {
        setSelectedItemId(null);
        setIsFinalBid(false);
      } else {

        setSelectedItemId(listingId);
        setIsFinalBid(true);
      }

      if (bidAmount.trim() !== "" && isFinalBid) {
        const parsedBidAmount = parseFloat(bidAmount);
        if (isNaN(parsedBidAmount) || parsedBidAmount <= 0) {
          throw new Error("Invalid bid amount");
        }

        // Place the bid and wait for it to complete
        await placeBid(listingId, parsedBidAmount);

        // Refresh the listings after a successful bid
        const updatedListings = await getListings();
        setListings(updatedListings);

        // Clear the bid amount input after a successful final bid
        setBidAmount("");
        setIsFinalBid(false);
      }
    } catch (error) {
      console.error("Error handling bid:", error.message);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="card-container mx-10 my-5 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {loading ? (
        <Skeleton />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        listings.map((listing) => (
          <div key={listing.id} className="card glass">
            <figure className="relative overflow-hidden">
              {listing.media.length > 0 && (
                <img
                  src={listing.media[0]}
                  alt={listing.title || "Listing Image"}
                  className="card-image w-full h-64 object-cover"
                />
              )}
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-xl font-semibold mb-2">
                {listing.title}
              </h2>
              <p className="card-text text-gray-700 mb-4" style={{ overflow: 'hidden', maxHeight: '100px' }}>
                {listing.description}
              </p>
      
              <div className="indicator">
                <span className="indicator-item badge badge-secondary bg-green-500">
                  {listing._count?.bids || 0}
                </span>
                <button className="btn ">Bids</button>
              </div>
              <div className="digital-clock p-2 rounded">
                <p className="font-mono text-lg">{listing.endsAt}</p>
              </div>
              <div className="card-actions flex justify-end mt-4">
                <button
                  onClick={() => handleBid(listing.id)}
                  className="btn btn-primary transform hover:scale-105 transition-transform duration-300"
                >
                  Bid <RiAuctionFill />
                </button>
              </div>
              {selectedItemId === listing.id && (
                <div className="bid-input-container mb-4">
                  <input
                    type="text"
                    placeholder="Enter bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="input input-bordered  w-full max-w-xs"
                  />
                  {isFinalBid && (
                    <button
                      onClick={() => handleBid(listing.id)}
                      className="btn btn-ghost mt-2"
                    >
                      <RiAuctionFill /> Final Bid
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Card;
