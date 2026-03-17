import { Suspense } from "react";
import { Header } from "./components/Header";
import { GenreList } from "./components/GenreList";
import { SearchBar } from "./components/SearchBar";
import { ShopCard } from "./components/ShopCard";

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

// サーバーサイドでのデータ取得
async function getShops(category?: string) {
  // Docker内での実行時は環境変数 INTERNAL_API_URL (http://backend:8080) を優先
  const apiBaseUrl = process.env.INTERNAL_API_URL || "http://localhost:8080";

  let url = `${apiBaseUrl}/api/shops`;
  if (category) {
    url += `?category=${encodeURIComponent(category)}`;
  }
  
  try {
    const res = await fetch(url, { cache: "no-store" }); // 常に最新を取得
    if (!res.ok) throw new Error("Failed to fetch shops");
    return await res.json() as Shop[];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const shops = await getShops(category);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <GenreList />

        <Suspense fallback={<div className="h-40 bg-slate-100 animate-pulse rounded-3xl mb-16" />}>
          <SearchBar />
        </Suspense>

        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-slate-800">店舗一覧</h2>
            <p className="text-slate-500 text-sm">{shops.length}件の店舗</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.length > 0 ? (
              shops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                店舗が見つかりませんでした。
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
