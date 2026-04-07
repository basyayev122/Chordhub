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

      <div style={{ marginTop: "10px" }}>
        {song.lyrics
          .trim()
          .split("\n\n")
          .map((block, i) => {
            const [chord = "", lyric = ""] = block.split("\n");
            return (
              <div key={i} style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "20px", lineHeight: "1.2" }}>{chord}</div>
                <div style={{ fontSize: "28px", lineHeight: "1.2" }}>{lyric}</div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
