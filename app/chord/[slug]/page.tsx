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
    <main className="chord-container">
      <h1 className="chord-title">{song.title}</h1>
      <p className="chord-meta">{song.artist} • {song.category}</p>

      <section className="chord-block">
        <pre className="chord-lyrics">{song.lyrics}</pre>
      </section>
    </main>
  );
}
