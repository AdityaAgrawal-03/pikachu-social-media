import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signupUser,
  selectAuthStatus,
  
} from "../index";

export function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const status = useSelector(selectAuthStatus);
 
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  useEffect(() => {
    if (status === "signed up") {
      navigate("/");
    }
  });

  const signup = () => {
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
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-8"> Welcome to pikachu </h1>
      <div className="flex flex-col rounded-xl bg-coolGray-50 p-4 w-1/2">
        <h2 className="text-2xl text-center uppercase mb-2"> Signup </h2>
        {status === "failed" && <p> user already exists! </p>}
        <form className="flex flex-col items-center mt-4 text-xl">
          <div className="flex w-2/3 justify-between">
            {" "}
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              required={true}
              className="form-input"
              onChange={(e) => setName(() => e.target.value)}
            />{" "}
          </div>

          <div className="flex w-2/3 justify-between">
            {" "}
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              required={true}
              className={
                status === "failed"
                  ? "form-input ring-2 ring-red-500"
                  : "form-input"
              }
              onChange={(e) => setUsername(() => e.target.value)}
            />
          </div>

          <div className="flex w-2/3 justify-between">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="email"
              value={email}
              required={true}
              className="form-input"
              onChange={(e) => setEmail(() => e.target.value)}
            />
          </div>

          <div className="flex w-2/3 justify-between">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              required={true}
              className="form-input"
              onChange={(e) => setPassword(() => e.target.value)}
            />
          </div>

          <button
            type="button"
            className="text-white py-2 px-6 bg-blue-500 rounded-lg mt-4 uppercase"
            onClick={signup}
          >
             {status === "signing up" ? <p> Signing Up... </p> : <p> Signup </p>} 
          </button>
        </form>
      </div>
    </div>
  );
}
