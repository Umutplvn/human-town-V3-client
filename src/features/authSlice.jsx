import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
initialState: {
  loading: false,
  error: false,
  token: null,
  userId: null,
  email: null,
  name: "",
  avatar: "",
},


  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.token = payload?.Token;
      state.userId = payload?.user?._id;
      state.email=payload?.user?.email;
      state.name=payload?.user?.name;
    },

    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.token = payload?.Token;
      state.userId = payload?.user?._id;
      state.email = payload?.user?.email;
      state.avatar=payload?.user?.avatar;
      state.name=payload?.user?.name;
    },

    updateSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.name=payload?.user?.name;
      state.userId = payload?.user?._id;
      state.email = payload?.user?.email;
      state.avatar=payload?.user?.avatar;
    },


    logoutSuccess: (state) => {
    state.loading= false;
    state.error= false;
    state.token= null;
    state.userId= null;
    state.email=null;
    state.avatar="";
    state.name="";
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  updateSuccess

} = authSlice.actions;

export default authSlice.reducer;
