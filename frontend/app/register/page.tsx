"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("パスワードが一致しません。");
      return;
    }

    setLoading(true);
    setError("");

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    try {
      const res = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role: "owner" }),
      });

      const data = await res.json();
      if (res.ok) {
        // 登録成功、そのままログイン画面へ
        router.push("/login?registered=true");
      } else {
        setError(data.error || "登録に失敗しました。このユーザー名は既に使用されている可能性があります。");
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
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <UserPlus className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">店舗オーナー 新規登録</h1>
          <p className="text-emerald-50 mt-2 text-sm">美らタウン沖縄であなたの店舗をアピールしましょう</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
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
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"
              required
              placeholder="店舗名やオーナー名など"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">パスワード（確認）</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition shadow-lg disabled:bg-slate-300"
          >
            {loading ? "登録中..." : "オーナーとして登録"}
          </button>
        </form>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500 mb-2">既にアカウントをお持ちですか？</p>
          <Link href="/login" className="text-emerald-600 font-bold hover:underline">
            ログインはこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
