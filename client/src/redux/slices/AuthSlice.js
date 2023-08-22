import { createSlice } from "@reduxjs/toolkit";


const initialState= {
  auth: "",
  status: 0,
  autorized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetAuth: (state, action) => {
      
      state.auth = action.payload.auth;
      state.status = action.payload.status;
      state.autorized = action.payload.autorized;
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
