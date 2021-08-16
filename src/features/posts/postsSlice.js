import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data.posts;
  } catch (error) {
    console.error(error);
  }
});

export const addPost = createAsyncThunk(
  "posts/addPost",
  async ({ content }) => {
    try {
      const response = await axios.post(`${API_URL}/posts`, {
        content: content,
      });
      console.log({ response });
      return response.data.post;
    } catch (error) {
      console.error(error);
    }
  }
);

export const likeButtonPressed = createAsyncThunk(
  "posts/likeButtonPressed",
  async ({ postId }) => {
    try {
      const {
        data: { post, userId },
      } = await axios.post(`${API_URL}/posts/like/${postId}`);
      return { post, userId };
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async ({ postId }) => {
    try {
      const {
        data: { post },
      } = await axios.get(`${API_URL}/posts/${postId}`);
      return post;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, comment }) => {
    try {
      const response = await axios.post(`${API_URL}/posts/comment/${postId}`, {
        comment: comment,
      });
      console.log({ response });
      return response.data.post;
    } catch (error) {
      console.error(error);
    }
  }
);

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
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [likeButtonPressed.pending]: (state, action) => {
      state.status = "pending";
    },
    [likeButtonPressed.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.status = "success";
      const post = state.posts.find(
        (post) => post._id === action.payload.post._id
      );
      const isInLiked = post.likes.includes(action.payload.userId);

      if (!isInLiked) {
        post.likes.push(action.payload.userId);
      } else {
        const userIndex = post.likes.findIndex(
          (userId) => userId === action.payload.userId
        );
        if (userIndex > -1) {
          post.likes.splice(userIndex, 1);
        }
      }
    },
    [likeButtonPressed.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addPost.pending]: (state, action) => {
      state.status = "pending";
    },
    [addPost.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts.push(action.payload);
    },
    [addPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [addComment.pending]: (state, action) => {
      state.status = "loading";
    },
    [addComment.fulfilled]: (state, action) => {
      console.log(action.payload);
      const post = state.posts.find((post) => post._id === action.payload._id);
      post.comment = action.payload.comment;
      state.status = "success";
    },
    [addComment.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  },
});

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostStatus = (state) => state.posts.status;
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post?._id === postId);
export const selectPostByUserId = (state, userId) =>
  state.posts.posts.filter((post) => post.user._id === userId);
