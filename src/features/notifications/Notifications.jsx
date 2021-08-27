import { useSelector } from "react-redux";
import { selectAllUsers } from "../index";

export function Notifications() {
  const users = useSelector(selectAllUsers);

  const listOfUsername = users.map((user) => {
    return { userId: user._id, username: user.username };
  });

  console.log({ listOfUsername });

  return (
    <div>
      <h1> Notifications </h1>
    </div>
  );
}
