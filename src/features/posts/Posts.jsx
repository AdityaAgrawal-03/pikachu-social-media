import { useSelector } from "react-redux";
import Avatar from "react-avatar";

export function Posts() {
  const posts = useSelector((state) => state.posts);
  console.log({ posts });

  return (
    <div className="flex flex-col items-center mt-8">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-coolGray-50 rounded-xl w-1/2 mx-auto flex mb-4 p-4"
        >
          <Avatar
            name="Aditya Agrawal"
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
              Aditya <small className="font-light"> @aditya </small>
            </p>
            <p className="mt-2"> {post.post} </p>
          </div>
        </div>
      ))}
    </div>
  );
}
