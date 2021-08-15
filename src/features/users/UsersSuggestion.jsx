import { useSelector } from "react-redux";
import { selectAllUsers, selectCurrentUser } from "../index";

export function UsersSuggestion() {
  const users = useSelector(selectAllUsers);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="bg-coolGray-50 rounded-xl w-11/12 h-4/5 mr-4 flex flex-col items-center p-4">
      <h2 className="text-xl"> Who to follow </h2>
      {users.map((user) => (
        <div key={user._id}>
          <p>
            {user.name === currentUser.name ? null : user.name}
            <small>
              {user.username === currentUser.username ? null : user.username}
            </small>
          </p>
        </div>
      ))}
    </div>
  );
}
