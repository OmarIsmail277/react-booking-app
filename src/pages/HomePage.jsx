import { useEffect, useState } from "react";
import axiosInterceptor from "../network/Interceptor";
import SearchCard from "../components/SearchCard";

function HomePage() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axiosInterceptor
      .get("/hotels")
      .then((res) => setHotels(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Hotels</h1>
      {hotels.map((hotel) => (
        <SearchCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

export default HomePage;
