import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import authReducer from "../features/authentication/authenticationSlice"
  
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    auth: authReducer
  },
});
