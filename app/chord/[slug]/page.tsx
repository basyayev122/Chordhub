import songs from "../../../data/songs.json";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return songs.map((s) => ({ slug: s.slug }));
}

export default async function ChordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const song = songs.find((s) => s.slug === slug);
  if (!song) return notFound();

  return (
    <main style={{ padding: 24 }}>
      <h1>{song.title}</h1>
      <p>{song.artist} • {song.category}</p>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>{song.lyrics}</pre>
    </main>
  );
}
