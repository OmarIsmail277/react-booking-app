import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = savedUser
  ? {
      ...savedUser,
      bookings: savedUser.bookings || [],
      isAuthenticated: true,
    }
  : {
      fullName: "",
      email: "",
      country: "",
      phone: "",
      bookings: [],
      isAuthenticated: false,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createNewUser: {
      prepare(fullName, email, country, phone) {
        return {
          payload: { fullName, email, country, phone },
        };
      },
      reducer(state, action) {
        const { fullName, email, country, phone } = action.payload;
        state.fullName = fullName;
        state.email = email;
        state.country = country;
        state.phone = phone;
        state.isAuthenticated = false;
      },
    },

    bookHotel(state, action) {
      if (!state.bookings) {
        state.bookings = [];
      }
      state.bookings.push(action.payload);

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...state,
          bookings: state.bookings,
        })
      );
    },

    login(state, action) {
      const { fullName, email, country, phone } = action.payload;
      state.fullName = fullName;
      state.email = email;
      state.country = country;
      state.phone = phone;
      state.isAuthenticated = true;

      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName,
          email,
          country,
          phone,
          bookings: state.bookings,
        })
      );
    },

    logout(state) {
      state.fullName = "";
      state.email = "";
      state.country = "";
      state.phone = "";
      state.bookings = [];
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { createNewUser, login, logout, bookHotel } = userSlice.actions;
export default userSlice.reducer;
