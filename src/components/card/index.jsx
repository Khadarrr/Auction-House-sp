import React, { useState, useEffect } from "react";
import { getListings } from "../../lib/api";
import { RiAuctionFill } from "react-icons/ri";
import Skeleton from "../loading-skeleton";

const Card = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsData = await getListings();
        setListings(listingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error.message);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="card-container mx-10 my-5 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading ? ( // Display skeleton loader while loading is true
        <Skeleton />
      ) : (
        listings.map((listing) => (
          <div key={listing.id} className="card glass">
            <figure className="relative overflow-hidden">
              {/* Assuming the first image is the primary image */}
              {listing.media.length > 0 && (
                <img
                  src={listing.media[0]}
                  alt={listing.title}
                  className="card-image w-full h-48 object-cover"
                />
              )}
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold mb-2">
                {listing.title}
              </h2>
              <p className="card-text text-gray-700 mb-4">
                {listing.description}
              </p>
              <div className="card-actions flex justify-end">
                <button className="btn btn-primary transform hover:scale-105 transition-transform duration-300">
                  Bid <RiAuctionFill />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Card;
