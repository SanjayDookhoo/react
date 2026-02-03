import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Next.js SSG / ISR Demo",
  description: "A tiny app to understand what Next.js adds over React",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container headerInner">
            <div className="brand">Next.js Demo</div>
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/posts">Posts</Link>
            </nav>
          </div>
        </header>

        <main className="container">{children}</main>

        <footer className="footer">
          <div className="container footerInner">
            <span>
              SSG / ISR / On-demand revalidatePath demo
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
