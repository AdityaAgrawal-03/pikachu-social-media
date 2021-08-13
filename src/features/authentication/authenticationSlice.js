import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, setUpAuthHeaderForServiceCalls } from "../../utils/index";

// login
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }) => {
    console.log({ email, password });
    try {
      const {
        data: { token, user },
      } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      console.log({ token, user })

      return { token, user };
    } catch (error) {
      console.error(error);
    }
  }
);

// signupUser
export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ name, username, email, password }) => {
    try {
      const { data: token } = await axios.post(`${API_URL}/signup`, {
        name,
        username,
        email,
        password,
      });
      console.log({ token });
      return token;
    } catch (error) {
      console.error(error);
    }
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
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "signing in";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "signed in";
      state.token = action.payload.token;
      localStorage?.setItem("token", JSON.stringify({ token: state.token }));
      setUpAuthHeaderForServiceCalls(state.token);
      state.currentUser = action.payload.user;
      localStorage?.setItem("user", JSON.stringify({ user: state.currentUser }))
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
      state.token = action.payload;
      localStorage?.setItem("token", JSON.stringify({ token: state.token }));
      setUpAuthHeaderForServiceCalls(state.token);
    },
    [signupUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default authSlice.reducer;

export const selectToken = state => state.auth.token;
export const selectCurrentUser = state => state.auth.currentUser;
export const selectAuthStatus = state => state.auth.status;
