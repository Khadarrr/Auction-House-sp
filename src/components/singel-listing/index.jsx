import React, { useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { getListingById, placeBid } from '../../lib/api';
import { RiAuctionFill } from 'react-icons/ri';

const SingleListing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidLoading, setBidLoading] = useState(false);
  const [bidError, setBidError] = useState(null);
  const [isFinalBid, setIsFinalBid] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingData = await getListingById(id);
        listingData.endsAt = new Date(listingData.endsAt).toLocaleString();
        setListing(listingData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listing:', error.message);
        setError('Failed to fetch listing. Please try again later.');
        setLoading(false);
      }
    };
  
    fetchListing();
  }, [id]);
  

  const handlePlaceBid = async () => {
    try {
      setBidLoading(true);
      setBidError(null);
  
      // Validate bid amount
      if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= 0) {
        setBidError('Please enter a valid bid amount.');
        setBidLoading(false);
        return;
      }
  
      // Place bid
      const bidResponse = await placeBid(id, parseFloat(bidAmount)); // Parse bid amount as a float
  
      // Check bid response
      if (bidResponse.success) {
        // Bid placed successfully, update listing data
        const updatedListing = await getListingById(id);
        setListing(updatedListing);
      } else {
        setBidError('Failed to place bid. Please try again later.');
      }
    } catch (error) {
      console.error('Error placing bid:', error.message);
      setBidError('Failed to place bid. Please try again later.');
    } finally {
      setBidLoading(false);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card-container mx-10 my-5 grid gap-8 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
    <div className='card glass  p-8 rounded-lg  items-center shadow-lg'>
      <figure className="relative overflow-hidden">
        {listing.media.length > 0 && (
          <img
            src={listing.media[0]}
            alt={listing.title || "Listing Image"}
            className="w-full object-cover rounded-lg shadow-md"
          />
        )}
      </figure>
      <div className="mt-6">
        <h1 className="text-3xl font-semibold mb-2">{listing.title}</h1>
        <p className="text-gray-300 mb-4">{listing.description}</p>
        <div className="mb-4">
          <strong>Ends At:</strong>
          <div className="text-3xl font-bold text-green-400">
            {listing.endsAt}
          </div>
        </div>
        <div className="mb-4">
          <strong>Seller:</strong>
          <div className="text-gray-400">
            {listing.seller && (
              <>
                <h1>{listing.seller.name}<img src={listing.seller.avatar} alt="Seller Avatar" className="w-12 h-12 rounded-full" /></h1>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="details">
        {/* Bid input field */}
        <div className="bid-input-container mb-4">
          <input
            type="number"
            placeholder="Enter bid amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <button
            onClick={() => handlePlaceBid()}
            className="btn btn-primary mt-2"
            disabled={bidLoading}
          >
            {bidLoading ? 'Placing Bid...' : 'Place Bid'}
          </button>
          {isFinalBid && (
            <button
              onClick={() => handlePlaceBid()}
              className="btn btn-ghost mt-2"
            >
              <RiAuctionFill /> Final Bid
            </button>
          )}
        </div>

        {/* Display bid error, if any */}
        {bidError && <div className="text-red-500">{bidError}</div>}
      </div>
    </div>
  </div>
  );
};

export default SingleListing;
