import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser, selectToken } from "../features/index";

export function Navbar() {
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);
  
  return (
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

      {token && <p> Signout </p>}
      <button className="text-white py-2 px-10 bg-blue-500 rounded-lg">
        Post
      </button>
    </div>
  );
}
