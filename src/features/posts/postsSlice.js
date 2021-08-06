import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    post: "my first post on pikachu",
  },
  {
    id: "2",
    post: "my second post on pikachu",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
