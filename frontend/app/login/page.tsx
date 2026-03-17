"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("登録が完了しました。ログインしてください。");
    }
  }, [searchParams]);

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
        if (data.role === "admin") {
          setError("管理者は専用のログイン画面からログインしてください。");
          setLoading(false);
          return;
        }
        login(data.token, data.role);
        router.push("/dashboard");
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white text-center">
          <h1 className="text-2xl font-bold">店舗オーナー ログイン</h1>
          <p className="text-blue-100 mt-2">美らタウン沖縄 管理システム</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {success && (
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-lg text-sm border border-emerald-100">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">ユーザー名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg disabled:bg-slate-300"
          >
            {loading ? "ログイン中..." : "ログイン"}
          </button>

          <div className="text-center text-sm text-slate-500">
            アカウントをお持ちでないですか？{" "}
            <Link href="/register" className="text-blue-600 font-bold hover:underline">
              新規登録
            </Link>
          </div>
        </form>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <Link href="/" className="text-slate-500 hover:text-blue-600 transition text-sm">
            ← サイトトップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
