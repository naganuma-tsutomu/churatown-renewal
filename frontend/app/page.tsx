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
  created_at: string;
}

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async (filterCategory = "") => {
    setLoading(true);
    let url = "http://localhost:8080/api/shops";
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
          <h1 className="text-3xl font-extrabold tracking-tight">美らタウン沖縄</h1>
          <nav>
            <Link href="/news/new" className="text-sm font-medium hover:text-cyan-100 transition-colors bg-white/20 px-4 py-2 rounded-full">
              オーナー様: ニュース投稿
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-10 w-full max-w-2xl mx-auto transform transition duration-500 hover:shadow-md">
          <h2 className="text-xl font-bold mb-6 text-slate-700 text-center">店舗を探す</h2>
          <form onSubmit={handleSearch} className="flex gap-4 flex-col sm:flex-row">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-700 transition"
            >
              <option value="">すべてのカテゴリ</option>
              <option value="グルメ">グルメ</option>
              <option value="遊ぶ・観光">遊ぶ・観光</option>
              <option value="ホテル">ホテル</option>
              <option value="不動産">不動産</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-sm"
            >
              検索
            </button>
          </form>
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
                  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
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
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
