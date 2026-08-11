import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cindy AMRAP Timer",
  description: "A monochrome CrossFit Cindy timer with dynamic set pacing.",
};

export default function Home() {
  return (
    <main className="cindy-site">
      <iframe
        title="Cindy AMRAP Timer"
        src="/cindy.html"
        allowFullScreen
      />
    </main>
  );
}
