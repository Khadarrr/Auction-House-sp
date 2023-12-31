import React, { useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { getListingById, placeBid } from '../../lib/api';
import { RiAuctionFill } from 'react-icons/ri';

const SingleListing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
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
      <div className="p-6 bg-center">
            <h1 className="text-3xl font-semibold mb-4">{listing.title}</h1>
            <p className="text-gray-700 mb-4">{listing.description}</p>
            <div className="mb-4">
              <strong>Ends At:</strong>
              <div className="text-xl font-bold text-green-500">
                {listing.endsAt}
              </div>
            </div>
            <div className="mb-4">
              <strong>Current Bid:</strong>
              <div className="text-lg font-bold text-blue-500">
                {listing._count && listing._count.bids > 0
                  ? `${listing._count.bids} bids - $${listing.bids[0].amount}`
                  : 'No bids yet'}
              </div>
            </div>
            <div className="mb-4">
              <strong>Seller:</strong>
              <div className="flex items-center">
                {listing.seller && (
                  <>
                    <img
                      src={listing.seller.avatar}
                      alt="Seller Avatar"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-gray-700">{listing.seller.name}</span>
                  </>
                )}
              </div>
            </div>
          </div>
    </div>
  </div>
  );
};

export default SingleListing;
