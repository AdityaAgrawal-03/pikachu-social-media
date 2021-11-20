import { useDispatch, useSelector } from "react-redux";
import { likeButtonPressed } from "./postsSlice";
import "../../index.css";

export function PostReaction({ postId, userId }) {
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post._id === postId)
  );
  const dispatch = useDispatch();

  const isInLiked = post?.likes.includes(userId);

  const likeButtonPressedAction = (e) => {
    e.preventDefault();
    dispatch(likeButtonPressed({ postId: postId, userId: userId }));
  };

  return (
    <>
      {!isInLiked ? (
        <button onClick={(e) => likeButtonPressedAction(e)} className="flex items-center mr-2">
          <span className="material-icons-round blue-500 mr-1">
            favorite_border
          </span>
          <small> {post?.likes?.length} </small>
        </button>
      ) : (
        <button onClick={(e) => likeButtonPressedAction(e)} className="flex items-center mr-2">
          <span className="material-icons-round blue-500 mr-1">favorite</span>
          <small> {post?.likes?.length} </small>
        </button>
      )}
    </>
  );
}
