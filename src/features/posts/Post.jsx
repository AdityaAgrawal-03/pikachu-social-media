import "../../index.css";
import Avatar from "react-avatar";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  PostReaction,
  AddComment,
  CommentCard,
  TimeAgo,
  selectPostById,
  selectCurrentUser,
} from "../index";
import { deletePost } from "./postsSlice";

export function Post() {
  const { postId } = useParams();
  const user = useSelector(selectCurrentUser);
  const post = useSelector((state) => selectPostById(state, postId));
  const navigate = useNavigate();

  console.log({ post })

  const dispatch = useDispatch();

  const deletePostAction = () => {
    dispatch(deletePost({ postId: postId }));
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex">
      {post ? (
        <div className="mx-auto lg:w-1/2 w-5/12 mt-8">
          <section className="post-card">
            <Avatar name={post?.user?.name} round={true} />
            <div className="flex flex-col ml-4 w-full">
              <div className="flex relative">
                <div>
                  <button
                    className="font-semibold text-left hover:underline mr-2"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/${post?.user?.username}`);
                    }}
                  >
                    {post.user.name}
                    <small className="font-light ml-2">@{post.user.username}</small>
                  </button>
                  <TimeAgo timestamp={post?.createdAt} />
                </div>
                {user?.username === post?.user?.username && (
                  <button onClick={deletePostAction}>
                    <span className="material-icons-round coolGray-400 absolute top-0 right-0">
                      delete
                    </span>
                  </button>
                )}
              </div>

              <p className="my-2">{post?.content}</p>
              <div className="flex">
                <PostReaction postId={post?._id} userId={user?._id} />
                <button className="flex items-center">
                  <span className="material-icons-round blue-500 mr-1">
                  chat_bubble_outline
                  </span>
                  <small> {post?.comment?.length} </small>
                </button>
              </div>
            </div>
          </section>
          <AddComment postId={postId} />
          {post?.comment.map((comment) => (
            <CommentCard key={comment._id} comment={comment} postId={postId} />
          ))}
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}
