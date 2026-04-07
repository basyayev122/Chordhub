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
    <main className="py-4">
      <h1 className="text-2xl font-bold mb-2">{song.title}</h1>
      <p className="opacity-80 mb-4">{song.artist} • {song.category}</p>
      <pre className="panel p-3 rounded whitespace-pre-wrap">{song.lyrics}</pre>
    </main>
  );
}
