import "../../index.css";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers, TimeAgo } from "../index";

export function CommentCard({ comment }) {
  const users = useSelector(selectAllUsers);
  const commentUser = users.find((user) => user?._id === comment?.user);
  const navigate = useNavigate();

  return (
    <div className="post-card">
      <Avatar name="aditya agrawal" round={true} />
      <div className="flex flex-col ml-4">
        <div>
          <button
            className="font-semibold text-left hover:underline"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${commentUser?.username}`);
            }}
          >
            {commentUser?.name}
            <small className="font-light"> @{commentUser?.username} </small>
          </button>
          <TimeAgo timestamp={comment?.createdAt} />
        </div>

        <p> {comment.text} </p>
      </div>
    </div>
  );
}
