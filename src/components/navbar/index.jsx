import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import Logo from "../../assets/icon-auction.png";
import { getProfile } from "../../lib/api";
import { CiCreditCard1 } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import PropTypes from "prop-types";
import "../../index.css";

const Navbar = ({ setSearchInput }) => {
  // Remove the searchInput prop
  const userId = localStorage.getItem("user_name");
  const [user, setUser] = useState(null);
  const [creditInfo, setCreditInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("https://placekitten.com/40/40"); // Placeholder avatar URL
  const navigate = useNavigate();
  const [searchInput, setSearchInputLocal] = useState(""); // Use local state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedToken = localStorage.getItem("access_token");

        if (userId && storedToken) {
          try {
            const profileData = await getProfile(userId, storedToken);

            setUser(profileData);
            setCreditInfo({ credits: profileData.credits, currency: "NOK" });
            setIsAuthenticated(true);

            if (profileData.avatar) {
              setAvatarUrl(profileData.avatar);
            }
          } catch (error) {
            console.error("Error fetching user profile:", error.message);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [navigate, userId]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 flex items-center">
        <img
          src={Logo}
          alt="Icon-logo"
          className="w-12 h-12 md:w-20 md:h-20 mr-2"
        />
        <Link to="/" className="btn btn-ghost items-center text-sm md:text-xl">
          Auction Sphere
          <FaHome className="ml-1" />
        </Link>
      </div>
      <div className="flex-none">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          value={searchInput}
          onChange={(e) => {
            setSearchInputLocal(e.target.value);
            setSearchInput(e.target.value);
          }}
        />

<div className="dropdown dropdown-end" style={{ zIndex: 2 }}>
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              ></svg>
              {isAuthenticated && (
                <span className="badge badge-sm indicator-item">
                  <CiCreditCard1 />
                  {user.credits}
                </span>
              )}
            </div>
          </label>
          <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              {isAuthenticated ? (
                <>
                  <span className="font-bold text-lg">
                    {user.credits} Credits
                  </span>
                  <div className="card-actions">
                    <Link to="/listings">
                      <button className="btn btn-ghost">
                        Bid to use credit
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <span className="text-gray-500">
                  Please log in to view credits
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Avatar or Placeholder Dropdown */}
        <div className="dropdown dropdown-end avatar online" style={{ zIndex: 2 }}>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {isAuthenticated ? (
                <img alt="User Avatar" src={user.avatar} />
              ) : (
                // Placeholder avatar when not authenticated
                <img alt="Placeholder Avatar offline" src={avatarUrl} />
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
              {isAuthenticated ? (
                <button className=" btn-secondary" onClick={handleLogout}>
                  Log Out
                </button>
              ) : (
                <Link to="/login">Log in</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setSearchInput: PropTypes.func.isRequired,
};

export default Navbar;
