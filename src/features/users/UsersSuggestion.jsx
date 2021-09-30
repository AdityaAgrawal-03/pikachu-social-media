import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectAllUsers,
  selectCurrentUser,
  selectFetchedUser,
  getUser,
  selectToken,
  updateFollowingAndFollowers,
} from "../index";
import { setUpAuthHeaderForServiceCalls } from "../../utils/setUpAuthHeaderForServiceCalls";

export function UsersSuggestion() {
  const users = useSelector(selectAllUsers);
  const currentUser = useSelector(selectCurrentUser);
  const fetchedUser = useSelector(selectFetchedUser);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const followingList = fetchedUser?.following;

  useEffect(() => {
    if (token) {
      setUpAuthHeaderForServiceCalls(token);
    } else {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(getUser({ username: currentUser?.username }));
  }, [dispatch, currentUser?.username, followingList]);

  const filteredUsers = users
    ?.filter((user) => user?._id !== fetchedUser?._id)
    ?.filter((user) => (followingList?.includes(user?._id) ? null : user));
  
    const updateFollowingAndFollowersAction = (targetUserId) => {
    dispatch(
      updateFollowingAndFollowers({
        username: currentUser?.username,
        target_userId: targetUserId,
      })
    );
  };

  return (
    <div className="bg-coolGray-50 rounded-xl w-11/12 h-4/5 mr-4 flex flex-col items-center p-4">
      <h2 className="text-xl mb-4 font-bold"> Who to follow </h2>
      {filteredUsers.map((user) => (
        <div key={user?._id} className="w-full m-px">
          <Link to={`/${user?.username}`}>
            <div className="flex justify-between bg-coolGray-200 p-2 rounded-md hover:bg-coolGray-300 p-4">
              <p className="text-left font-bold">
                {user?.name}
                <small className="ml-2 font-light">@{user?.username}</small>
              </p>
              <button
                className="bg-blue-500 text-white rounded-lg p-2 text-sm"
                onClick={(e) => {
                  e.preventDefault()
                  updateFollowingAndFollowersAction(user?._id);
                }}
              >
                Follow
              </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
