import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser, selectToken, AddPost } from "../features/index";
import { logout } from "../features/authentication/authenticationSlice";
import { useState } from "react";
import "../index.css";

export function Navbar() {
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {show && <AddPost setShow={setShow} show={show} />}

      <div className="flex flex-col items-center justify-around text-xl bg-coolGray-50 fixed  rounded-xl w-1/6 h-4/5  mt-8 ml-28">
        <Link to="/">
          <p> Home </p>
        </Link>
        <Link to="/search">
          <p> Search </p>
        </Link>

        <Link to="/notifications">
          <p> Notifications </p>
        </Link>
        <Link to={`/${currentUser?.username}`}>
          <p> Profile </p>
        </Link>

        {token && <button onClick={() => dispatch(logout())}> Signout </button>}
        <button
          className="text-white py-2 px-10 bg-blue-500 rounded-lg"
          onClick={() => setShow(!show)}
        >
          Post
        </button>
      </div>
    </>
  );
}
