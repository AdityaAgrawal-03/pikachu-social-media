import "../../index.css";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../index";

export function CommentCard({ comment }) {
  const users = useSelector(selectAllUsers);
  const commentUser = users.find((user) => user._id === comment.user);

  console.log({ commentUser });

  return (
    <div className="post-card">
      <Avatar name="aditya agrawal" round={true} />
      <div className="flex flex-col ml-4">
        <p className="font-semibold mb-4">
          {commentUser?.name}
          <small className="font-light"> @{commentUser?.username} </small>
        </p>
        <p> {comment.text} </p>
      </div>
    </div>
  );
}
