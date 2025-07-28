import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  country: "",
  phone: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: {
      prepare(fullName, email, country, phone) {
        return {
          payload: {
            fullName,
            email,
            country,
            phone,
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.country = action.payload.country;
        state.phone = action.payload.phone;
        // state.isAuthenticated = false;
      },
    },
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { createUser, login, logout } = userSlice.actions;

export default userSlice.reducer;
