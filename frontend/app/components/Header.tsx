"use client";

import Link from "next/link";
import { User, Shield, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="hover:opacity-90 transition">
          <h1 className="text-3xl font-extrabold tracking-tight">美らタウン沖縄</h1>
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <Link
              href={user.role === "admin" ? "/admin" : "/dashboard"}
              className="flex items-center gap-2 text-sm font-bold bg-white/20 hover:bg-white hover:text-blue-600 transition-all px-5 py-2 rounded-full border border-white/30"
            >
              {user.role === "admin" ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
              {user.role === "admin" ? "管理者画面" : "マイページ"}
            </Link>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-2 text-sm font-bold hover:bg-white hover:text-blue-600 transition-all border-2 border-white px-5 py-2 rounded-full">
                <LogIn className="w-4 h-4" />
                ログイン
              </Link>
              <Link href="/shops/new" className="hidden sm:block text-sm font-medium hover:text-cyan-100 transition-colors bg-white/10 px-4 py-2 rounded-full">
                店舗を登録
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
