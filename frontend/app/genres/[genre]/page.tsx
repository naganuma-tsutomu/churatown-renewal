"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Phone } from "lucide-react";

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

export default function GenrePage() {
  const params = useParams();
  const genre = decodeURIComponent(params.genre as string);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const url = `${apiBaseUrl}/api/shops?category=${encodeURIComponent(genre)}`;
      
      try {
        const res = await fetch(url);
        const data = await res.json();
        setShops(data || []);
      } catch (err) {
        console.error("Failed to fetch shops:", err);
      } finally {
        setLoading(false);
      }
    };

    if (genre) {
      fetchShops();
    }
  }, [genre]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>TOPに戻る</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-blue-100 font-medium mb-1">ジャンルから探す</p>
              <h1 className="text-4xl font-extrabold tracking-tight">{genre}</h1>
            </div>
            <p className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">
              {shops.length}件の店舗が見つかりました
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-medium tracking-wide">店舗情報を読み込み中...</p>
          </div>
        ) : shops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shops.map((shop) => (
              <Link href={`/shops/${shop.id}`} key={shop.id}>
                <div className="group bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full flex flex-col overflow-hidden">
                  {shop.image_url ? (
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={shop.image_url} 
                        alt={shop.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  ) : (
                    <div className="h-56 bg-slate-100 flex items-center justify-center text-slate-300">
                      <span className="text-5xl group-hover:scale-125 transition-transform duration-500">📸</span>
                    </div>
                  )}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {shop.name}
                    </h3>
                    <div className="text-slate-500 text-sm space-y-3 mb-6 flex-1">
                      <p className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{shop.address}</span>
                      </p>
                      <p className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>{shop.phone}</span>
                      </p>
                    </div>
                    <div className="pt-6 border-t border-slate-50 flex justify-end">
                      <span className="text-blue-600 font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        詳細を見る <span className="text-lg">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-100 max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🏝️</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">店舗が見つかりませんでした</h3>
            <p className="text-slate-500 mb-8">
              申し訳ありません。現在「{genre}」カテゴリには登録されている店舗がありません。
            </p>
            <Link 
              href="/" 
              className="inline-flex bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              TOPに戻って他の店舗を探す
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
