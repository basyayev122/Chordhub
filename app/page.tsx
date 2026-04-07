import songs from "../data/songs.json";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Daftar Lagu</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </main>
  );
}
