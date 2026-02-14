import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lean AI Leaderboard",
  description: "Dashboard tracking lean AI companies and their metrics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg-primary antialiased">
        <nav className="border-b border-border sticky top-0 z-50 backdrop-blur-xl bg-bg-primary/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-cyan-accent font-mono text-lg font-bold glow-cyan">
                {">"}_
              </span>
              <h1 className="text-lg font-bold">Lean AI Leaderboard</h1>
            </div>
            <div className="flex gap-4 text-sm font-mono">
              <a
                href="/"
                className="text-text-secondary hover:text-cyan-accent transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/analytics"
                className="text-text-secondary hover:text-cyan-accent transition-colors"
              >
                Analytics
              </a>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
