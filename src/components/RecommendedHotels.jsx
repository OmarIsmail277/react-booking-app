import { useEffect, useState, useRef } from "react";
import axiosInstance from "../network/axios";
import RecCard from "../components/RecCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/recHotels.module.scss";

function RecommendedHotels() {
  const [recHotels, setRecHotels] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    axiosInstance
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
    arrows: false,
    autoplay: true,
    variableWidth: true,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    afterChange: (currentIndex) => {
      // Double-check the current slide after change
      setCurrentSlide(currentIndex);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const next = () => {
    const nextIndex = currentSlide + 1;
    if (nextIndex < recHotels.length) {
      sliderRef.current.slickGoTo(nextIndex);
      setCurrentSlide(nextIndex);
    }
  };

  const previous = () => {
    const prevIndex = currentSlide - 1;
    if (prevIndex >= 0) {
      sliderRef.current.slickGoTo(prevIndex);
      setCurrentSlide(prevIndex);
    }
  };

  // Check if we're at the beginning or end
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide >= recHotels.length - 3;

  // Debug logging
  console.log(
    "Current slide:",
    currentSlide,
    "Total slides:",
    recHotels.length,
    "Is last slide:",
    isLastSlide
  );

  return (
    <div className={styles.recommendedSection}>
      <div className={styles.header}>
        <h1>Recommended Hotels</h1>
        <a href="/">View all</a>
      </div>

      <div className={styles.sliderContainer}>
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={previous}
          aria-label="Previous"
          disabled={isFirstSlide}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.sliderWrapper}>
          <Slider ref={sliderRef} {...settings}>
            {recHotels.map((hotel) => (
              <div key={hotel.id} className={styles.slide}>
                <RecCard hotel={hotel} />
              </div>
            ))}
          </Slider>
        </div>

        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={next}
          aria-label="Next"
          disabled={isLastSlide}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default RecommendedHotels;
