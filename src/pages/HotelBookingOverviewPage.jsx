import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookHotel } from "../features/User/UserSlice";
import Styles from "../styles/HotelBookingOverviewPage.module.scss";
import SuccessModal from "../components/SuccessModal"; // ✅ Make sure path is correct

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "long",
  });
}

export default function HotelBookingOverviewPage() {
  const { register, handleSubmit } = useForm();
  const [showModal, setShowModal] = useState(false); // ✅ Modal state
  const hotel = useSelector((state) => state.hotel);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePay() {
    dispatch(bookHotel(hotel));
    setShowModal(true); // ✅ Show modal on pay
  }

  function handleModalClose() {
    setShowModal(false);
    navigate("/summary"); // ✅ Optional: redirect after closing modal
  }

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className={Styles.container}>
      {showModal && <SuccessModal onClose={handleModalClose} />} {/* ✅ Modal */}
      <div
        style={{
          width: "90%",
          height: "3.25rem",
          padding: "0.75rem 1.25rem",
          backgroundColor: "white",
          borderRadius: "10px",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontFamily: "sans-serif",
          fontSize: "1rem",
          color: "#333",
        }}
      >
        <span>
          <strong>Booking</strong>
        </span>
        | Hotels : Hotel Detail :
        <span style={{ color: "rgba(10, 106, 218, 1)" }}>Booking</span>
      </div>

      <div className={Styles.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ maxWidth: 700, margin: "0 auto", padding: 4 }}>
            {/* Form fields */}
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Your Details
            </Typography>
            <Typography variant="body2" mb={3}>
              Whether you are in town for business or leisure...
            </Typography>

            <Box display="flex" gap={2} mb={2}>
              <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <Select {...register("title")} defaultValue="Mr" label="Title">
                  <MenuItem value="Mr">Mr</MenuItem>
                  <MenuItem value="Ms">Ms</MenuItem>
                  <MenuItem value="Mrs">Mrs</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="First Name"
                defaultValue={user.fullName.split(" ")[0]}
                {...register("firstName")}
              />
              <TextField
                fullWidth
                label="Last Name"
                defaultValue={user.fullName.split(" ")[1]}
                {...register("lastName")}
              />
            </Box>

            <TextField
              fullWidth
              label="Email"
              defaultValue={user.email}
              sx={{ mb: 2 }}
              {...register("email")}
            />

            <Box display="flex" gap={2} mb={4}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select {...register("country")} defaultValue="Egypt" label="Country">
                  <MenuItem value="Egypt">Egypt</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Germany">Germany</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Mobile"
                defaultValue={user.phone}
                {...register("mobile")}
              />
            </Box>

            <Typography variant="h6" fontWeight="bold" mb={2}>
              Payment Details
            </Typography>

            <TextField
              fullWidth
              label="Card Number"
              defaultValue="**** **** **** ****"
              sx={{ mb: 2 }}
              {...register("cardNumber")}
            />

            <Box display="flex" gap={2} mb={2}>
              <TextField fullWidth label="CVV" defaultValue="123" {...register("cvv")} />
              <TextField fullWidth label="Expiry Date" defaultValue="8/8/2030" {...register("expiry")} />
            </Box>

            <TextField
              fullWidth
              label="Card Holder"
              defaultValue={user.fullName}
              sx={{ mb: 3 }}
              {...register("cardHolder")}
            />

            {/* Pay with Apple Pay Section */}
            <Typography variant="h6" fontWeight="bold" mb={2} sx={{ mt: 4 }}>
              Pay with Apple Pay
            </Typography>
            <Typography variant="body2" mb={3} color="text.secondary">
              Quick and secure payment with Apple Pay
            </Typography>

            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 2, 
              mb: 3,
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              backgroundColor: "#fafbfc"
            }}>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                backgroundColor: "#000", 
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Typography sx={{ color: "white", fontSize: "1.2rem" }}>🍎</Typography>
              </Box>
              <Box>
                <Typography variant="body1" fontWeight={500}>
                  Apple Pay
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Touch ID or Face ID to pay
                </Typography>
              </Box>
            </Box>

            {/* Pay with Points Section */}
            <Typography variant="h6" fontWeight="bold" mb={2} sx={{ mt: 4 }}>
              Pay with Points
            </Typography>
            <Typography variant="body2" mb={3} color="text.secondary">
              Use your loyalty points to pay for your booking
            </Typography>

            <TextField
              fullWidth
              label="Available Points"
              defaultValue="25,000"
              sx={{ mb: 2 }}
              {...register("availablePoints")}
            />

            <TextField
              fullWidth
              label="Points to Use"
              defaultValue="5,000"
              sx={{ mb: 2 }}
              {...register("pointsToUse")}
            />

            <TextField
              fullWidth
              label="Points Value"
              defaultValue="$50.00"
              sx={{ mb: 3 }}
              {...register("pointsValue")}
            />

            {/* Pay with PayPal Section */}
            <Typography variant="h6" fontWeight="bold" mb={2} sx={{ mt: 4 }}>
              Pay with PayPal
            </Typography>
            <Typography variant="body2" mb={3} color="text.secondary">
              Fast and secure payment with PayPal
            </Typography>

            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 2, 
              mb: 3,
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              backgroundColor: "#fafbfc"
            }}>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                backgroundColor: "#0070ba", 
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Typography sx={{ color: "white", fontSize: "1.2rem" }}>P</Typography>
              </Box>
              <Box>
                <Typography variant="body1" fontWeight={500}>
                  PayPal
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pay with your PayPal account
                </Typography>
              </Box>
            </Box>

            <Button onClick={handlePay} variant="contained" fullWidth sx={{ py: 1.5 }}>
              PAY NOW
            </Button>
          </Box>
        </form>

        {/* Booking Summary */}
        <div className={Styles.summary__card}>
          <h2 className={Styles.summary__title}>Summary</h2>
          <figure className={Styles.image__wrapper}>
            <img src={hotel?.images?.main} alt={hotel?.name || "Hotel image"} />
          </figure>
          <div className={Styles.summary__main}>
            <div className={Styles.summary__hotel}>
              <div>
                <h3 className={Styles.hotel__name}>{hotel?.name}</h3>
                <div className={Styles.hotel__address}>
                  <span className={Styles.location__icon}>📍</span>
                  <span>
                    {hotel?.address?.street}, {hotel?.address?.city}, {hotel?.address?.country}
                  </span>
                </div>
              </div>
              <div className={Styles.price__block}>
                {hotel?.pricing?.[0]?.discount && (
                  <span className={Styles.discount}>
                    {hotel.pricing[0].discount}% OFF
                  </span>
                )}
                <span className={Styles.price}>
                  {hotel?.pricing?.[0]?.discountedPrice || hotel?.pricing?.[0]?.originalPrice}
                </span>
                <span className={Styles.currency}>{hotel?.pricing?.[0]?.currency}</span>
                <span className={Styles.pernight}>Per night</span>
              </div>
            </div>

            <div className={Styles.dates}>
              <label>Check In</label>
              <input value={formatDate(hotel?.checkInDate)} readOnly />
              <label>Check Out</label>
              <input value={formatDate(hotel?.checkOutDate)} readOnly />
            </div>

            <div className={Styles.price__summary}>
              <div>
                <span>Price Per Night</span>
                <span>${hotel?.pricing?.[0]?.discountedPrice || hotel?.pricing?.[0]?.originalPrice}</span>
              </div>
              <div>
                <span>Nights</span>
                <span>{(() => {
                  const checkIn = new Date(hotel?.checkInDate);
                  const checkOut = new Date(hotel?.checkOutDate);
                  if (checkIn && checkOut && !isNaN(checkIn) && !isNaN(checkOut)) {
                    const diff = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
                    return diff > 0 ? diff : 1;
                  }
                  return 1;
                })()}</span>
              </div>
              <div className={Styles.total__row}>
                <span>Total Price</span>
                <span>{(() => {
                  const price =
                    hotel?.pricing?.[0]?.discountedPrice || hotel?.pricing?.[0]?.originalPrice || 0;
                  const checkIn = new Date(hotel?.checkInDate);
                  const checkOut = new Date(hotel?.checkOutDate);
                  let nights = 1;
                  if (checkIn && checkOut && !isNaN(checkIn) && !isNaN(checkOut)) {
                    const diff = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
                    nights = diff > 0 ? diff : 1;
                  }
                  return `$${price * nights}`;
                })()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
