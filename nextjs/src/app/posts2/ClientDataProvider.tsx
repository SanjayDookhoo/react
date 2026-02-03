"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * 🔒 Data shape is private to the provider
 */
type FreshData = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

/**
 * State machine for safety & clarity
 */
type State =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: FreshData []; error: null }
  | { status: "error"; data: null; error: Error };

const FreshDataContext = createContext<State | null>(null);

/**
 * 🔒 Fetch logic lives ONLY here
 * Always fresh (client-side, no cache)
 */
async function fetchFreshData(): Promise<FreshData []> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch fresh data");
  }

  return res.json();
}

export function ClientDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<State>({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchFreshData();
        if (!cancelled) {
          setState({ status: "success", data, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            status: "error",
            data: null,
            error: err as Error,
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return (
    <FreshDataContext.Provider value={value}>
      {children}
    </FreshDataContext.Provider>
  );
}

/**
 * Consumer hook
 */
export function useFreshData() {
  const ctx = useContext(FreshDataContext);
  if (!ctx) {
    throw new Error("useFreshData must be used within ClientDataProvider");
  }
  return ctx;
}
