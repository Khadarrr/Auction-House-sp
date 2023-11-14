import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import Logo from "../../assets/icon-auction.png"

const Navbar = () => {
  // Placeholder for credit information from the API
  const creditInfo = {
    // Add your actual credit information here when fetching from API
    // credits: 100,
    // currency: 'USD',
  };

  // Placeholder for user authentication state
  const isAuthenticated = true; // Replace with your actual authentication logic

  const avatarUrl = 'https://placekitten.com/80/80'; // Replace with actual avatar URL

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <img src={Logo} alt="Icon-logo" className="w-20 h-20 mr-2" /> 
        <Link to="/" className="btn btn-ghost items-center text-xl">
          Auction Sphere
        </Link>
      </div>
      <div className="flex-none">
        {/* Credit or Placeholder Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Add your path data here for the notification icon */}
              </svg>
              {isAuthenticated && (
                <span className="badge badge-sm indicator-item">{creditInfo.credits || 0}</span>
              )}
            </div>
          </label>
          <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              {isAuthenticated ? (
                <>
                  <span className="font-bold text-lg">{creditInfo.credits || 0} Credits</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">View credit details</button>
                  </div>
                </>
              ) : (
                <span className="text-gray-500">Please log in to view credits</span>
                
              )}
            </div>
          </div>
        </div>

        {/* Avatar or Placeholder Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {isAuthenticated ? (
                <img alt="User Avatar" src={avatarUrl} />
              ) : (
                // Placeholder avatar when not authenticated
                <img alt="Placeholder Avatar" src="https://placekitten.com/40/40" />
              )}
            </div>
          </label>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/listings" className="justify-between">
                Listings
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
