import SingleListing from "../components/singel-listing";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function singlePost() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <SingleListing />
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}
