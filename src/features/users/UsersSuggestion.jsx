import { useSelector } from "react-redux";
import { selectAllUsers, selectCurrentUser } from "../index";

export function UsersSuggestion() {
  const users = useSelector(selectAllUsers);
  const currentUser = useSelector(selectCurrentUser);

  console.log({ users })

  const followingList = currentUser.following;
  
  const filteredUsers = users.filter((user) => user._id !== currentUser._id);

  // const whoToFollow = [];

  // for (let i = 0; i < filteredUsers.length; i++) {
  //   for(let j=0; j < followingList.length; j++) {
  //     if(filteredUsers[i]._id === followingList[j]) {

  //     }
  //   }
  // }

  return (
    <div className="bg-coolGray-50 rounded-xl w-11/12 h-4/5 mr-4 flex flex-col items-center p-4">
      <h2 className="text-xl mb-4"> Who to follow </h2>
      {filteredUsers.map((user) => (
        <div key={user?._id}>
          <p>
            {user?.name}
            <small className="ml-2">@{user?.username}</small>
          </p>
        </div>
      ))}
    </div>
  );
}
