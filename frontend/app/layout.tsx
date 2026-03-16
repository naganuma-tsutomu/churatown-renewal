import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "美らタウン沖縄",
  description: "沖縄の店舗・ニュースポータルサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
