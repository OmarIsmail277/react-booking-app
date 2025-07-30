import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User/UserSlice"
import hotelReducer from "./features/Hotel/HotelSlice"


const store = configureStore({
    reducer: {
        hotel:hotelReducer,
        user:userReducer,
    }
});

export default store;