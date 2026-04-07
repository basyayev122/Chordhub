import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = body.title?.trim();
    const artist = body.artist?.trim();
    const category = body.category?.trim() || "Pop";
    const lyrics = body.lyrics?.trim();

    if (!title || !artist || !lyrics) {
      return NextResponse.json({ error: "title, artist, lyrics wajib" }, { status: 400 });
    }

    const slug = slugify(title);

    const { error } = await supabase.from("songs").insert({
      slug,
      title,
      artist,
      category,
      lyrics,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, slug });
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
