"use client";

import songs from "../../data/songs.json";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function SearchPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const x = q.toLowerCase().trim();
    if (!x) return songs;
    return songs.filter(
      (s) =>
        s.title.toLowerCase().includes(x) ||
        s.artist.toLowerCase().includes(x) ||
        s.category.toLowerCase().includes(x)
    );
  }, [q]);

  return (
    <main className="py-4">
      <h1 className="text-xl mb-3">Search Lagu</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cari judul / artis..."
        className="w-full panel p-3 rounded mb-4"
      />
      <div className="space-y-3">
        {filtered.map((song) => (
          <Link
            key={song.id}
            href={`/chord/${song.slug}`}
            className="block panel p-3 rounded"
          >
            <div>{song.title}</div>
            <div className="text-sm opacity-80">{song.artist} • {song.category}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
