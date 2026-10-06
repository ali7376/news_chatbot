import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nukta — World News, Explained",
  description:
    "Live world news, curated video coverage, and an AI assistant that explains, compares and summarizes the day's stories.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
