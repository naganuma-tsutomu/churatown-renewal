import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "美らタウン沖縄",
  description: "沖縄の店舗・ニュースポータルサイト",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
