import { Suspense } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { GenreList } from "./components/GenreList";
import { OkinawaGuide } from "./components/OkinawaGuide";
import { ShopCard } from "./components/ShopCard";
import { AnimatedSection } from "./components/AnimatedSection";

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

async function getShops(category?: string) {
  const apiBaseUrl = process.env.INTERNAL_API_URL || "http://localhost:8080";
  let url = `${apiBaseUrl}/api/shops`;
  if (category) {
    url += `?category=${encodeURIComponent(category)}`;
  }
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch shops");
    return (await res.json()) as Shop[];
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
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 font-sans">
      <Header />

      <Suspense fallback={<div className="h-screen bg-slate-100 animate-pulse" />}>
        <HeroSection />
      </Suspense>

      <main className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <OkinawaGuide />
        <GenreList />

        <AnimatedSection>
          <section>
            <div className="text-center mb-12">
              <p className="text-ocean-500 text-sm tracking-[0.3em] uppercase font-medium mb-2">Shop List</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">店舗一覧</h2>
              <p className="text-slate-400 text-sm mt-2">{shops.length}件の店舗</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.length > 0 ? (
                shops.map((shop) => <ShopCard key={shop.id} shop={shop} />)
              ) : (
                <div className="col-span-full text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                  店舗が見つかりませんでした。
                </div>
              )}
            </div>
          </section>
        </AnimatedSection>
      </main>

      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center text-slate-400 text-sm">
          <p className="font-bold text-slate-600 mb-1">美らタウン沖縄</p>
          <p>&copy; 2025 Churatown Okinawa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
