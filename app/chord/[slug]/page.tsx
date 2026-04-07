import { notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";

async function getSong(slug: string) {
  const { data, error } = await supabase
    .from("songs")
    .select("slug,title,artist,category,lyrics")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export default async function ChordPage({
  params,
}: {
  params: { slug: string };
}) {
  const song = await getSong(params.slug);
  if (!song) return notFound();

  return (
    <main style={{ padding: 24 }}>
      <h1>{song.title}</h1>
      <p>{song.artist} • {song.category}</p>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>{song.lyrics}</pre>
    </main>
  );
}
