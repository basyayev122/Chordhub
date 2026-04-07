"use client";

import { useState } from "react";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [category, setCategory] = useState("Pop");
  const [lyrics, setLyrics] = useState("");
  const [msg, setMsg] = useState("");

  const slugPreview = slugify(title || "");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Menyimpan...");

    const res = await fetch("/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, artist, category, lyrics }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(`Error: ${data.error || "gagal simpan"}`);
      return;
    }

    setMsg(`Berhasil disimpan ✅ slug: ${data.slug}`);
    setTitle("");
    setArtist("");
    setCategory("Pop");
    setLyrics("");
  }

  return (
    <main style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
      <h1>Admin - Tambah Lagu</h1>
      <form onSubmit={submit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <input
          placeholder="Judul lagu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <small>Slug otomatis: <b>{slugPreview || "-"}</b></small>

        <input
          placeholder="Artis"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        <input
          placeholder="Kategori (Pop/Rock/Indie)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <textarea
          placeholder="Lirik + chord"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          rows={10}
        />

        <button type="submit">Simpan Lagu</button>
      </form>

      <p style={{ marginTop: 12 }}>{msg}</p>
    </main>
  );
}
