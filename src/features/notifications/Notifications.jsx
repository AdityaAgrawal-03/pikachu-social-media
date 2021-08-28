import { useSelector } from "react-redux";
import { selectAllUsers, selectCurrentUser } from "../index";

export function Notifications() {
  const users = useSelector(selectAllUsers);
  const currentUser = useSelector(selectCurrentUser);

 const filteredUsers = users.filter((user) => user._id !== currentUser?._id);
 
 const listOfUsers = filteredUsers.map((user) =>  {
    return { name: user?.name }; 
  })

  let notificationData = [
    `${listOfUsers[Math.floor(Math.random() * listOfUsers.length)].name} liked your post`,
    `John Doe followed you`,
    `${listOfUsers[Math.floor(Math.random() * listOfUsers.length)].name} commented on your post`,
    `See what's trending in pikachu app`
  ]
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold uppercase mb-4 text-xl mt-8"> Notifications </h1>
      {notificationData.map((notification, index) => (
        <div key={index} className="post-card w-1/2 mx-auto">
          <p> {notification} </p>
        </div>
      ))}
    </div>
  );
}
