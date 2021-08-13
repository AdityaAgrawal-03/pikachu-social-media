import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectAuthStatus } from "./authenticationSlice";
import "../../index.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector(selectAuthStatus);

  useEffect(() => {
    if (status === "signed in") {
      navigate("/", { replace: true });
    }
  }, [status, navigate]);

  const login = () => {
    status === "idle" &&
      dispatch(loginUser({ email: email, password: password }));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-8"> Welcome to pikachu </h1>
      <div className="flex flex-col rounded-xl bg-coolGray-50 p-4 w-1/2">
        <h2 className="text-2xl text-center uppercase"> Login </h2>
        <form className="flex flex-col items-center mt-4 text-xl">
          <label>
            Email
            <input
              className="form-input"
              name="email"
              id="email"
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(() => e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              className="form-input"
              name="password"
              id="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(() => e.target.value)}
            />
          </label>
          <button
            type="button"
            className="text-white py-2 px-6 bg-blue-500 rounded-lg"
            onClick={login}
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          {" "}
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            {" "}
            Signup{" "}
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
