import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data.posts;
});

export const addPost = createAsyncThunk(
  "posts/addPost",
  async ({ content }) => {
    const response = await axios.post(`${API_URL}/posts`, {
      content: content,
    });

    return response.data.post;
  }
);

export const likeButtonPressed = createAsyncThunk(
  "posts/likeButtonPressed",
  async ({ postId }) => {
    const {
      data: { post, userId },
    } = await axios.post(`${API_URL}/posts/like/${postId}`);
    return { post, userId };
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async ({ postId }) => {
    const {
      data: { post },
    } = await axios.get(`${API_URL}/posts/${postId}`);
    return post;
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, comment }) => {
    const response = await axios.post(`${API_URL}/posts/comment/${postId}`, {
      comment: comment,
    });

    return response.data.post;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId }) => {
    const response = await axios.delete(`${API_URL}/posts/${postId}`);

    return response.data.deletedPost;
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ postId, commentId }) => {
    const {
      data: { post, commentToBeDeleted },
    } = await axios.delete(`${API_URL}/posts/comment/${postId}/${commentId}`);

    return { commentToBeDeleted, post };
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
      const post = state.posts.find((post) => post._id === action.payload._id);
      post.comment = action.payload.comment;
      state.status = "success";
    },
    [addComment.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [deletePost.pending]: (state, action) => {
      state.status = "deleting";
    },
    [deletePost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );

      if (postIndex > -1) {
        state.posts.splice(postIndex, 1);
      }
      state.status = "deleted";
    },
    [deletePost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [deleteComment.pending]: (state) => {
      state.status = "deleting";
    },
    [deleteComment.fulfilled]: (state, action) => {
      const post = state.posts.find((post) => post._id === action.payload.post);

      const commentIndex = post.comment.findIndex(
        (comment) => comment._id === action.payload.commentToBeDeleted._id
      );

      if (commentIndex > -1) {
        post.comment.splice(commentIndex, 1);
      }

      state.status = "success";
    },
    [deleteComment.rejected]: (state, action) => {
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
