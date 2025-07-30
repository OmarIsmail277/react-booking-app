import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  hotelName: "",
  address: "",
  rating: "",
  pricing: "",
  amenities: [],
  description: "",
  images: [],
  isBooked: false,
  checkInDate: null,
  checkOutDate: null
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    chooseHotel(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    bookHotel: {
      prepare(checkInDate, checkOutDate) {
        return {
          payload: {
            checkInDate,
            checkOutDate
          }
        };
      },
      reducer(state, action) {
        state.isBooked = true;
        state.checkInDate = action.payload.checkInDate;
        state.checkOutDate = action.payload.checkOutDate;
      }
    }
  }
});

export const { chooseHotel, bookHotel } = hotelSlice.actions;
export default hotelSlice.reducer;
