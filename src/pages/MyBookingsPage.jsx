import React from "react";
import { useSelector } from "react-redux";
import HotelSummaryCard from "../components/HotelSummaryCard";
import Styles from "../styles/MyBookingsPage.module.scss";
const SummaryPage = () => {
  const bookings = useSelector((state) => state.user.bookings);
  const user = useSelector((state) => state.user);
  console.log(bookings);
  return (
    <div className={Styles.container}>
      <div className={Styles.path}>
        <span>
          <strong>My Bookings </strong>
        </span>{" "}
        <span className={Styles.blue}> My bookings</span>
      </div>

      <div className={Styles.content}>
        <div className={Styles.items}>
          {bookings.length > 0 ? (
            bookings.map((hotel) => (
              <HotelSummaryCard
                className={Styles.item}
                key={hotel.id + hotel.checkInDate}
                hotel={hotel}
              />
            ))
          ) : (
            <p>No bookings yet.</p>
          )}
        </div>
        <div className={Styles.profile}>
          <div>
            <h2>Profile</h2>
            <div className={Styles.avatar}>
              {(
                user.fullName[0] + user.fullName[user.fullName.indexOf(" ") + 1]
              ).toUpperCase()}
            </div>
            <h3>{user.fullName}</h3>
            <br />
            <p>Personal Account</p>
            <div className={Styles.btn}>Edit Profile</div>

            <div className={Styles.total}>
              <strong>Total Paid:</strong>{" "}
              {bookings
                .reduce((acc, booking) => {
                  const price = booking.pricing?.[0]?.discountedPrice || 0;
                  return acc + price;
                }, 0)
                .toLocaleString()}{" "}
              USD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
