import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  fullName: "",
  email: "",
  country: "Egypt",
  phone: "",
};

const userSlice = createSlice({
  name: "user",
  intialState,
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
      },
    },
  },
});

export const { createUser } = userSlice.actions;

export default userSlice.reducer;
