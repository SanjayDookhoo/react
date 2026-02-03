import Comments from "@/components/post/Comments";
import Link from "next/link";
import { notFound } from "next/navigation";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

// ISR: revalidate at most once per minute
// If this is left out, it will be cached forever
// export const revalidate = 60;

// Don't prebuild any params at build time;
// pages will be generated on-demand as they are first requested.
// also if this is excluded, this would be generated new everytime serverside, this is needed for ISG
export async function generateStaticParams() {
  // if for some reason there are known pages that will be accessed before hand, this will ensure that it is generated at build time, rather than when first attempted to be reached
  // return [{ id: "1" }]
  return [];
}

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch post");
  return (await res.json()) as Post;
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

  return (
    <div className="stack">
      <div className="card">
        <span className="badge">ISR dynamic route + sub-requests</span>
        <h1 className="h1">{post.title}</h1>
        <p className="p">{post.body}</p>
        {Math.random()} :Use this to check if the cache is working as expected
        <div style={{ marginTop: 12 }}>
          <Link href="/posts">← Back to posts</Link>
        </div>

        <p className="p" style={{ marginTop: 10 }}>
          Note: comments are randomly selected and will change after regeneration.
        </p>
      </div>
      <Comments id={id}/>
    </div>
  );
}
