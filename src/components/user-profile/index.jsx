import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserAvatar, getUserListings, getUserBids } from '../../lib/api';
import CreateAuction from '../create-post';
import { CiCreditCard1 } from "react-icons/ci";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [listings, setListings] = useState(null);
  const [bids, setBids] = useState(null);
  const [newAvatar, setNewAvatar] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userName = localStorage.getItem('user_name');
        const userProfile = await getUserProfile(userName);
        setProfile(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateAvatar = async () => {
    try {
      const updatedProfile = await updateUserAvatar(profile.name, newAvatar);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      setError('Error updating avatar. Please try again.');
    }
  };

  const handleViewListings = async () => {
    try {
      const userlistings = await getUserListings(profile.name);
      setListings(userlistings);
      // Reset bids when viewing listings
      setBids(null);
    } catch (error) {
      setError('Error fetching user listings. Please try again.');
    }
  };

  const handleViewBids = async () => {
    try {
      const userBids = await getUserBids(profile.name);
      setBids(userBids);
      // Reset listings when viewing bids
      setListings(null);
    } catch (error) {
      setError('Error fetching user bids. Please try again.');
    }
  };

  const handleCloseBids = () => {
    setBids(null);
  };

  return (
    <div className="card glass flex items-center justify-center min-h-screen">
      <div className="card glass p-6 max-w-3xl w-full bg-cover bg-center rounded-lg overflow-hidden shadow-lg">
        {profile && (
          <div className="card glass p-6 rounded-lg">
            <div className="border-b px-4 pb-6">
              <div className="text-center my-4">
                <img
                  className="h-40 w-40 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                  src={profile.avatar}
                  alt="User Avatar"
                />
                <div className="py-2">
                  <h3 className="font-bold text-3xl text-gray-800 mb-2">{profile.name}</h3>
                  <div className="inline-flex text-gray-700 dark:text-gray-300 items-center text-lg">
                    <CiCreditCard1 /> {profile.credits}
                  </div>
                </div>
                <CreateAuction />
              </div>
              <div className="flex gap-2 px-2 mt-4">
                <button
                  className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-6 py-3 text-xl"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Avatar
                </button>
                <button
                  className="flex-1 rounded-full bg-green-600 dark:bg-green-800 text-white dark:text-white antialiased font-bold hover:bg-green-800 dark:hover:bg-green-900 px-6 py-3 text-xl"
                  onClick={handleViewListings}
                >
                  View Listings
                </button>
                <button
                  className="flex-1 rounded-full bg-purple-600 dark:bg-purple-800 text-white dark:text-white antialiased font-bold hover:bg-purple-800 dark:hover:bg-purple-900 px-6 py-3 text-xl"
                  onClick={handleViewBids}
                >
                  View Bids
                </button>
              </div>
            </div>

            {isEditing && (
              <div className="mb-4 mt-6">
                <input
                  type="text"
                  placeholder="New Avatar URL"
                  value={newAvatar}
                  onChange={(e) => setNewAvatar(e.target.value)}
                  className="border p-4 w-full text-lg rounded-md"
                />
                <div className="mt-4 flex">
                  <button
                    onClick={handleUpdateAvatar}
                    className="bg-blue-500 text-white px-6 py-3 rounded-md mr-4 hover:bg-blue-600"
                  >
                    Update Avatar
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {listings && (
              <div>
                <h3 className="text-2xl font-bold mb-2">Listings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {listings.map((listing) => (
                    <div key={listing.id} className="mb-4">
                      <p className="font-bold text-lg">{listing.title}</p>
                      {Array.isArray(listing.media) &&
                        listing.media.map((mediaUrl) => (
                          <img key={mediaUrl} src={mediaUrl} alt="user's listing media" className="mt-2" />
                        ))}
                      <p className="text-gray-700">{listing.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bids && (
              <div>
                <h3 className="text-2xl font-bold mb-2">Bids</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bids.map((bid) => (
                    <div key={bid.id} className="mb-4">
                      <p className="font-bold text-lg">Amount: {bid.amount}</p>
                      <p className="text-gray-700">Bidder: {bid.bidderName}</p>
                    </div>
                  ))}
                </div>
                <button
                  className="bg-gray-600 text-white px-6 py-3 rounded-md mt-4 hover:bg-gray-700"
                  onClick={handleCloseBids}
                >
                  Close Bids
                </button>
              </div>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
