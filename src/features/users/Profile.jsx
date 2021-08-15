import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import {
  selectUserByUsername,
  selectCurrentUser,
  updateFollowingAndFollowers,
} from "../index";

export function Profile() {
  const { username } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const user = useSelector((state) => selectUserByUsername(state, username));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInFollowers = user?.followers.includes(currentUser._id);

  const updateFollowingAndFollowersAction = () => {
    dispatch(
      updateFollowingAndFollowers({
        username: currentUser?.username,
        target_userId: user._id,
      })
    );
  };

  return (
    <div className="flex">
      {user ? (
        <div className="flex justify-between bg-coolGray-50 mt-8 w-1/2 mx-auto rounded-xl p-4">
          <div className="flex">
            <Avatar name={user?.name} round={true} />
            <div className="flex flex-col ml-8">
              <p className="font-semibold text-xl">
                {user.name}
                <small className="font-light text-md"> @{username} </small>
              </p>
              <p className="text-sm mt-4">
                <button
                  className="hover:underline mr-1"
                  onClick={() => navigate(`/${username}/followers`)}
                >
                  {user?.followers.length} Followers
                </button>
                <button
                  className="hover:underline"
                  onClick={() => navigate(`/${username}/following`)}
                >
                  {user?.following.length} Following
                </button>
              </p>
            </div>
          </div>
          <button
            className={
              isInFollowers
                ? "text-white py-2 px-6 bg-red-500 rounded-lg h-10"
                : "text-white py-2 px-6 bg-blue-500 rounded-lg h-10"
            }
            onClick={updateFollowingAndFollowersAction}
          >
            {isInFollowers ? <p> Unfollow </p> : <p> Follow </p>}
          </button>
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </div>
  );
}
