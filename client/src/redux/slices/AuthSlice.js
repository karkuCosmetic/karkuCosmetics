import { createSlice } from "@reduxjs/toolkit";


const initialState= {
  token: "",
  status: 0,
  session: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetAuth: (state, action) => {
      
      state.token = action.payload.token;
      state.status = action.payload.status;
      state.session = action.payload.session;
    },
    ClearAuth: (state) => {
      state.auth = "";
      state.status = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetAuth, ClearAuth } = authSlice.actions;

export default authSlice.reducer;
