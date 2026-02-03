import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// This uses revalidatePath, which invalidates the cache and the page regenerates on the next request.
// because it is a get request, it cant have a JSON body, and because the path has '/' it is placed at the end as a query string
// example: http://localhost:3000/revalidate?secret=<SECRET_TO_REPLACE>&path=/post/1

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const secret = searchParams.get("secret");
  const path = searchParams.get("path");

  const expected = process.env.REVALIDATE_SECRET;

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET is not set on the server" },
      { status: 500 }
    );
  }

  if (secret !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  if (!path || !path.startsWith("/")) {
    return NextResponse.json(
      { ok: false, error: "Provide a valid path, e.g. /post/2" },
      { status: 400 }
    );
  }

  // Invalidate the cache for that path.
  revalidatePath(path);

  return NextResponse.json({
    ok: true,
    revalidated: path,
    note: "Cache invalidated. Page regenerates on the next request to that path.",
  });
}
