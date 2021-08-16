import "../../index.css";
import Avatar from "react-avatar";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PostReaction, AddComment, CommentCard, TimeAgo, selectPostById, selectCurrentUser } from "../index";

export function Post() {
  const { postId } = useParams();
  const user = useSelector(selectCurrentUser);
  const post = useSelector((state) => selectPostById(state, postId));
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      {post ? (
        <div className="mx-auto w-1/2">
          <section className="post-card">
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
            <div>
                <button
                  className="font-semibold text-left hover:underline mr-2"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/${post?.user?.username}`);
                  }}
                >
                  {post.user.name}
                  <small className="font-light"> @{post.user.username} </small>
                </button>
                <TimeAgo timestamp={post?.createdAt} />
              </div>
              <p className="my-2">{post?.content}</p>
              <div>
                <PostReaction postId={post?._id} userId={user?._id} />
                <button>
                  <span className="material-icons-round blue-500">
                    chat_bubble
                  </span>
                </button>
              </div>
            </div>
          </section>
          <AddComment postId={postId} />
          {post?.comment.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </div>
  );
}
