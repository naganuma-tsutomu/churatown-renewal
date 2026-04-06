"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const GUIDE_ITEMS = [
  { title: "観光地", slug: "sightseeing", image: "/images/guide/sightseeing.jpg", span: "md:col-span-2 md:row-span-2" },
  { title: "ビーチ", slug: "beach", image: "/images/guide/beach.jpg", span: "md:col-span-2 md:row-span-1" },
  { title: "イベント", slug: "event", image: "/images/guide/event.jpg", span: "" },
  { title: "旅シミュレーター", slug: "travel-simulator", image: "/images/guide/simulator.jpg", span: "" },
  { title: "歴史・伝統・文化", slug: "history-culture", image: "/images/guide/history.jpg", span: "" },
  { title: "うちなー図鑑", slug: "uchina-zukan", image: "/images/guide/zukan.jpg", span: "" },
  { title: "交通アクセス", slug: "access", image: "/images/guide/access.jpg", span: "" },
  { title: "初めてガイド", slug: "beginners-guide", image: "/images/guide/guide.jpg", span: "" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function OkinawaGuide() {
  return (
    <section className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-ocean-500 text-sm tracking-[0.3em] uppercase font-medium mb-2">Okinawa Guide</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">沖縄まるわかり</h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto auto-rows-[140px] md:auto-rows-[180px]"
      >
        {GUIDE_ITEMS.map((item) => (
          <motion.div key={item.slug} variants={itemVariants} className={item.span}>
            <Link
              href={`/guide/${item.slug}`}
              className="group relative block w-full h-full overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-sm md:text-base drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
              <div className="absolute inset-0 bg-ocean-500/0 group-hover:bg-ocean-500/20 transition-colors duration-300" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
