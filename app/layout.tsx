import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Basyayev Chord",
  description: "Chord gitar dark mode dengan transpose & auto-scroll",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <header className="border-b border-zinc-800 bg-black/90 sticky top-0 z-50">
          <div className="container-main py-2">
            <div className="flex gap-2">
              <input
                className="flex-1 panel px-3 py-2 text-sm"
                placeholder="Cari Chord"
              />
              <button className="panel px-4 py-2 text-sm neon">Cari</button>
            </div>
            <nav className="mt-2 flex gap-4 text-sm neon">
              <Link href="/">Home</Link>
              <Link href="/search">Daftar Isi</Link>
              <Link href="/category/pop">Pop</Link>
            </nav>
          </div>
        </header>

        <main className="container-main py-5">{children}</main>
      </body>
    </html>
  );
}
