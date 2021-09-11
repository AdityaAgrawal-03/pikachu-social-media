import { AddPost, Posts } from "../features";

import { UsersSuggestion } from "../features";

export function Home() {
  return (
    <div className="flex min-h-screen min-w-full">
      <div className="w-1/4 min-h-screen mb-4">{/* <Navbar /> */}</div>
      <div className="flex flex-col w-1/2">
        <AddPost />
        <Posts />
      </div>
      <div className="w-1/4 mt-8">
        <UsersSuggestion />
      </div>
    </div>
  );
}
