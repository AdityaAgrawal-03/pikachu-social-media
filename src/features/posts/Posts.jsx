import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import "../../index.css";
import { useEffect } from "react";
import { fetchPosts } from "./postsSlice";
import { setUpAuthHeaderForServiceCalls } from "../../utils/index";
import { PostReaction } from "../index";

export function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  console.log({ posts });

  const postStatus = useSelector((state) => state.posts.status);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  console.log({ user });

  useEffect(() => {
    if (token) {
      setUpAuthHeaderForServiceCalls(token);
    } else {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (postStatus === "idle") {
      console.log({ postStatus });
      dispatch(fetchPosts());
    }
  }, [dispatch, postStatus]);

  return (
    <div className="flex flex-col items-center mt-8">
      {posts &&
        posts.map((post) => (
          <Link to={`/post/${post._id}`} className="post-card" key={post._id}>
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
                {post.user.name}{" "}
                <small className="font-light"> @{post.user.username} </small>
              </p>
              <p className="my-2">{post.content}</p>
              <div>
                <PostReaction postId={post._id} userId={user._id} />
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
