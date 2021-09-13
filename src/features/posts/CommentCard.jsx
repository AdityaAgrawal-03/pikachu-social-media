import "../../index.css";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllUsers,
  TimeAgo,
  selectCurrentUser,
  deleteComment,
} from "../index";

export function CommentCard({ comment, postId }) {
  const users = useSelector(selectAllUsers);
  const currentUser = useSelector(selectCurrentUser);
  const commentUser = users.find((user) => user?._id === comment?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteCommentAction = (postId, commentId) => {
    dispatch(deleteComment({ postId, commentId }));
  };

  return (
    <div className="post-card">
      <Avatar name={commentUser?.name} round={true} />
      <div className="flex flex-col ml-4 w-full">
        <div className="flex relative">
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
          {currentUser?.username === commentUser?.username && (
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteCommentAction(postId, comment?._id);
              }}
            >
              <span className="material-icons-round coolGray-400 absolute top-0 right-0">
                delete
              </span>
            </button>
          )}
        </div>

        <p> {comment.text} </p>
      </div>
    </div>
  );
}
