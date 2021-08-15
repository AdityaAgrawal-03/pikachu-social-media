import { useEffect } from "react";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    dispatch(fetchFollowing({ username: username }));
  }, [dispatch, username]);

  console.log(user.following);

  return (
    <div>
      {userStatus !== "success" ? (
        <div> Loading.. </div>
      ) : (
        <div>
          <h1> following {username} </h1>
          {user?.following.map((users) => (
            <div key={users._id}>
              <p>
                {users?.name} <small> {users?.username} </small>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
