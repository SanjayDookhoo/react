# React “Feels Like a Bug” Gotchas (And How to Think About Them)

Yeah — React has a handful of *“feels like a bug until you learn the model”* issues.  
These are the big ones you’ll actually run into, **why** they happen, and **what to do instead**.

---

## 1) Stale closures (not just `setInterval`)

**Symptom:** handlers or effects use *old* props/state.

Happens with:
- `setTimeout`
- event listeners
- websockets
- subscriptions
- async callbacks

**Fix patterns:**

- Prefer functional updates:
```js
setX(prev => /* derive next from prev */);
```

- Put needed values in dependency arrays (or redesign the effect)

- Use a ref for the “latest value” when you truly need a stable callback:

```js
const latest = useRef(value);

useEffect(() => {
  latest.current = value;
}, [value]);
```

---

## 2) Strict Mode “double‑invokes” effects (dev only)

**Symptom:** API calls fire twice, intervals duplicate, analytics events double — **only in development**.

In React 18+, Strict Mode intentionally mounts, unmounts, and re‑runs effects to surface unsafe side effects.

**Fix:**

- Make effects **idempotent**
- Always clean up side effects

```js
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });

  return () => controller.abort();
}, [url]);
```

> Don’t “guard with a boolean” unless you *fully* understand why — fix the side effect instead.

---

## 3) State updates are async + batched

**Symptom:** `console.log(state)` right after `setState` shows the old value; multiple updates appear “merged”.

React batches updates for performance — especially in React 18 (even across promises/timeouts in many cases).

**Fix:**

- Treat state as a **snapshot per render**
- Use functional updates when doing multiple updates

```js
setCount(c => c + 1);
setCount(c => c + 1); // increments twice reliably
```

---

## 4) Mutating state “does nothing”

**Symptom:** you push into an array or mutate an object and React doesn’t re‑render (or UI behaves oddly).

React state must be treated as **immutable** — React compares references, not deep values.

**Fix:**

```js
setItems(prev => [...prev, newItem]); // not prev.push(...)
setUser(prev => ({ ...prev, name: "A" }));
```

---

## 5) `useEffect` dependency weirdness (and infinite loops)

**Symptom:** effect runs too often, or you “fix it” by removing dependencies — creating subtle bugs.

### Why this happens

- Effects re‑run when **dependencies change**
- Objects/functions created inline are **new on every render**
- Updating state that appears *earlier* in the dependency chain can retrigger the effect endlessly

### Critical mental model 🔑

- **Data should always flow forward**
- An effect should **not update state that it directly depends on**, unless carefully controlled
- If state updated *inside* an effect is part of that effect’s dependency list → 🔁 infinite loop

### Treat effects like an *idempotent API*

A well‑written `useEffect` should:
- Be safe to run multiple times
- Produce the same outcome for the same inputs
- Clean up after itself

Think of `useEffect` as:
> “Given these inputs, bring the outside world into the correct state — no more, no less.”

### Common fixes

- Move object creation *inside* the effect
- Depend on **primitives**, not derived objects
- Split effects by responsibility
- Use `useMemo` / `useCallback` when identity matters

**Bad:**

```js
useEffect(() => {
  doThing(options);
}, [options]); // options is new every render
```

**Better:**

```js
useEffect(() => {
  const options = { a, b };
  doThing(options);
}, [a, b]);
```

---

## 6) Keys causing “wrong item reused”

**Symptom:** inputs keep the wrong value, list items swap state, animations glitch.

Using array indexes or unstable keys breaks React’s reconciliation.

**Fix:**

- Use **stable, unique keys** from your data (`id`)
- Only use index as key if the list is truly static

---

## 7) Controlled vs uncontrolled inputs

**Symptom:** warnings, cursor jumps, value resets, input won’t update.

Caused by mixing:
- `defaultValue` with `value`
- Controlled → uncontrolled (or vice versa)

**Fix:** choose **one**:

- **Controlled**
```js
<input value={value} onChange={e => setValue(e.target.value)} />
```

- **Uncontrolled**
```js
<input defaultValue="hello" ref={inputRef} />
```

---

## 8) “Why didn’t my memoization work?”

**Symptom:** `React.memo`, `useMemo`, or `useCallback` don’t reduce renders.

Reasons:
- Props still change identity every render
- Parent re‑renders force children unless memoized correctly

**Fix:**

- Memoize at the *correct boundary*
- Avoid passing inline objects/functions when it matters

---

## 9) Derived state bugs

**Symptom:** you store `filteredItems` in state and it goes out of sync.

Derived data usually should **not** live in state.

**Fix:**

Compute it instead:

```js
const filtered = useMemo(
  () => items.filter(/* ... */),
  [items, query]
);
```

---

## 10) Race conditions in async effects

**Symptom:** an older request finishes last and overwrites newer data.

Very common with:
- search inputs
- route changes
- rapid filters

**Fix patterns:**

- `AbortController`
- request IDs
- ignore stale results

---

## Final Rule of Thumb

If React feels “wrong,” ask:
- *Am I thinking in renders, not steps?*
- *Is this effect idempotent?*
- *Does data flow forward?*
- *Am I mutating or duplicating state?*

Most React bugs disappear once those answers are “yes.”
