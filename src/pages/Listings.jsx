import Navbar from "../components/navbar";
import Card from "../components/card";
import { useState } from "react";
import Footer from "../components/footer";

export default function ListingPage() {
    
    const [searchInput, setSearchInput] = useState("");

    return (
        <>
        <Navbar setSearchInput={setSearchInput} />
        <div className="container mx-auto mt-8">
        <Card searchInput={searchInput} />
      </div>
      <footer>
        <Footer/>
      </footer>
        </>
    )

}