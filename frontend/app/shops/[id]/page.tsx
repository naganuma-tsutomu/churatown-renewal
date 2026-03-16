"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface Shop {
  id: number;
  name: string;
  address: string;
  phone: string;
  category: string;
  attributes: string;
}

interface News {
  id: number;
  title: string;
  content: string; // HTML
  image_url: string | null;
  published_at: string;
}

export default function ShopDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      fetch(`http://localhost:8080/api/shops/${id}`).then(res => res.json()),
      fetch(`http://localhost:8080/api/news?shop_id=${id}`).then(res => res.json())
    ]).then(([shopData, newsData]) => {
      if (shopData.error) {
        router.push("/404");
        return;
      }
      setShop(shopData);
      setNews(newsData || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-sans">読み込み中...</div>;
  }

  if (!shop) return null;

  let attributes: Record<string, any> = {};
  if (shop.attributes) {
    try {
      attributes = JSON.parse(shop.attributes);
    } catch(e) {}
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 bg-[size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
          <Link href="/" className="inline-flex items-center text-cyan-100 hover:text-white transition-colors text-sm font-medium mb-6 group">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> 一覧へ戻る
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-white/30">
              {shop.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-8 drop-shadow-sm">{shop.name}</h1>
          <div className="flex flex-col sm:flex-row gap-6 text-cyan-50 font-medium">
            <p className="flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full">📍</span> {shop.address}
            </p>
            <p className="flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full">📞</span> {shop.phone}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-16">
          <section className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative group overflow-hidden">
            <h2 className="text-2xl font-black mb-8 text-slate-900 flex items-center gap-3 relative">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              店舗情報・設備
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              {Object.entries(attributes).map(([key, val]) => (
                <div key={key} className="p-5 bg-slate-50 rounded-2xl border border-slate-100/80 flex items-center justify-between hover:bg-slate-100/50 transition-colors">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{key}</span>
                  <span className="text-slate-900 font-extrabold">{val.toString() === "true" ? "✅" : val.toString() === "false" ? "❌" : val.toString()}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-10 text-slate-900 flex items-center gap-4">
              <span className="flex items-center justify-center w-12 h-12 bg-cyan-100 text-cyan-600 rounded-2xl">📰</span>
              店舗ニュース
            </h2>
            <div className="space-y-8">
              {news.map(n => (
                <article key={n.id} className="bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/40 overflow-hidden hover:shadow-xl transition-all duration-300">
                  {n.image_url && (
                    <div className="w-full h-64 overflow-hidden">
                      <img src={n.image_url} alt={n.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-8 md:p-10">
                    <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight">{n.title}</h3>
                    <div 
                      className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: n.content }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
        
        <aside className="space-y-8">
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
            <Link href="/news/new" className="block w-full bg-white text-blue-600 text-center py-4 rounded-2xl font-black hover:bg-cyan-50 transition-colors shadow-lg">
              ニュースを投稿する
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
}
