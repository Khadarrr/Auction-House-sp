import SingleListing from "../components/singel-listing";
import Navbar from "../components/navbar";

export default function singlePost() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <SingleListing />
      </main>
    </>
  );
}
