import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Styles from "../styles/HotelSearchCard.module.scss";
import { chooseHotel } from "../features/Hotel/HotelSlice";

function HotelSearchCard({ hotel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBook = () => {
    dispatch(chooseHotel(hotel));
    navigate("/booking");
  };

  return (
    <div className={Styles.card}>
      <Link className={Styles.imageLink} to={`/detail/${hotel?.id}`}>
        <figure>
          <img src={hotel?.images?.main} alt="Hotel" />
        </figure>
      </Link>

      <div className={Styles.cardContent}>
        <div className={Styles.cardHeader}>
          <h4>{hotel?.name}</h4>
          <div className={Styles.rating}>
            <p>{hotel?.rating?.score}</p>
            <FaStar />
          </div>
        </div>

        <p className={Styles.address}>{hotel?.address?.street}</p>

        <div className={Styles.amenities}>
          {hotel?.amenities?.map((text, index) => (
            <span key={index}>{text}</span>
          ))}
        </div>

        <div className={Styles.cardFooter}>
          <p className={Styles.price}>
            {hotel?.pricing?.[0]?.discount}{" "}
            <span>${hotel?.pricing?.[0]?.discountedPrice}</span>
          </p>
          <div className={Styles.buttons}>
            <Link to={`/hotel/${hotel?.id}`}>
              <button className={Styles.viewBtn}>View details</button>
            </Link>
            <button onClick={handleBook} className={Styles.bookBtn}>
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelSearchCard;
