import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import hotelReducer from "./features/hotels/hotelSlice";

const store = configureStore({
  reducer: {
    hotel: hotelReducer,
    user: userReducer,
  },
});

export default store;
