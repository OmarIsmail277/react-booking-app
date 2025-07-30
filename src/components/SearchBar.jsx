import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import Styles from "../styles/SearchBar.module.scss";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { chooseHotel } from "../features/Hotel/HotelSlice";

export default function SearchForm() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const dispatch = useDispatch();

  // inside your component:
  const navigate = useNavigate();

  const handleSearch = () => {
    // Save check-in date to Redux hotel state (for both checkInDate and checkOutDate)
    dispatch(chooseHotel({ checkInDate: checkIn, checkOutDate: checkIn }));
    const params = new URLSearchParams({
      query: search,
      country,
    });
    navigate(`/search?${params.toString()}`);
  };

  const handleClear = () => {
    setSearch("");
    setCountry("");
    setCheckIn("");
  };

  const countries = [
    { label: "United States", value: "US" },
    { label: "Morocco", value: "MA" },
    {
      label: "Egypt",
      value: "EG",
    },
    { label: "Greece", value: "GR" },
  ];

  return (
    <Box className={Styles.searchBarContainer}>
      <FormControl className={Styles.formControl}>
        <label htmlFor="search-input" className={Styles.inputLabel}>
          SEARCH
        </label>
        <TextField
          id="search-input"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: "11.25rem",
            height: "2.5rem",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(25, 29, 35, 0.05)",
              borderRadius: "3.625rem",
              color: "black",
              "& fieldset": {
                border: "none", // removes border
              },
            },
          }}
        />
      </FormControl>

      {/* Country */}
      <FormControl className={Styles.formControl}>
        <label htmlFor="country-select" className={Styles.inputLabel}>
          COUNTRY
        </label>

        <Select
          id="country-select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          size="small"
          displayEmpty
          input={
            <OutlinedInput
              notched={false}
              sx={{
                width: "11.25rem",
                height: "2.5rem",
                backgroundColor: "rgba(25, 29, 35, 0.05)",
                borderRadius: "3.625rem",
                padding: "0 1rem",
                color: "black",
                "& fieldset": {
                  border: "none",
                },
              }}
            />
          }
        >
          <MenuItem value={countries[0].value}>{countries[0].label}</MenuItem>
          <MenuItem value={countries[1].value}>{countries[1].label}</MenuItem>
          <MenuItem value={countries[2].value}>{countries[2].label}</MenuItem>
          <MenuItem value={countries[3].value}>{countries[3].label}</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={Styles.formControl}>
        <label htmlFor="checkin-date" className={Styles.inputLabel}>
          CHECK-IN
        </label>
        <TextField
          id="checkin-date"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          size="small"
          sx={{
            width: "11.25rem",
            height: "2.5rem",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(25, 29, 35, 0.05)",
              borderRadius: "3.625rem",
              color: "black",
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
      </FormControl>

      <Button
        disableElevation
        disableRipple
        variant="text"
        onClick={handleClear}
        className={Styles.clearBtn}
      >
        Clear Filters
      </Button>

      <Button
        onClick={handleSearch}
        variant="contained"
        className={Styles.searchBtn}
        sx={{
          backgroundColor: "red",
          color: "white",
          borderRadius: "3.625rem",
          padding: "0.5rem 1.7rem",
          marginBottom: "0.3rem",
          textTransform: "none", // optional: keep text case unchanged
          "&:hover": {
            backgroundColor: "rgba(223, 20, 45, 1)", // slightly darker red on hover
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
}
