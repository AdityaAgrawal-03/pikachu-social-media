import "../../index.css";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { PostReaction, selectCurrentUser, TimeAgo } from "../index";
import { useSelector } from "react-redux";

export function PostCard({ post }) {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Link to={`/post/${post._id}`}>
      <div className="post-card w-1/2 mx-auto">
        <Avatar name={post?.user.name} round={true} />
        <div className="flex flex-col ml-4">
          <div className="flex items-baseline">
            <p className="font-semibold mr-2">
              {post?.user?.name}
              <small className="font-light"> @{post?.user?.username} </small>
            </p>
            <TimeAgo timestamp={post?.createdAt} />
          </div>

          <p className="my-2"> {post?.content} </p>
          <div>
            <PostReaction postId={post._id} userId={currentUser?._id} />
            <button>
              <span className="material-icons-round blue-500">chat_bubble</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
