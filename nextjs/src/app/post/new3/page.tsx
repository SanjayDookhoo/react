import { update } from "@/data-access/example";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { updateNameAction } from "./actions";

export default function NewPostPage() {
  const id = 1; // this could maybe even be a params id
  return (
    <div className="stack">
      <div className="card">
        <span className="badge">Server component + client form</span>
        <h1 className="h1">Create a new post</h1>
        <p className="p">
          Draft a new post below. Everything is server side.
        </p>
        <div style={{ marginTop: 12 }}>
          <Link href="/posts">← Back to posts</Link>
        </div>
      </div>
      <div className="card">
        <form
          action={updateNameAction.bind(null, id)}
        >
          <input type="text" name="name" />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
