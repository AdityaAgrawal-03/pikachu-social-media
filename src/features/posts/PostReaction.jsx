import { useDispatch, useSelector } from "react-redux";
import { likeButtonPressed } from "./postsSlice";
import "../../index.css";

export function PostReaction({ postId, userId }) {
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post._id === postId)
  );
  const dispatch = useDispatch();

  const isInLiked = post.likes.includes(userId);

  const likeButtonPressedAction = (e) => {
    e.preventDefault();
    dispatch(likeButtonPressed({ postId: postId, userId: userId }));
  };

  return (
    <>
      {!isInLiked ? (
        <button onClick={(e) => likeButtonPressedAction(e)}>
          <span className="material-icons-round blue-500 mr-2">
            favorite_border
          </span>
        </button>
      ) : (
        <button onClick={(e) => likeButtonPressedAction(e)}>
          <span className="material-icons-round blue-500 mr-2">favorite</span>
        </button>
      )}
    </>
  );
}
