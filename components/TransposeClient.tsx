"use client";

import { useMemo, useState } from "react";
import { transposeLyrics } from "../lib/transpose";

export default function TransposeClient({ lyrics }: { lyrics: string }) {
  const [step, setStep] = useState(0);

  const text = useMemo(() => transposeLyrics(lyrics, step), [lyrics, step]);

  return (
    <div>
      <div className="mb-3 flex gap-2">
        <button className="chord-btn" onClick={() => setStep((s) => s - 1)}>Transpose -</button>
        <button className="chord-btn" onClick={() => setStep((s) => s + 1)}>Transpose +</button>
      </div>
      <pre className="panel p-3 rounded whitespace-pre-wrap">{text}</pre>
    </div>
  );
}
