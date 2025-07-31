import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User/UserSlice";
import hotelReducer from "./features/Hotel/HotelSlice";
import SearchReducer from "./features/Search/SearchSlice";

const store = configureStore({
  reducer: {
    hotel: hotelReducer,
    user: userReducer,
    search: SearchReducer,
  },
});

export default store;
