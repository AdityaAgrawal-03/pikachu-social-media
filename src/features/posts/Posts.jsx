import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import "../../index.css";
import {
  PostReaction,
  selectCurrentUser,
  selectAllPosts,
  TimeAgo,
  deletePost,
} from "../index";

export function Posts() {
  const posts = useSelector(selectAllPosts);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderedPosts = posts.slice().sort((a, b) => {
    return new Date(b?.createdAt) - new Date(a?.createdAt);
  });

  const deletePostAction = (postId) => {
    dispatch(deletePost({ postId: postId }));
  };

  if (!posts.length) {
    return (
      <div className="loader"></div>
    )
  }

  return (
    <div className="flex flex-col items-center mt-8">
      {posts &&
        orderedPosts.map((post) => (
          <Link to={`/post/${post?._id}`} className="post-card" key={post?._id}>
            <Avatar name={post?.user?.name} round={true}  />
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
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deletePostAction(post._id);
                    }}
                  >
                    <span className="material-icons-round coolGray-400 absolute top-0 right-0">
                      delete
                    </span>
                  </button>
                )}
              </div>

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
