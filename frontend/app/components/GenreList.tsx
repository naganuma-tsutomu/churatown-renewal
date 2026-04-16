"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const GENRES = [
  {
    name: "グルメ",
    sub: "Gourmet",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80",
    gradient: "from-orange-500/80 to-red-500/80",
  },
  {
    name: "遊ぶ・観光",
    sub: "Sightseeing",
    image: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=600&q=80",
    gradient: "from-ocean-500/80 to-teal-600/80",
  },
  {
    name: "ホテル",
    sub: "Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    gradient: "from-blue-500/80 to-indigo-600/80",
  },
  {
    name: "不動産",
    sub: "Real Estate",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    gradient: "from-amber-500/80 to-orange-600/80",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export function GenreList() {
  return (
    <section className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-ocean-500 text-sm tracking-[0.3em] uppercase font-medium mb-2">Shop Search</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">ジャンルから探す</h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        {GENRES.map((g) => (
          <motion.div key={g.name} variants={itemVariants}>
            <Link href={`/genres/${encodeURIComponent(g.name)}`} className="group">
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
                <Image
                  src={g.image}
                  alt={g.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${g.gradient}`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <p className="text-xs tracking-[0.2em] uppercase opacity-80 mb-1">{g.sub}</p>
                  <h3 className="text-xl md:text-2xl font-extrabold">{g.name}</h3>
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
