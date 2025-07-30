import { Button, Typography, Box, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import BathroomIcon from "@mui/icons-material/Bathtub";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImageSlider from "./ImageSlider";
import styles from "../styles/hotelDetailsCard.module.scss";

const HotelDetailsCard = () => {
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
  ];

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <ImageSlider images={images} />
      </div>

      <div className={styles.right}>
        <Typography variant="h5" fontWeight="bold">
          San Francisco Marriott Marquis
        </Typography>

        <Box mt={1} display="flex" alignItems="center" gap={1}>
          <Chip label="4.9 ★" color="primary" size="small" />
          <Typography variant="body2">Exilent</Typography>
          <Typography variant="body2" color="text.secondary">
            275 Review
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            <span className={styles.discount}>20% OFF</span> $399
            <Typography component="span" variant="body2" color="text.secondary">
              / per night
            </Typography>
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="body1">
            Whether you are in town for business or leisure...
          </Typography>
        </Box>

        <Box mt={2} display="flex" alignItems="center" gap={1}>
          <LocationOnIcon color="action" />
          <Typography variant="body2">
            780 Mission Street, San Francisco, CA
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography fontWeight="bold">Popular Services</Typography>
          <Box display="flex" gap={2} mt={1}>
            <Box display="flex" gap={0.5} alignItems="center">
              <LocalParkingIcon fontSize="small" />
              <Typography variant="body2">Parking</Typography>
            </Box>
            <Box display="flex" gap={0.5} alignItems="center">
              <BathroomIcon fontSize="small" />
              <Typography variant="body2">Attached Bathroom</Typography>
            </Box>
            <Box display="flex" gap={0.5} alignItems="center">
              <CameraAltIcon fontSize="small" />
              <Typography variant="body2">CCTV Cameras</Typography>
            </Box>
            <Box display="flex" gap={0.5} alignItems="center">
              <WifiIcon fontSize="small" />
              <Typography variant="body2">WiFi</Typography>
            </Box>
          </Box>
        </Box>

        <Button className={styles.payNow} variant="contained" fullWidth>
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default HotelDetailsCard;
