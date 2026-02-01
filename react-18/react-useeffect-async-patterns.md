# React `useEffect` async patterns

## Version A (not recommended): `async` effect callback

```tsx
useEffect(async () => {
    const temp = await test();
    // do something with temp
}, []);
```

**Why this is not recommended**

- An `async` function **always returns a Promise**.
- React expects an effect callback to return **either**:
  - `undefined`, or
  - a **cleanup function**.
- So this pattern effectively becomes: `useEffect(() => Promise, [])`, which violates the effect contract.
- React **does not await** the returned Promise, and it can’t be used for cleanup.
- In React 18 dev **Strict Mode**, effects may run twice (mount → cleanup → mount) to surface unsafe side effects; this pattern tends to amplify issues like duplicate requests and state updates after unmount.

---

## Version B (recommended): define an async function inside the effect

```tsx
useEffect(() => {
    const fn = async () => {
        const temp = await test();
        // do something with temp
    };

    fn();
}, []);
```

### Which is better?

✅ **Version B is better.**

**Why**

- The effect callback stays **synchronous**, so React sees the correct return type.
- You can still add a proper **cleanup** function.
- Works cleanly with React 18 Strict Mode behavior and keeps the effect model predictable.

---

## Fetch example with `AbortController`

Use this pattern when the effect performs a `fetch()` so you can **cancel** the request during cleanup (e.g., component unmount or dependency change).

```tsx
import { useEffect, useState } from "react";

type User = { id: number; name: string };

export function UserPanel({ userId }: { userId: number }) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const load = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`/api/users/${userId}`, {
                    signal: controller.signal,
                    headers: { "Accept": "application/json" },
                });

                if (!res.ok) {
                    throw new Error(`Request failed: ${res.status}`);
                }

                const data: User = await res.json();
                setUser(data);
            } catch (e: any) {
                // Ignore abort errors (they’re expected during cleanup)
                if (e?.name === "AbortError") return;
                setError(e?.message ?? "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        load();

        // Cleanup cancels the in-flight request
        return () => {
            controller.abort();
        };
    }, [userId]);

    if (loading) return <div>Loading…</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (!user) return <div>No user loaded</div>;

    return (
        <div>
            <h3>User</h3>
            <div>ID: {user.id}</div>
            <div>Name: {user.name}</div>
        </div>
    );
}
```

### Notes

- Cleanup runs when:
  - the component unmounts, **or**
  - dependencies change (here, when `userId` changes).
- Aborting prevents:
  - wasted network work
  - state updates tied to an outdated request
  - noisy errors during rapid re-renders / navigation
