"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Shield, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export function Header() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="hover:opacity-90 transition">
          <Image
            src="/images/logo.png"
            alt="美らタウン沖縄"
            width={180}
            height={48}
            className={`h-10 w-auto transition-all duration-500 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
            priority
          />
        </Link>
        <nav className="flex items-center gap-3">
          {user ? (
            <Link
              href={user.role === "admin" ? "/admin" : "/dashboard"}
              className={`flex items-center gap-2 text-sm font-bold transition-all px-5 py-2 rounded-full border ${
                scrolled
                  ? "border-slate-200 text-slate-700 hover:bg-ocean-500 hover:text-white hover:border-ocean-500"
                  : "border-white/30 text-white bg-white/20 hover:bg-white hover:text-ocean-600"
              }`}
            >
              {user.role === "admin" ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
              {user.role === "admin" ? "管理者画面" : "マイページ"}
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className={`flex items-center gap-2 text-sm font-bold transition-all px-5 py-2 rounded-full border-2 ${
                  scrolled
                    ? "border-ocean-500 text-ocean-600 hover:bg-ocean-500 hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-ocean-600"
                }`}
              >
                <LogIn className="w-4 h-4" />
                ログイン
              </Link>
              <Link
                href="/shops/new"
                className={`hidden sm:block text-sm font-medium transition-all px-4 py-2 rounded-full ${
                  scrolled
                    ? "text-slate-500 hover:text-ocean-600"
                    : "text-white/80 hover:text-white bg-white/10"
                }`}
              >
                店舗を登録
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
