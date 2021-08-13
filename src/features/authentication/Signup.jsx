import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "./authenticationSlice";

export function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "signed up") {
      navigate("/", { replace: true });
    }
  });

  const signup = () => {
    status === "idle" &&
      dispatch(
        signupUser({
          name: name,
          username: username,
          email: email,
          password: password,
        })
      );
  };

  return (
    <div>
      <h1> Signup </h1>
      <form>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(() => e.target.value)}
          />
        </label>
        <label htmlFor="username">
          Username
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(() => e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(() => e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(() => e.target.value)}
          />
        </label>
        <button type="button" onClick={signup}>
          {" "}
          Signup{" "}
        </button>
      </form>
    </div>
  );
}