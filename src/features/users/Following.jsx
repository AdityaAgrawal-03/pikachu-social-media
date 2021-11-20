import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowing,
  selectUserByUsername,
  selectUserStatus,
  selectToken,
} from "../index";
import { setUpAuthHeaderForServiceCalls } from "../../utils";

export function Following() {
  const { username } = useParams();
  const user = useSelector((state) => selectUserByUsername(state, username));
  const userStatus = useSelector(selectUserStatus);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setUpAuthHeaderForServiceCalls(token);
    }
  }, [token]);

  useEffect(() => {
    dispatch(fetchFollowing({ username: username }));
  }, [dispatch, username]);

  return (
    <div className="flex">
      {userStatus === "success" ? (
        <div className="flex flex-col items-center mx-auto w-1/2 mt-8">
          <h1 className="font-bold uppercase text-xl mb-4">following</h1>
          {user?.following.map((users) => (
            <div key={users._id} className="post-card">
              <button
                className="font-semibold text-left hover:underline mr-2"
                onClick={() => navigate(`/${users?.username}`)}
              >
                {users?.name}
                <small className="font-light"> @{users?.username} </small>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="loader"> </div>
      )}
    </div>
  );
}
