import Link from "next/link";
import { supabase } from "../../lib/supabase";

export const revalidate = 10;

async function getSongs() {
  const { data, error } = await supabase
    .from("songs")
    .select("id, slug, title, artist, category")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

export default async function SearchPage() {
  const songs = await getSongs();

  return (
    <main className="py-4">
      <h1 className="text-2xl font-bold mb-4">Search Lagu</h1>
      <div className="space-y-3">
        {songs.map((song: any) => (
          <Link
            key={song.id}
            href={`/chord/${song.slug}`}
            className="block panel p-3 rounded"
          >
            <div>{song.title}</div>
            <div className="text-sm opacity-80">
              {song.artist} • {song.category}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
