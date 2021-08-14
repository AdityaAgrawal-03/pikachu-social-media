import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import { addPost } from "./postsSlice";
import { selectCurrentUser } from "../index"

export function AddPost() {
  const [newPost, setNewPost] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const addPostAction = () => {
    dispatch(addPost({ content: newPost }));
    setNewPost("");
  };

  return (
    <section className="flex border-2 w-11/12 rounded-xl p-4  bg-coolGray-50 mx-auto mt-8">
      <Avatar name={user?.name} round={true} />
      <form className="w-full h-4/5 ml-4">
        <label htmlFor="newPost">
          <textarea
            className="p-2 w-full h-32 rounded-lg border-2 resize-none border-coolGray-300 focus:border-coolGray-500 focus:outline-none focus:ring-2 focus:ring-coolGray-500"
            placeholder="What's on your mind?"
            name="newPost"
            id="newPost"
            type="text"
            maxLength="280"
            value={newPost}
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
  );
}
