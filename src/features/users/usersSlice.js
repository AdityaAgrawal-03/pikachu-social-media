import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const loginUser = createAsyncThunk("users/loginUser", async () => {
//   const response = await axios
// })


const initialState = [
  { id: nanoid(), name: "Aditya" },
  { id: nanoid() , name: "Slim Shady"}
]

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}
})

export default usersSlice.reducer;