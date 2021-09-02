import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/index";

// login
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }) => {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    return { token: response.data.token, user: response.data.user };
  }
);

// signupUser
export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ name, username, email, password }) => {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      username,
      email,
      password,
    });

    return { token: response.data.token, user: response.data.user };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: JSON.parse(localStorage?.getItem("token"))?.token,
    currentUser: JSON.parse(localStorage?.getItem("user"))?.user,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state, action) => {
      localStorage?.removeItem("token");
      localStorage?.removeItem("user");
      state.token = null;
      state.currentUser = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "signing in";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "signed in";
      state.token = action.payload.token;
      localStorage?.setItem("token", JSON.stringify({ token: state.token }));

      state.currentUser = action.payload.user;
      localStorage?.setItem(
        "user",
        JSON.stringify({ user: state.currentUser })
      );
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [signupUser.pending]: (state, action) => {
      state.status = "signing up";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.status = "signed up";
      state.token = action.payload.token;
      localStorage?.setItem("token", JSON.stringify({ token: state.token }));

      state.currentUser = action.payload.user;
      localStorage?.setItem(
        "user",
        JSON.stringify({ user: state.currentUser })
      );
    },
    [signupUser.rejected]: (state, action) => {
      console.log("here");
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
