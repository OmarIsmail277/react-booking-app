import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { chooseHotel } from "../features/hotels/hotelSlice";

import styles from "../styles/recCard.module.scss";

function RecCard({ hotel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBook = () => {
    dispatch(chooseHotel(hotel));
    navigate(`/hotel/${hotel.id}`);
  };
  return (
    <div className={styles.card}>
      <figure className={styles.image__wrapper}>
        <img src={hotel.images.main} alt={hotel.name} />
      </figure>

      <div className="info__wrapper">
        <p>HOTEL</p>
        <h2>{hotel.name}</h2>
        <p>
          {hotel.address?.city}, {hotel.address?.country}
        </p>

        <p>
          Cupon: <strong>dhshjab09d</strong>
        </p>

        <button onClick={handleBook}>Book</button>
      </div>
    </div>
  );
}

export default RecCard;
