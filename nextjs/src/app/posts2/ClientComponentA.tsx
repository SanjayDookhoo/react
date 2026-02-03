"use client";

import { useFreshData } from "./ClientDataProvider";

export default function ClientComponentA() {
  const state = useFreshData();

  if (state.status === "loading") return <div>Loading A…</div>;
  if (state.status === "error") return <div>A error: {state.error.message}</div>;

  return (
    <div>
      B length {state.data.length}
    </div>
  );
}
