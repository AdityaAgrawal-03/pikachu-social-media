import "../../index.css";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../index";

export function CommentCard({ comment }) {
  const users = useSelector(selectAllUsers);
  const commentUser = users.find((user) => user._id === comment.user);
  const navigate = useNavigate();

  console.log({ commentUser });

  return (
    <div className="post-card">
      <Avatar name="aditya agrawal" round={true} />
      <div className="flex flex-col ml-4">
        <button
          className="font-semibold text-left"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${commentUser?.username}`);
          }}
        >
          {commentUser?.name}{" "}
          <small className="font-light"> @{commentUser?.username} </small>
        </button>
        <p> {comment.text} </p>
      </div>
    </div>
  );
}
