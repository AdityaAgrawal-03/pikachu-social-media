import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import "../../index.css";
import { useEffect } from "react";
import { fetchPosts } from "./postsSlice";

export function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  console.log({ posts });

  const postStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, postStatus]);

  return (
    <div className="flex flex-col items-center mt-8">
      {posts.map(({ _id, content, user: { name, username } }) => (
        <Link to={`/post/${_id}`} className="post-card" key={_id}>
          <Avatar
            name="Aditya Agrawal"
            round={true}
            color={Avatar.getRandomColor("sitebase", [
              "#F9FAFB",
              "#F3F4F6",
              "#E5E7EB",
              "#D1D5DB",
              "#9CA3AF",
            ])}
          />
          <div className="flex flex-col ml-4">
            <p className="font-semibold">
              {name} <small className="font-light"> @{username} </small>
            </p>
            <p className="my-2">{content}</p>
            <div>
              <button>
                <span className="material-icons-round blue-500 mr-2">
                  favorite_border
                </span>
              </button>
              <button>
                <span className="material-icons-round blue-500">
                  chat_bubble
                </span>
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
