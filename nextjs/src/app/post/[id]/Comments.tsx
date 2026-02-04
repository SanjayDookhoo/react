'use client';

import { useEffect, useState } from "react";
import Comment from "./Comment";

type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export default function Comments ({id} : {id : string}) {
  const [comments, setComments] = useState<Comment[]>([])

  function pickRandom<T>(items: T[], count: number): T[] {
    const copy = [...items];
    // Fisher–Yates-ish shuffle for small arrays
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
  }

  async function getRandomCommentsForPost(id: string): Promise<void> {
    // Pull all comments for this post, then randomly select a few
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${id}`
    );
    if (!res.ok) throw new Error("Failed to fetch comments");
    const comments = (await res.json()) as Comment[];

    // randomly pick up to 2
    const randomComments = pickRandom(comments, Math.min(2, comments.length));
    setComments(randomComments)
  }

  useEffect(() => {
    getRandomCommentsForPost(id)
  }, [id])

  return (
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
            <Comment body={c.body} />
          </div>
        ))}
      </div>
    </div>
  )
}