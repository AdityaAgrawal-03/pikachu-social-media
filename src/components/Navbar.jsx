import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {  selectCurrentUser, selectToken } from "../features/index";
import { logout } from "../features/authentication/authenticationSlice";

export function Navbar() {
  const [modal, setModal] = useState(false);
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col items-center justify-around text-xl bg-coolGray-50 rounded-xl w-1/6 h-4/5 fixed mt-8 ml-28">
        <Link to="/">
          <p> Home </p>
        </Link>
        <p> Search </p>
        <Link to="/notifications">
          <p> Notifications </p>
        </Link>
        <Link to={`/${currentUser.username}`}>
          <p> Profile </p>
        </Link>

        {token && <button onClick={() => dispatch(logout())}> Signout </button>}
        <button
          className="text-white py-2 px-10 bg-blue-500 rounded-lg"
          onClick={() => setModal(true)}
        >
          Post
        </button>
      </div>
    </>
  );
}
