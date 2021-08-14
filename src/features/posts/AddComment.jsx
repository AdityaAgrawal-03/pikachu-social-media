import { useState } from "react";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "./postsSlice";
import { selectCurrentUser } from "../index";

export function AddComment({ postId }) {
  const [commentText, setCommentText] = useState("");
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const addCommentAction = () => {
    commentText &&
      dispatch(addComment({ postId: postId, comment: commentText }));
    setCommentText("");
  };

  return (
    <div className="bg-coolGray-50 w-11/12 rounded-xl p-4 flex">
      <Avatar name={user?.name} round={true} />
      <form className="w-full ml-4">
        <textarea
          className="resize-none rounded-lg w-full h-28 bg-coolGray-50 p-2 focus:border-coolGray-500 focus:outline-none focus:ring-2 focus:ring-coolGray-500"
          name="comment"
          id="comment"
          placeholder="add a comment"
          value={commentText}
          onChange={(e) => setCommentText(() => e.target.value)}
        />
        <button
          type="button"
          disabled={commentText ? false : true}
          className={
            commentText
              ? "text-white py-2 px-6 bg-blue-500 rounded-lg"
              : "text-white py-2 px-6 bg-blue-500 rounded-lg opacity-50 cursor-default"
          }
          onClick={addCommentAction}
        >
          Reply
        </button>
      </form>
    </div>
  );
}
