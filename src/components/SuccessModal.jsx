import { FaCheckCircle } from "react-icons/fa";
import Styles from "../styles/SuccessModal.module.scss";

function SuccessModal({ onClose }) {
  return (
    <div className={Styles.modalOverlay}>
      <div className={Styles.modalContent}>
        <FaCheckCircle className={Styles.modalIcon} />
        <h2 className={Styles.modalTitle}>Booking Success</h2>
        <p className={Styles.modalText}>Your booking has been confirmed.</p>
        <button onClick={onClose} className={Styles.modalButton}>
          VIEW ALL BOOKINGS
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
