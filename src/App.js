import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Home, PrivateRoute } from "./components";
import { Post, Login, Signup } from "./features/index";
import { selectToken, fetchPosts, selectPostStatus, fetchAllUsers, selectUserStatus } from "./features/index";
import { setUpAuthHeaderForServiceCalls } from "./utils/index";

function App() {
  const token = useSelector(selectToken);
  const postStatus = useSelector(selectPostStatus);
  const userStatus = useSelector(selectUserStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setUpAuthHeaderForServiceCalls(token);
    } else {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token && postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, token, postStatus]);

  useEffect(() => {
    if (token && userStatus === "idle") {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, token, userStatus])

  return (
    <div className="bg-coolGray-200 min-h-screen">
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/post/:postId" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
