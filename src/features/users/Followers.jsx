import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserByUsername,
  selectUserStatus,
  fetchFollowers,
  selectToken,
} from "../index";
import { setUpAuthHeaderForServiceCalls } from "../../utils/index";
import { useEffect } from "react";

export function Followers() {
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
    dispatch(fetchFollowers({ username: username }));
  }, [dispatch, username]);

  console.log({ userStatus, user });

  return (
    <div className="flex">
      {userStatus === "success" ? (
        <div className="flex flex-col items-center mx-auto w-1/2 mt-8">
          <p className="font-bold uppercase text-xl mb-4"> followers </p>

          {user?.followers?.map((users) => (
            <div key={users?._id} className="post-card">
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
        <div className="loader"></div>
      )}
    </div>
  );
}
