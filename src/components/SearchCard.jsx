import { useDispatch } from "react-redux";
import { chooseHotel, bookHotel } from "../features/hotels/hotelSlice";
import { useNavigate } from "react-router-dom";

function SearchCard({ hotel }) {
  const dispatch = useDispatch();
  // const selectedHotel = useSelector((store) => store.hotel);
  const navigate = useNavigate();

  const handleChoose = () => {
    dispatch(chooseHotel(hotel));
    navigate(`/hotel/${hotel.id}`);
  };

  const handleBook = () => {
    dispatch(bookHotel("2025-08-01", "2025-08-05"));
  };

  return (
    <div className="card">
      <h2>{hotel.hotel_name}</h2>
      <p>
        {hotel.address?.city}, {hotel.address?.country}
      </p>

      <img
        src={hotel.images?.main}
        alt={hotel.hotel_name}
        style={{ width: "200px", height: "auto" }}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleChoose}>Choose</button>
        <button onClick={handleBook}>Book</button>
      </div>

      {/* {selectedHotel.id === hotel.id && selectedHotel.isBooked && (
        <p style={{ color: "green" }}>This hotel is booked ✅</p>
      )} */}
    </div>
  );
}

export default SearchCard;
