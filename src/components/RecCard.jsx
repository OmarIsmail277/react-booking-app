import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { chooseHotel } from "../features/Hotel/HotelSlice";

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

      <div className={styles.info__wrapper}>
        <div className={styles.info}>
          <p className={styles.hotelP}>HOTEL</p>
          <h2>{hotel.name}</h2>

          <p className={styles.addressP}>
            {hotel.address?.city}, {hotel.address?.country}
          </p>
        </div>

        <div className={styles.bookC}>
          <p className={styles.cupounP}>
            Cupon: <strong>dhshjab09d</strong>
          </p>

          <button onClick={handleBook}>BOOK NOW</button>
        </div>
      </div>
    </div>
  );
}

export default RecCard;
