"use client";

import { useQuery } from "@tanstack/react-query";

type FreshData = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

async function fetchFreshData(): Promise<FreshData []> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch fresh data");
  }

  return res.json();
}

export default function ClientComponentA() {
  const {data, status, error} = useQuery({
    queryKey: ["url_fetch"],
    queryFn: fetchFreshData
  })

  if (status === "pending") return <div>Loading A…</div>;
  if (status === "error") return <div>A error: {error.message}</div>;

  return (
    <div>
      A length {data.length}
    </div>
  );
}
