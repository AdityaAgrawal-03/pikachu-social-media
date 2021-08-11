import { useParams } from "react-router";
import { useSelector } from "react-redux";
import "../../index.css";

export function SinglePost() {
  const { postId } = useParams();
  
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post?.id === postId)
  );
  
  return (
    <section className="post-card">
      <p> {post.post} </p>
    </section>
  );
}
