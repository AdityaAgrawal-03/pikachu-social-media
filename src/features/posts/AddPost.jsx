import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import { addPost } from "./postsSlice";
import { selectCurrentUser } from "../index";

export function AddPost({ setShow, show }) {
  const [newPost, setNewPost] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const addPostElement = useRef();

  const addPostAction = () => {
    dispatch(addPost({ content: newPost }));
    if (show) {
      setTimeout(() => {
        setShow(!show);
      }, 1000);
    }

    setNewPost("");
  };

  useEffect(() => {
    addPostElement.current.focus();
  }, [])

  return (
    <div
      className={
        show
          ? "w-screen fixed flex bg-black bg-opacity-60 z-50 inset-0"
          : undefined
      }
    >
      <section
        className={
          show
            ? "left-1/4 top-1/3 w-1/2 relative h-1/3 flex border-2 rounded-xl p-4 bg-coolGray-50"
            : "border-2 post-card mt-8 mx-auto mb-2"
        }
      >
        {show && (
          <button
            onClick={() => setShow(!show)}
            className="absolute top-0 right-0 font-bold hover:bg-coolGray-400"
          >
            <span className="material-icons-round">close</span>
          </button>
        )}
        <Avatar name={user?.name} round={true} />
        <form className={show ? "w-full h-4/5 ml-4 mt-4" : "w-full h-4/5 ml-4"}>
          <label htmlFor="newPost">
            <textarea
              className="p-2 w-full h-32 rounded-lg border-2 resize-none border-coolGray-300 focus:border-coolGray-500 focus:outline-none focus:ring-2 focus:ring-coolGray-500"
              placeholder="What's on your mind?"
              name="newPost"
              id="newPost"
              type="text"
              maxLength="280"
              value={newPost}
              ref={addPostElement}
              onChange={(e) => setNewPost(() => e.target.value)}
            />
          </label>
          <button
            type="button"
            className="text-white py-2 px-6 bg-blue-500 rounded-lg"
            onClick={addPostAction}
          >
            Add Post
          </button>
        </form>
      </section>
    </div>
  );
}
