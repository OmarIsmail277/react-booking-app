import { useDispatch, useSelector } from "react-redux";
import { bookHotel } from "../features/hotels/hotelSlice";
import { useNavigate } from "react-router-dom";

function HotelDetails() {
  const hotel = useSelector((state) => state.hotel);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBook = () => {
    const checkInDate = prompt("Enter Check-In Date (YYYY-MM-DD):");
    const checkOutDate = prompt("Enter Check-Out Date (YYYY-MM-DD):");

    if (checkInDate && checkOutDate) {
      dispatch(bookHotel(checkInDate, checkOutDate));
      alert("Hotel booked successfully!");
    }
  };

  if (!hotel?.id) {
    return <p style={{ padding: "2rem" }}>No hotel selected.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{hotel.hotelName}</h1>
      <img
        src={hotel.images?.main}
        alt={hotel.hotelName}
        style={{ width: "300px", borderRadius: "8px" }}
      />
      <p style={{ marginTop: "1rem" }}>{hotel.description}</p>

      <h3>Address</h3>
      <p>
        {hotel.address.street}, {hotel.address.city}, {hotel.address.state},{" "}
        {hotel.address.country}
      </p>

      <h3>Room Info</h3>
      <p>Room Type: {hotel.pricing[0]?.roomType}</p>
      <p>
        Price: {hotel.pricing[0]?.originalPrice} {hotel.pricing[0]?.currency}
      </p>

      {/* Booking button logic */}
      {user.isAuthenticated ? (
        <button
          onClick={handleBook}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Book Hotel
        </button>
      ) : (
        <p style={{ color: "red", marginTop: "1rem" }}>
          Please{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            login
          </span>{" "}
          to book this hotel.
        </p>
      )}
    </div>
  );
}

export default HotelDetails;
