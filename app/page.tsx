import { supabase } from "../lib/supabase";

export const revalidate = 60;

async function getSongs() {
  const { data, error } = await supabase
    .from("songs")
    .select("id, slug, title, artist, category")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

export default async function Home() {
  const songs = await getSongs();

  return (
    <main style={{ padding: 24 }}>
      <h1>Daftar Lagu (DB)</h1>
      <ul>
        {songs.map((s: any) => (
          <li key={s.id}>
            {s.title} - {s.artist} ({s.category})
          </li>
        ))}
      </ul>
    </main>
  );
}
