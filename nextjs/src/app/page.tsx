export default function HomePage() {
  return (
    <div className="stack">
      {Math.random()} :Use this to check if the cache is working as expected
      <div className="card">
        <span className="badge">SSG</span>
        <h1 className="h1">cool website</h1>
        <p className="p">
          This page is static (no data fetching). Next.js can ship it as HTML very efficiently.
        </p>
      </div>

      <div className="card">
        <h2 style={{ margin: 0 }}>What to try</h2>
        <ul style={{ margin: "10px 0 0 18px", color: "var(--muted)" }}>
          <li>Visit <code>/posts</code> (SSG + sub-requests)</li>
          <li>Open a post like <code>/post/2</code> (ISR on dynamic route)</li>
          <li>Call <code>/revalidate</code> to invalidate cached pages</li>
        </ul>
      </div>
    </div>
  );
}
