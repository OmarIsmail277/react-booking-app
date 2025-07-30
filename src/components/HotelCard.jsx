  import { useDispatch } from "react-redux";
  import { chooseHotel } from "../features/Hotel/HotelSlice";
  import { useNavigate } from "react-router-dom";

  function HotelCard({ hotel }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChoose = () => {
      dispatch(chooseHotel(hotel));
      navigate(`/hotel/${hotel.id}`);
    };

    return (
      <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
        <h2>{hotel.hotelName}</h2>
        <p>{hotel.description}</p>
        <img
          src={hotel.images?.main}
          alt={hotel.hotelName}
          style={{ width: "200px", borderRadius: "8px" }}
        />
        <br />
        <button onClick={handleChoose} style={{ marginTop: "1rem" }}>
          View Details
        </button>
      </div>
    );
  }

  export default HotelCard;
