import Link from "next/link";

import NewPostForm from "./NewPostForm";

export default function NewPostPage() {
  return (
    <div className="stack">
      <div className="card">
        <span className="badge">Server component + client form</span>
        <h1 className="h1">Create a new post</h1>
        <p className="p">
          Draft a new post below. This page renders on the server, while the form
          interactions happen client-side.
        </p>
        <div style={{ marginTop: 12 }}>
          <Link href="/posts">← Back to posts</Link>
        </div>
      </div>
      <div className="card">
        <NewPostForm />
      </div>
    </div>
  );
}
