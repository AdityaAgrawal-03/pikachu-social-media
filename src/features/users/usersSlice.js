import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils";

// fetchAllUsers
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    try {
      const response = await axios.get(
        "https://pikachu-social-media.aditya365.repl.co/users"
      );
      console.log({ response });
      return response.data.users;
    } catch (error) {
      console.error(error);
    }
  }
);

// getFollowing
export const fetchFollowing = createAsyncThunk(
  "users/fetchFollowing",
  async ({ username }) => {
    try {
      const {
        data: { userId, userFollowing },
      } = await axios.get(`${API_URL}/users/${username}/following`);

      return { userId, userFollowing };
    } catch (error) {
      console.error(error);
    }
  }
);

// getFollowers
export const fetchFollowers = createAsyncThunk(
  "users/fetchFollowers",
  async ({ username }) => {
    try {
      const {
        data: { userId, userFollowers },
      } = await axios.get(`${API_URL}/users/${username}/followers`);

      return { userId, userFollowers };
    } catch (error) {
      console.error(error);
    }
  }
);

// update following and followers
export const updateFollowingAndFollowers = createAsyncThunk(
  "users/updateFollowingAndFollowers",
  async ({ username, target_userId }) => {
    try {
      const {
        data: { sourceUser, targetUser },
      } = await axios.post(`${API_URL}/users/${username}/${target_userId}`);

      return { sourceUser, targetUser };
    } catch (error) {
      console.error(error);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = state.users.concat(action.payload);
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchFollowing.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchFollowing.fulfilled]: (state, action) => {
      state.status = "success";
      const user = state.users.find(
        (user) => user._id === action.payload.userId
      );

      user.following = action.payload.userFollowing;
    },
    [fetchFollowing.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [fetchFollowers.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchFollowers.fulfilled]: (state, action) => {
      state.status = "success";
      const user = state.users.find(
        (user) => user._id === action.payload.userId
      );

      user.followers = action.payload.userFollowers;
    },
    [fetchFollowers.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [updateFollowingAndFollowers.pending]: (state, action) => {
      state.status = "pending";
    },
    [updateFollowingAndFollowers.fulfilled]: (state, action) => {
      
      console.log(action.payload)

      const sourceUser = state.users.find(
        (user) => user._id === action.payload.sourceUser._id
      );
      const targetUser = state.users.find(
        (user) => user._id === action.payload.targetUser._id
      );

      const isInTargetUserFollowers = targetUser.followers.includes(
        sourceUser._id
      );

      if (!isInTargetUserFollowers) {
        targetUser.followers.push(sourceUser._id);
        sourceUser.following.push(targetUser._id);
      } else {
        const indexOfSourceUser = targetUser.followers.findIndex(
          (userId) => userId === sourceUser._id
        );
        if (indexOfSourceUser > -1) {
          targetUser.followers.splice(indexOfSourceUser, 1);
        }

        const indexOfTargetUser = sourceUser.following.findIndex(userId => userId === targetUser._id);

        if (indexOfTargetUser > -1) {
          sourceUser.following.splice(indexOfTargetUser, 1)
        }
      }

      state.status = "success";
    },
    [updateFollowingAndFollowers.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  },
});

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users.users;
export const selectUserStatus = (state) => state.users.status;
export const selectUserByUsername = (state, username) =>
  state.users.users.find((user) => user?.username === username);
