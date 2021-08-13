import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchAllUsers
export const fetchAllUsers = createAsyncThunk("users/fetchAllUsers", async () => {
  try {
    const response = await axios.get("https://pikachu-social-media.aditya365.repl.co/users");
    console.log({ response })
    return response.data.users;
  } catch (error) {
    console.error(error);
  }
})

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state, action) => {
      state.status = "pending"
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = state.users.concat(action.payload)
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message
    },
  }
})

export default usersSlice.reducer;