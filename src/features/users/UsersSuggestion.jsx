import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers } from "./usersSlice";

export function UsersSuggestion() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.users.status)

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, userStatus])

  return (
    <div className="bg-coolGray-50 rounded-xl w-11/12 h-4/5 mr-4 flex flex-col items-center p-4">
      <h2 className="text-xl"> Who to follow </h2>
    </div>
  )
}