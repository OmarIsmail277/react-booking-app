import React from "react";
import { Card, Typography, Avatar, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { chooseHotel } from "../features/Hotel/HotelSlice";

export default function BestOfferItem({ hotel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, location, image, id } = hotel;
  const shortName = name.split(" ").slice(0, 2).join(" ");

  const handleChoose = () => {
    dispatch(chooseHotel(hotel));
    navigate(`/hotel/${id}`);
  };

  return (
    <Card
      onClick={handleChoose}
      sx={{
        width: 320, // increased from 285
        height: 90, // increased from 74
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        px: 2,
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
      }}
    >
      <Avatar
        src={image}
        alt={name}
        sx={{ width: 60, height: 60, mr: 2 }} // increased from 50
      />
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          {shortName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
      </Box>
    </Card>
  );
}
