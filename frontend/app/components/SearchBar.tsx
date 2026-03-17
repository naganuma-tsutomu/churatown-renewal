"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
      router.push(`/?category=${encodeURIComponent(category)}`);
    } else {
      router.push("/");
    }
  };

  return (
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
  );
}
