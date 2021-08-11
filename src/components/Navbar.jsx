

export function Navbar() {
  return (
    <div className="flex flex-col items-center justify-around text-xl bg-coolGray-50 rounded-xl w-1/6 h-4/5 fixed mt-8 ml-28">
      <p> Home </p>
      <p> Search </p>
      <p> Notifications </p>
      <p> Profile </p>
      <button className="text-white py-2 px-6 bg-blue-500 rounded-lg"> Post </button>
    </div>
  )
}