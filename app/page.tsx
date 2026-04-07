import Link from "next/link";
import { supabase } from "../lib/supabase";

export const revalidate = 60;

async function getSongs() {
  const { data, error } = await supabase
    .from("songs")
    .select("id,slug,title,artist,category")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

export default async function Home() {
  const songs = await getSongs();

  return (
    <main className="py-4">
      <h1 className="text-xl mb-3">Daftar Lagu (DB)</h1>
      <div className="space-y-2">
        {songs.map((s: any) => (
          <Link key={s.id} href={`/chord/${s.slug}`} className="block">
            {s.title} - {s.artist} ({s.category})
          </Link>
        ))}
      </div>
    </main>
  );
}
