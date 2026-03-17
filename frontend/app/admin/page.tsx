"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Users, Store, BarChart3, Settings, LogOut, Search } from "lucide-react";

export default function AdminDashboard() {
  const { user, token, logout, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ totalShops: 0, totalUsers: 0, totalNews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/admin/login");
    } else if (user && token) {
      fetchStats();
    }
  }, [user, isLoading, token]);

  const fetchStats = async () => {
    // 実際には統計取得用のAPIを叩く
    // 今回はデモ用のダミー
    setStats({ totalShops: 12, totalUsers: 8, totalNews: 45 });
    setLoading(false);
  };

  if (isLoading || loading) return <div className="p-10 text-center text-slate-400">読み込み中...</div>;
  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            サイト管理
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg bg-cyan-600 text-white font-medium">
            <BarChart3 className="w-5 h-5" />
            概要
          </Link>
          <Link href="/admin/shops" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition">
            <Store className="w-5 h-5" />
            店舗一覧
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition">
            <Users className="w-5 h-5" />
            ユーザー一覧
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition">
            <Settings className="w-5 h-5" />
            システム設定
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={logout} className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-900/30 hover:text-red-400 transition">
            <LogOut className="w-5 h-5" />
            ログアウト
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">ダッシュボード概要</h1>
            <p className="text-slate-500 mt-2">サイトの稼働状況を確認できます。</p>
          </div>
          <div className="flex gap-4">
             <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="店舗を検索..." 
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                />
             </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {[
            { label: "登録店舗数", value: stats.totalShops, icon: Store, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "有効ユーザー", value: stats.totalUsers, icon: Users, color: "text-cyan-600", bg: "bg-cyan-50" },
            { label: "総投稿数", value: stats.totalNews, icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
              <div className={`${item.bg} p-4 rounded-2xl`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">{item.label}</p>
                <p className="text-3xl font-bold text-slate-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">最近の店舗登録</h3>
            <Link href="/admin/shops" className="text-cyan-600 font-bold text-sm hover:underline">
              全て見る
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4">店舗名</th>
                  <th className="px-6 py-4">カテゴリ</th>
                  <th className="px-6 py-4">登録日</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {/* 実際にはデータをループする */}
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-semibold text-slate-700">うちなー食堂</td>
                  <td className="px-6 py-4 text-slate-500">グルメ</td>
                  <td className="px-6 py-4 text-slate-500">2026/03/17</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-bold text-cyan-600 hover:text-cyan-700">編集</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
