import React, { useState, useEffect } from "react";
import { getListings, placeBid } from "../../lib/api";
import { RiAuctionFill } from "react-icons/ri";
import Skeleton from "../loading-skeleton";

// ... (your existing imports)

const Card = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isFinalBid, setIsFinalBid] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsData = await getListings();
        setListings(listingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error.message);
        setError("Failed to fetch listings. Please try again later.");
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleBid = async (listingId) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      // Check if the user is logged in
      if (!accessToken) {
        // Redirect to the login page or show an error message
        console.error("User is not logged in. Please log in to place a bid.");
        // You can redirect to the login page or show an error message to the user
        return;
      }

      // If the selected item is the same as the current one, toggle off the bid input
      if (selectedItemId === listingId) {
        setSelectedItemId(null);
        setIsFinalBid(false);
      } else {
        // Otherwise, toggle on the bid input for the current item
        setSelectedItemId(listingId);
        setIsFinalBid(true);
      }

      // If there's a bid amount and it's the final bid, place the bid
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
    <div className="card-container mx-10 my-5 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
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
              <p className="card-text text-gray-700 mb-4">
                {listing.description}
              </p>
              <div className="seller-info mb-4">
                {listing.seller ? (
                  <>
                    <p>Seller: {listing.seller.name || "Unknown"}</p>
                    <img
                      src={listing.seller.avatar}
                      alt={`Avatar of ${listing.seller.name || "Unknown"}`}
                      className="w-8 h-8 rounded-full"
                    />
                  </>
                ) : (
                  <p>Seller information not available</p>
                )}
              </div>
              <div className="indicator">
                <span className="indicator-item badge badge-secondary bg-green-500">
                  {listing._count?.bids || 0}
                </span>
                <button className="btn ">Bids</button>
              </div>
              <div className="digital-clock text-white p-2 rounded">
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
