import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Home, PrivateRoute } from "./components";
import { Post, Login, Signup } from "./features/index";
import { selectToken, fetchPosts, selectPostStatus } from "./features/index";
import { setUpAuthHeaderForServiceCalls } from "./utils/index";

function App() {
  const token = useSelector(selectToken);
  const status = useSelector(selectPostStatus);
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
    if (token && status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, token, status]);

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
