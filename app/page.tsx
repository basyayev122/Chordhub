import songs from "@/data/songs.json";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Lagu</h1>
      <div className="space-y-3">
        {songs.map((song) => (
          <Link
            key={song.id}
            href={`/chord/${song.slug}`}
            className="block panel p-3 rounded-lg"
          >
            <div className="font-semibold">{song.title}</div>
            <div className="text-sm text-zinc-400">{song.artist} • {song.category}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
