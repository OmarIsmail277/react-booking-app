import HotelCard from "../components/HotelCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BestOffersWrapper from "../components/BestOfferWrapper";
import RecommendedHotels from "../components/RecommendedHotels";
import Styles from "../styles/HomePage.module.scss";

function HomePage() {
  return (
    <div className={Styles.container}>
      <RecommendedHotels className={Styles.rec} />
      <BestOffersWrapper />
    </div>
  );
}

export default HomePage;
