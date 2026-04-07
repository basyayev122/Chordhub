"use client";

import songs from "../../../data/songs.json";
import { notFound, useParams } from "next/navigation";
import { useMemo, useState, useEffect, useRef } from "react";
import { transposeLyrics } from "../../../lib/transpose";

export default function ChordPage() {
  const { slug } = useParams<{ slug: string }>();
  const song = songs.find((s) => s.slug === slug);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!auto) {
      if (raf.current) cancelAnimationFrame(raf.current);
      return;
    }
    const run = () => {
      window.scrollBy(0, 1);
      raf.current = requestAnimationFrame(run);
    };
    raf.current = requestAnimationFrame(run);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [auto]);

  if (!song) return notFound();

  const text = useMemo(() => {
    const t = transposeLyrics(song.lyrics, step);
    return t.replace(/\[([^\]]+)\]/g, `<span class="c">$1</span>`);
  }, [song.lyrics, step]);

  return (
    <main className="chord-wrap py-6">
      <h1 className="chord-title mb-4">
        Kunci Gitar {song.artist} - {song.title} Chord Dasar
      </h1>

      <div className="chord-panel mb-4 flex gap-2">
        <button className="chord-btn" onClick={() => setStep((s) => s - 1)}>Transpose -</button>
        <button className="chord-btn" onClick={() => setStep((s) => s + 1)}>Transpose +</button>
        <button className="chord-btn" onClick={() => setAuto((v) => !v)}>
          {auto ? "Stop Scroll" : "Auto Scroll"}
        </button>
      </div>

      <div
        className="chord-lyrics chord-panel"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </main>
  );
}
