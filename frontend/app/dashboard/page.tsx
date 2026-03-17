"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Store, FileText, Settings, LogOut, PlusCircle } from "lucide-react";

export default function Dashboard() {
  const { user, token, logout, isLoading } = useAuth();
  const router = useRouter();
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    } else if (user && token) {
      fetchMyShops();
    }
  }, [user, isLoading, token]);

  const fetchMyShops = async () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    try {
      // 実際にはバックエンドに owner_id でフィルタリングする機能が必要
      // 今回はデモとして全件取得し、フロントでフィルタリング（または全件表示）する形を想定
      const res = await fetch(`${apiBaseUrl}/api/shops`);
      const data = await res.json();
      setShops(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading) return <div className="p-10 text-center text-slate-400">読み込み中...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-blue-400" />
            マイページ
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-blue-600 text-white font-medium">
            <Store className="w-5 h-5" />
            店舗管理
          </Link>
          <Link href="/news/new" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition">
            <PlusCircle className="w-5 h-5" />
            ニュース投稿
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
            <h1 className="text-3xl font-bold text-slate-800">店舗管理</h1>
            <p className="text-slate-500 mt-2">ようこそ、{user.username}さん（店舗オーナー）</p>
          </div>
          <Link href="/shops/new" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            新規店舗登録
          </Link>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shops.length > 0 ? (
            shops.map((shop) => (
              <div key={shop.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                <div className="flex gap-6">
                  <div className="w-32 h-32 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                    {shop.image_url ? (
                      <img src={shop.image_url} alt={shop.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 text-2xl">📸</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-slate-800">{shop.name}</h3>
                      <span className="text-xs bg-cyan-50 text-cyan-600 px-2 py-1 rounded-md font-bold">{shop.category}</span>
                    </div>
                    <p className="text-slate-500 text-sm mt-2">{shop.address}</p>
                    <div className="mt-6 flex gap-3">
                      <Link href={`/shops/${shop.id}`} className="text-sm font-bold text-blue-600 hover:underline">
                        詳細を見る
                      </Link>
                      <button className="text-sm font-bold text-slate-400 hover:text-slate-600">
                        編集
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center">
              <p className="text-slate-400">登録されている店舗がありません。</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
