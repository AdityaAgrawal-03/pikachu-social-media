import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowing,
  selectUserByUsername,
  selectUserStatus,
} from "../index";

export function Following() {
  const { username } = useParams();
  const user = useSelector((state) => selectUserByUsername(state, username));
  const userStatus = useSelector(selectUserStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFollowing({ username: username }));
  }, [dispatch, username]);

  console.log(user.following);

  return (
    <div className="flex">
      {userStatus !== "success" ? (
        <div> Loading.. </div>
      ) : (
        <div className="flex flex-col items-center mx-auto w-1/2 mt-8">
          <h1 className="font-bold uppercase text-xl mb-4">following</h1>
          {user?.following.map((users) => (
            <div key={users._id} className="post-card">
              <button className="font-semibold text-left hover:underline mr-2" onClick={() => navigate(`/${users?.username}`)}>
                {users?.name}
                <small className="font-light"> @{users?.username} </small>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
