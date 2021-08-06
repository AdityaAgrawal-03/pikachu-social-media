import { AddPost, Posts } from "../features";

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AddPost />
      <Posts />
    </div>
  );
}
