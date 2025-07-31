import React, { useEffect, useState } from "react";
import axiosInstance from "../network/axios";
import { useSearchParams } from "react-router-dom";
import Styles from "../styles/HotelSearchPage.module.scss";
import HotelSearchCard from "../components/HotelSearchCard";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);

  const country = searchParams.get("country");
  const query = searchParams.get("query");

  useEffect(() => {
    axiosInstance.get("/hotels").then((res) => {
      const allHotels = res.data;

      let filtered = allHotels;

      // Filter by country if provided
      if (country && country.trim() !== "") {
        filtered = filtered.filter(
          (hotel) => hotel.address.countryIsoCode === country
        );
      }

      // Filter by name/query if provided
      if (query && query.trim() !== "") {
        const searchTerm = query.toLowerCase().trim();
        filtered = filtered.filter((hotel) =>
          hotel.name.toLowerCase().includes(searchTerm)
        );
      }

      setHotels(filtered);
    });
  }, [country, query]);

  return (
    <div className={Styles.container}>
      <div className={Styles.path}>
        <span>
          <strong>Hotels</strong>
        </span>{" "}
        | Total :<span className={Styles.blue}> {hotels.length} result</span>
      </div>

      {hotels.length === 0 ? (
        <div className={Styles.noResults}>
          <figure>
            <img src="/images/noresults.svg" alt="" />
          </figure>
          <h2 style={{ marginTop: "1rem", color: "black" }}>
            No results found.
          </h2>
        </div>
      ) : (
        <div className={Styles.cardGrid}>
          {hotels.map((hotel) => (
            <HotelSearchCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}
