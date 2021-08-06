import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postsSlice";
import { nanoid } from "@reduxjs/toolkit";
import Avatar from "react-avatar";

export function AddPost() {
  const [newPost, setNewPost] = useState("");
  const dispatch = useDispatch();

  const onAddPost = () => {
    if (newPost) {
      dispatch(
        postAdded({
          id: nanoid(),
          post: newPost,
        })
      );

      setNewPost("");
    }
  };

  return (
    <section className="flex border-2 w-1/2 rounded-xl p-4  bg-coolGray-50 mx-auto">
      <Avatar name="Aditya Agrawal" round={true} />
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
          onClick={onAddPost}
        >
          {" "}
          Add Post{" "}
        </button>
      </form>
    </section>
  );
}
