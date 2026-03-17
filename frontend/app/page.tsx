"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Shop {
  id: number;
  name: string;
  address: string;
  phone: string;
  category: string;
  attributes: string;
  image_url?: string;
  created_at: string;
}

import { useAuth } from "@/context/AuthContext";
import { User, Shield, LogIn } from "lucide-react";

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async (filterCategory = "") => {
    setLoading(true);
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    let url = `${apiBaseUrl}/api/shops`;
    if (filterCategory) {
      url += `?category=${encodeURIComponent(filterCategory)}`;
    }
    try {
      const res = await fetch(url);
      const data = await res.json();
      setShops(data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchShops(category);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
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

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">ジャンルから探す</h2>
            <p className="text-slate-500">お好みのカテゴリから沖縄の魅力を見つけましょう</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "グルメ", icon: "🍱", color: "from-orange-400 to-red-500" },
              { name: "遊ぶ・観光", icon: "🏖️", color: "from-emerald-400 to-teal-500" },
              { name: "ホテル", icon: "🏨", color: "from-blue-400 to-indigo-500" },
              { name: "不動産", icon: "🏠", color: "from-amber-400 to-yellow-600" },
            ].map((g) => (
              <Link href={`/genres/${encodeURIComponent(g.name)}`} key={g.name} className="group">
                <div className="relative overflow-hidden rounded-3xl p-1 shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${g.color} opacity-10 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative bg-white group-hover:bg-transparent rounded-[1.4rem] p-6 text-center transition-colors duration-500 h-full flex flex-col items-center justify-center">
                    <span className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-500">{g.icon}</span>
                    <h3 className="font-bold text-slate-700 group-hover:text-white transition-colors duration-500">{g.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-16 w-full max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2 text-slate-800">条件を細かく指定して検索</h2>
              <p className="text-slate-500 text-sm">カテゴリを選択して、ぴったりの店舗を見つけます</p>
            </div>
            <form onSubmit={handleSearch} className="flex gap-4 w-full md:w-auto">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 md:w-64 p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-700 transition appearance-none"
              >
                <option value="">すべてのカテゴリ</option>
                <option value="グルメ">グルメ</option>
                <option value="遊ぶ・観光">遊ぶ・観光</option>
                <option value="ホテル">ホテル</option>
                <option value="不動産">不動産</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-200 whitespace-nowrap"
              >
                検索
              </button>
            </form>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-slate-800">店舗一覧</h2>
            <p className="text-slate-500 text-sm">{shops.length}件の店舗</p>
          </div>
          
          {loading ? (
            <div className="text-center py-20 text-slate-400">読み込み中...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map((shop) => (
                <Link href={`/shops/${shop.id}`} key={shop.id}>
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full flex flex-col group overflow-hidden">
                    {shop.image_url ? (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={shop.image_url} 
                          alt={shop.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-300">
                        <span className="text-4xl">📸</span>
                      </div>
                    )}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-800 line-clamp-2">{shop.name}</h3>
                      <span className="bg-cyan-50 text-cyan-700 text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ml-3">
                        {shop.category}
                      </span>
                    </div>
                    <div className="text-slate-500 text-sm mb-4 flex-1">
                      <p className="flex items-center gap-2 mb-1">
                        <span className="text-slate-400">📍</span> {shop.address}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-slate-400">📞</span> {shop.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
