import Link from "next/link";
import { notFound } from "next/navigation";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

// ISR: revalidate at most once per minute
export const revalidate = 60;

// Don't prebuild any params at build time;
// pages will be generated on-demand as they are first requested.
export async function generateStaticParams() {
  return [];
}

function pickRandom<T>(items: T[], count: number): T[] {
  const copy = [...items];
  // Fisher–Yates-ish shuffle for small arrays
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch post");
  return (await res.json()) as Post;
}

async function getRandomCommentsForPost(id: string): Promise<Comment[]> {
  // Pull all comments for this post, then randomly select a few
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch comments");
  const comments = (await res.json()) as Comment[];

  // randomly pick up to 5
  return pickRandom(comments, Math.min(5, comments.length));
}

/*
  For the current version of nextjs, params is a promise, the previous version no longer works 

  previous version:

  export default async function PostPage({ params }: { params: { id: string }}) {
  const { id } = params
*/

export default async function PostPage({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params
  const post = await getPost(id);
  if (!post) notFound();

  const comments = await getRandomCommentsForPost(id);

  return (
    <div className="stack">
      <div className="card">
        <span className="badge">ISR dynamic route + sub-requests</span>
        <h1 className="h1">{post.title}</h1>
        <p className="p">{post.body}</p>

        <div style={{ marginTop: 12 }}>
          <Link href="/posts">← Back to posts</Link>
        </div>

        <p className="p" style={{ marginTop: 10 }}>
          Note: comments are randomly selected and will change after regeneration.
        </p>
      </div>

      <div className="card">
        <h2 style={{ margin: 0 }}>Random comments</h2>
        <div style={{ marginTop: 10 }} className="stack">
          {comments.map((c) => (
            <div key={c.id} className="item">
              <h3 className="itemTitle" style={{ marginBottom: 4 }}>
                {c.name}
              </h3>
              <p className="itemMeta" style={{ marginBottom: 10 }}>
                <span>{c.email}</span>
                <span>Comment ID: {c.id}</span>
              </p>
              <p className="p" style={{ color: "var(--text)" }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
