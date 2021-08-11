import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(
      "https://pikachu-social-media.aditya365.repl.co/posts"
    );
    console.log({ response });

    return response.data.posts;
  } catch (error) {
    console.error(error);
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    postAdded: (state, action) => {
      state.posts.push(action.payload);
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading"
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  }
});

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
