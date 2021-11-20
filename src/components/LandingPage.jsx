
// show this page when user is not logged in
// design the login and signup page

export function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-8"> Welcome to pikachu </h1>
      <div className="flex flex-col rounded-xl bg-coolGray-50 p-4 w-1/2">
        <h2 className="text-2xl"> Login </h2>
      </div>
    </div>
  );
}
