import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils";

// fetchAllUsers
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data.users;
  }
);

// user lookup
export const getUser = createAsyncThunk(
  "users/getUser",
  async ({ username }) => {
    const response = await axios.get(`${API_URL}/users/${username}`);

    return response.data.user;
  }
);

// getFollowing
export const fetchFollowing = createAsyncThunk(
  "users/fetchFollowing",
  async ({ username }) => {
    const {
      data: { userId, userFollowing },
    } = await axios.get(`${API_URL}/users/${username}/following`);

    return { userId, userFollowing };
  }
);

// getFollowers
export const fetchFollowers = createAsyncThunk(
  "users/fetchFollowers",
  async ({ username }) => {
    const {
      data: { userId, userFollowers },
    } = await axios.get(`${API_URL}/users/${username}/followers`);

    return { userId, userFollowers };
  }
);

// update following and followers
export const updateFollowingAndFollowers = createAsyncThunk(
  "users/updateFollowingAndFollowers",
  async ({ username, target_userId }) => {
    const {
      data: { sourceUser, targetUser },
    } = await axios.post(`${API_URL}/users/${username}/${target_userId}`);

    return { sourceUser, targetUser };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    fetchedUser: null,
    status: "idle",
    error: null,
  },
  reducers: {
    changeUserStatus: (state) => {
      state.status = "idle";
      state.users = [];
    }
  },
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
    [getUser.pending]: (state) => {
      state.status = "pending";
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.fetchedUser = action.payload;
    },
    [getUser.rejected]: (state, action) => {
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
      console.log(action.payload);
      const sourceUser = state.users.find(
        (user) => user._id === action.payload.sourceUser._id
      );
      const targetUser = state.users.find(
        (user) => user._id === action.payload.targetUser._id
      );

      console.log({ sourceUser });

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

        const indexOfTargetUser = sourceUser.following.findIndex(
          (userId) => userId === targetUser._id
        );

        if (indexOfTargetUser > -1) {
          sourceUser.following.splice(indexOfTargetUser, 1);
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

export const { changeUserStatus } = usersSlice.actions

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users.users;
export const selectUserStatus = (state) => state.users.status;
export const selectUserByUsername = (state, username) =>
  state.users.users.find((user) => user?.username === username);
export const selectFetchedUser = (state) => state.users.fetchedUser;
