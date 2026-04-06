"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function HeroSection() {
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
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=1920&q=80')",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white/80 text-sm tracking-[0.3em] uppercase mb-4"
        >
          Okinawa Local Portal
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
        >
          沖縄の魅力を
          <br />
          まるごと発見
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/70 text-lg mb-10"
        >
          観光・グルメ・暮らしの情報をひとつに
        </motion.p>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex gap-3 max-w-xl mx-auto bg-white/15 backdrop-blur-xl rounded-2xl p-2 border border-white/20"
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 px-4 py-3 bg-transparent text-white rounded-xl focus:outline-none appearance-none [&>option]:text-slate-800"
          >
            <option value="">すべてのカテゴリ</option>
            <option value="グルメ">グルメ</option>
            <option value="遊ぶ・観光">遊ぶ・観光</option>
            <option value="ホテル">ホテル</option>
            <option value="不動産">不動産</option>
          </select>
          <button
            type="submit"
            className="bg-ocean-500 hover:bg-ocean-600 text-white px-8 py-3 rounded-xl font-bold transition-colors duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            検索
          </button>
        </motion.form>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafbfc] to-transparent" />
    </section>
  );
}
