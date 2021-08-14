import "../../index.css";
import Avatar from "react-avatar";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectPostById, selectCurrentUser } from "../index";
import { PostReaction, AddComment, CommentCard } from "../index";

export function Post() {
  const { postId } = useParams();
  const user = useSelector(selectCurrentUser);
  const post = useSelector((state) => selectPostById(state, postId));

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
              <p className="font-semibold">
                {post?.user?.name}{" "}
                <small className="font-light"> @{post?.user?.username} </small>
              </p>
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
