import { useSelector } from "react-redux";
// import { bookHotel } from "../features/Hotel/HotelSlice";
import RecommendedHotels from "../components/RecommendedHotels";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Typography, Button, Rating, Chip } from "@mui/material";
import {
  MdLocationOn,
  MdLocalParking,
  MdWifi,
  MdSecurity,
  MdHotel,
} from "react-icons/md";
import { GiBathtub } from "react-icons/gi";
import {
  IoChevronBack,
  IoChevronForward,
  IoChevronDown,
} from "react-icons/io5";
import Styles from "../styles/HotelDetailsPage.module.scss";

function HotelDetailsPage() {
  const hotel = useSelector((state) => state.hotel);
  // const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const handleBook = () => {
    navigate("/booking");
  };

  const nextImage = () => {
    const totalImages = galleryImages.length;
    setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    const totalImages = galleryImages.length;
    setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (!hotel?.id) {
    return <p style={{ padding: "2rem" }}>No hotel selected.</p>;
  }

  // Debug: Log hotel data to see the structure
  console.log("Hotel data:", hotel);
  console.log("Hotel images:", hotel?.images);

  // Create fallback images if hotel data is incomplete
  const fallbackImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  ];

  const currentImage =
    hotel?.images?.gallery?.[currentImageIndex] ||
    hotel?.images?.main ||
    fallbackImages[currentImageIndex] ||
    fallbackImages[0];

  const galleryImages =
    hotel?.images?.gallery ||
    (hotel?.images?.main ? [hotel.images.main] : fallbackImages);

  return (
    <div>
      <div className={Styles.path}>
        <span>
          <strong>My Bookings </strong>
        </span>{" "}
        <span className={Styles.blue}> My bookings</span>
      </div>
      <Box
        sx={{
          padding: "2rem",
          backgroundColor: "#f5f7fa",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          {/* Hotel Name Banner */}
          <Box
            sx={{
              backgroundColor: "#f8f9fa",
              padding: "1rem 2rem",
              borderBottom: "1px solid #e9ecef",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#2c3e50" }}>
              {hotel?.hotelName || hotel?.name}
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}
          >
            {/* Image Slider Section */}
            <Box sx={{ flex: "2", position: "relative" }}>
              {/* Main Image */}
              <Box sx={{ position: "relative", height: "600px" }}>
                <img
                  src={currentImage}
                  alt={hotel?.hotelName || hotel?.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    console.log("Image failed to load:", currentImage);
                    e.target.src = fallbackImages[0];
                  }}
                />

                {/* Navigation Arrows */}
                <Button
                  onClick={prevImage}
                  sx={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                    minWidth: "40px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.7)",
                    },
                  }}
                >
                  <IoChevronBack />
                </Button>

                <Button
                  onClick={nextImage}
                  sx={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                    minWidth: "40px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.7)",
                    },
                  }}
                >
                  <IoChevronForward />
                </Button>
              </Box>

              {/* Thumbnail Gallery */}
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  padding: "16px",
                  overflowX: "auto",
                }}
              >
                {galleryImages.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => selectImage(index)}
                    sx={{
                      width: "80px",
                      height: "60px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border:
                        index === currentImageIndex
                          ? "3px solid #0a6ada"
                          : "2px solid transparent",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        console.log("Thumbnail failed to load:", image);
                        e.target.src =
                          fallbackImages[index] || fallbackImages[0];
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Information Section */}
            <Box
              sx={{
                flex: "1",
                padding: "2rem",
                backgroundColor: "white",
                height: "600px",
                overflowY: "auto",
              }}
            >
              {/* Hotel Review */}
              <Box sx={{ marginBottom: "2rem" }}>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: "1rem", fontWeight: 600 }}
                >
                  Hotel Review
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <Chip
                    label="4.9"
                    sx={{
                      backgroundColor: "#0a6ada",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Excellent
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: "8px" }}
                >
                  275 Reviews
                </Typography>
                <Rating value={4.9} precision={0.1} readOnly />
              </Box>

              {/* Pricing */}
              <Box sx={{ marginBottom: "2rem" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#df142d",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  20% OFF
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "baseline", gap: "4px" }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, color: "#2c3e50" }}
                  >
                    {hotel?.pricing?.[0]?.discountedPrice ||
                      hotel?.pricing?.[0]?.originalPrice ||
                      399}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hotel?.pricing?.[0]?.currency || "USD"}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Per night
                </Typography>
              </Box>

              {/* About Section */}
              <Box sx={{ marginBottom: "2rem" }}>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: "1rem", fontWeight: 600 }}
                >
                  About
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {showMore
                    ? hotel?.description ||
                      "Whether you are in town for business or leisure, San Francisco Marriott Marquis welcomes travelers to Northern California with exceptional service, spacious accommodations, and stunning city views. Located in the heart of downtown, our hotel offers easy access to the city's top attractions, shopping, and dining."
                    : (
                        hotel?.description ||
                        "Whether you are in town for business or leisure, San Francisco Marriott Marquis welcomes travelers to Northern California with exceptional service, spacious accommodations, and stunning city views."
                      ).substring(0, 150) + "..."}
                </Typography>
                <Button
                  onClick={() => setShowMore(!showMore)}
                  sx={{
                    color: "#0a6ada",
                    textTransform: "none",
                    padding: "4px 8px",
                    marginTop: "8px",
                    "&:hover": {
                      backgroundColor: "rgba(10, 106, 218, 0.1)",
                    },
                  }}
                  endIcon={
                    <IoChevronDown
                      sx={{
                        transform: showMore ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    />
                  }
                >
                  {showMore ? "Show Less" : "Show More"}
                </Button>
              </Box>

              {/* Location */}
              <Box sx={{ marginBottom: "2rem" }}>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: "1rem", fontWeight: 600 }}
                >
                  Location
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}
                >
                  <MdLocationOn sx={{ color: "#0a6ada", marginTop: "2px" }} />
                  <Typography variant="body2" color="text.secondary">
                    {hotel?.address?.street}, {hotel?.address?.city},{" "}
                    {hotel?.address?.state}, {hotel?.address?.country}
                  </Typography>
                </Box>
              </Box>

              {/* Popular Services */}
              <Box sx={{ marginBottom: "2rem" }}>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: "1rem", fontWeight: 600 }}
                >
                  Popular Services
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <MdLocalParking sx={{ color: "#0a6ada" }} />
                    <Typography variant="body2">Parking</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <GiBathtub sx={{ color: "#0a6ada" }} />
                    <Typography variant="body2">Attached Bathroom</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <MdSecurity sx={{ color: "#0a6ada" }} />
                    <Typography variant="body2">CCTV Cameras</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <MdWifi sx={{ color: "#0a6ada" }} />
                    <Typography variant="body2">Wifi</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Pay Now Button */}
              <Button
                onClick={handleBook}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#0a6ada",
                  color: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#0851b3",
                  },
                }}
              >
                PAY NOW
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <div className={Styles.slider}>
        <RecommendedHotels />
      </div>
    </div>
  );
}

export default HotelDetailsPage;
