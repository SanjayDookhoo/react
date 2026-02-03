import Link from "next/link";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type User = {
  id: number;
  name: string;
};

type PostWithAuthor = Post & { authorName: string };

async function getPostsWithAuthors(): Promise<PostWithAuthor[]> {
  const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!postsRes.ok) throw new Error("Failed to fetch posts");
  const posts: Post[] = await postsRes.json();

  const first10 = posts.slice(0, 10);

  // "dynamic sub-requests": fetch additional data per post
  const users = await Promise.all(
    first10.map(async (p) => {
      const userRes = await fetch(
        `https://jsonplaceholder.typicode.com/users/${p.userId}`
      );
      if (!userRes.ok) throw new Error("Failed to fetch user");
      return (await userRes.json()) as User;
    })
  );

  const byId = new Map(users.map((u) => [u.id, u.name]));

  return first10.map((p) => ({
    ...p,
    authorName: byId.get(p.userId) ?? "Unknown",
  }));
}

export default async function PostsPage() {
  const posts = await getPostsWithAuthors();

  return (
    <div className="stack">
      <div className="card">
        <span className="badge">SSG + sub-requests</span>
        <h1 className="h1">Posts</h1>
        <p className="p">
          This list is statically generated at build time from the JSONPlaceholder API.
        </p>
      </div>

      <ul className="list">
        {posts.map((p) => (
          <li key={p.id} className="item">
            <h3 className="itemTitle">
              <Link href={`/post/${p.id}`}>{p.title}</Link>
            </h3>
            <p className="itemMeta">
              <span>Author: {p.authorName}</span>
              <span>Post ID: {p.id}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
