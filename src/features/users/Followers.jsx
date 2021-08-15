import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserByUsername,
  selectUserStatus,
  fetchFollowers,
} from "../index";
import { useEffect } from "react";

export function Followers() {
  const { username } = useParams();
  const user = useSelector((state) => selectUserByUsername(state, username));
  const userStatus = useSelector(selectUserStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFollowers({ username: username }));
  }, [dispatch, username]);

  return (
    <div>
      {userStatus !== "success" ? (
        <div> Loading.. </div>
      ) : (
        <div>
          <h1> followers </h1>
          {user?.followers.map((users) => (
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
