import React from "react";
import { FaParking, FaWifi } from "react-icons/fa";
import { MdStar } from "react-icons/md";

const HotelSummaryCard = ({ hotel }) => {
  const {
    name,
    address,
    rating,
    pricing,
    images,
    amenities,
    checkInDate,
    checkOutDate,
  } = hotel;

  const displayPrice = Array.isArray(pricing) && pricing.length > 0 ? pricing[0] : null;

  const formattedCheckIn = new Date(checkInDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedCheckOut = new Date(checkOutDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "16px",
        position: "relative",
        width:"100%",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={images.main}
        alt={name}
        style={{
          width: "250px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "16px", flex: 1 }}>
        <div style={{ marginBottom: "8px" }}>
          <h3 style={{ margin: 0, fontSize: "18px" }}>{name}</h3>
          <span style={{ fontWeight: "bold", color: "#444" }}>
            {address.city}, {address.country}
          </span>
          <p style={{ fontSize: "14px", color: "#666" }}>Near {address.street}</p>
        </div>

        <div style={{ display: "flex", gap: "12px", margin: "8px 0" }}>
          {amenities.includes("Parking") && <FaParking />}
          {amenities.includes("Wifi") && <FaWifi />}
        </div>

        {displayPrice ? (
          <p style={{ color: "#E08A00", fontSize: "14px" }}>
            {displayPrice.discount}{" "}
            <strong style={{ color: "#000", fontSize: "18px", marginLeft: "8px" }}>
              ${displayPrice.discountedPrice}
            </strong>
          </p>
        ) : (
          <p style={{ color: "#999", fontSize: "14px" }}>Price not available</p>
        )}

        <div style={{ fontSize: "13px", marginTop: "8px", color: "#333" }}>
          <span>From: 📅 {formattedCheckIn}</span> | <span>To: 📅 {formattedCheckOut}</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: "12px",
          top: "12px",
          backgroundColor: "#0A58CA",
          color: "white",
          borderRadius: "20px",
          padding: "4px 10px",
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        <span style={{ marginRight: "4px" }}>{rating.score}</span>
        <MdStar color="white" />
      </div>
    </div>
  );
};

export default HotelSummaryCard;
