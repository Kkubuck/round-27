import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Round 27 — Cindy AMRAP Timer",
  description: "A clean Cindy timer with dynamic round pacing and shareable workout results.",
};

export default function Home() {
  return (
    <main className="cindy-site">
      <iframe
        title="Round 27 Cindy AMRAP Timer"
        src="/cindy.html"
        allowFullScreen
      />
    </main>
  );
}
