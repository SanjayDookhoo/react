"use client";

import { useFreshData } from "./ClientDataProvider";

export default function ClientComponentB() {
  const state = useFreshData();

  if (state.status === "loading") return <div>Loading B…</div>;
  if (state.status === "error") return <div>B error: {state.error.message}</div>;

  return (
    <div>
      B length {state.data.length}
    </div>
  );
}
