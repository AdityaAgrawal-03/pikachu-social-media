import { useSelector } from "react-redux";

export function Navbar() {

  const token = useSelector((state) => state.auth.token);
  console.log({ token })

  return (
    <div className="flex flex-col items-center justify-around text-xl bg-coolGray-50 rounded-xl w-1/6 h-4/5 fixed mt-8 ml-28">
      <p> Home </p>
      <p> Search </p>
      <p> Notifications </p>
      <p> Profile </p>
      { token && <p> Signout </p> }
      <button className="text-white py-2 px-10 bg-blue-500 rounded-lg"> Post </button>
    </div>
  )
}