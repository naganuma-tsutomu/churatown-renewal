"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    try {
      const res = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        if (data.role !== "admin") {
          setError("この画面は管理者専用です。一般オーナーの方はトップページからログインしてください。");
          setLoading(false);
          return;
        }
        login(data.token, data.role);
        router.push("/admin");
      } else {
        setError(data.error || "ログインに失敗しました。");
      }
    } catch (err) {
      setError("サーバーとの通信に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Shield className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold italic">ADMIN ACCESS</h1>
          <p className="text-cyan-100 mt-2 text-sm">churatown-renewal system console</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-900/40 text-red-300 p-4 rounded-lg text-sm border border-red-800">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-2 font-mono">ROOT_USER</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition text-slate-200"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-2 font-mono">AUTHENTICATION_KEY</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition text-slate-200"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-bold hover:bg-cyan-500 transition shadow-lg disabled:bg-slate-700 disabled:text-slate-500 border border-cyan-400/30"
          >
            {loading ? "AUTHENTICATING..." : "SYSTEM LOGIN"}
          </button>
        </form>
        
        <div className="p-6 bg-slate-900 border-t border-slate-700 text-center">
          <Link href="/" className="text-slate-500 hover:text-cyan-400 transition text-sm font-mono">
            EXIT_SYSTEM
          </Link>
        </div>
      </div>
    </div>
  );
}
