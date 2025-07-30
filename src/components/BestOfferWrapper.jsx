import React, { useEffect, useState } from "react";
import axios from "../network/axios";
import BestOfferItem from "./BestOfferItem";
import { Box, Typography } from "@mui/material";

export default function BestOffersWrapper() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get("/best_offer")
      .then((res) => setOffers(res.data))
      .catch((err) => console.error("Error fetching best offers:", err));
  }, []);

  return (
   <Box
  sx={{
    width: "68.75rem", 
    height: "26rem",   
    bgcolor: "white",
    borderRadius: 2,
    p: "2rem",
    boxSizing: "border-box",
    marginLeft: "200px",
    marginBottom: "50px",
  }}
>
  <Typography variant="h5" fontWeight="bold" mb={2}>
    Best Offers
  </Typography>

  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "1.5rem",
    }}
  >
    {offers.map((offer) => (
      <Box
        key={offer.id}
        sx={{
          flex: "1 1 calc(33.333% - 1rem)",
          minWidth: "20rem", // increased from 17.8125rem (320px)
        }}
      >
        <BestOfferItem hotel={offer} />
      </Box>
    ))}
  </Box>
</Box>

  );
}
