import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser, selectAllUsers } from "../index";

export function Search() {
  const users = useSelector(selectAllUsers);
  const currentUser = useSelector(selectCurrentUser);

  const filteredUsers = users.filter((user) => user._id !== currentUser?._id);
  const [searchText, setSearchText] = useState("");

  const debounce = (fn, delay) => {
    let timer;

    return function () {
      let context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, arguments);
      }, delay);
    };
  };

  const searchUser = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-8 mb-4 w-1/2">
        <input
          className="p-4 rounded-lg focus:ring-2 focus:ring-coolGray-400 focus:outline-none w-full"
          placeholder="Search for a user"
          type="text"
          id="search"
          onKeyUp={debounce(searchUser, 300)}
        />
      </div>
      {filteredUsers
        .filter((user) => {
          if (searchText === "") {
            return user;
          } else if (
            user?.name.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return user;
          }
        })
        .map((user) => (
          <Link to={`/${user?.username}`} key={user._id}>
            <p className="text-xl uppercase"> {user?.name} </p>
          </Link>
        ))}
    </div>
  );
}
