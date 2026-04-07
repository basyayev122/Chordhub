import songs from "../data/songs.json";
import Link from "next/link";

export default function Home() {
  return (
    <main className="py-4">
      <h1 className="text-xl mb-3">Daftar Lagu</h1>
      <div className="space-y-3">
        {songs.map((song) => (
          <Link key={song.id} href={`/chord/${song.slug}`} className="block panel p-3 rounded">
            <div>{song.title}</div>
            <div className="text-sm opacity-80">{song.artist} • {song.category}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
