import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import "../../index.css";
import { selectAllPosts } from "./postsSlice";
import { selectCurrentUser } from "../authentication/authenticationSlice";
import { PostReaction } from "../index";

export function Posts() {
  const posts = useSelector(selectAllPosts);
  const user = useSelector(selectCurrentUser);

  console.log({ user, posts })

  return (
    <div className="flex flex-col items-center mt-8">
      {posts &&
        posts.map((post) => (
          <Link to={`/post/${post._id}`} className="post-card" key={post._id}>
            <Avatar
              name={user?.name}
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
