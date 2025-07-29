import { useEffect, useState } from "react";
import axiosInterceptor from "../network/Interceptor";
import RecCard from "../components/RecCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function RecommendedHotels() {
  const [recHotels, setRecHotels] = useState([]);

  useEffect(() => {
    axiosInterceptor
      .get("/recommended_hotels")
      .then((res) => setRecHotels(res.data))
      .catch((err) => console.error(err));
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0 }}>Recommended Hotels</h1>
        <a
          href="/all-hotels"
          style={{ color: "#888", textDecoration: "none", fontWeight: 500 }}
        >
          View all
        </a>
      </div>
      <Slider {...settings}>
        {recHotels.map((hotel) => (
          <div key={hotel.id} style={{ padding: "0 12px" }}>
            <RecCard hotel={hotel} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RecommendedHotels;
