import { Link } from "@tanstack/react-router";
import { CgProfile } from "react-icons/cg";
import { RiAuctionFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      setIsVisible(isScrollingUp);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`btm-nav flex items-center ${isVisible ? 'visible' : 'hidden'}`}>
      <Link to="/">
        <button className="">
          <FaHome />
        </button>
      </Link>
      <Link to="/listings">
        <button className="">
          <RiAuctionFill />
        </button>
      </Link>
      <Link to="/profile">
        <button className="">
          <CgProfile />
        </button>
      </Link>
    </div>
  );
}

