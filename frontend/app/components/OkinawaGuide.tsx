import Link from "next/link";
import Image from "next/image";

const GUIDE_ITEMS = [
  { title: "観光地", slug: "sightseeing", image: "/images/guide/sightseeing.jpg" },
  { title: "ビーチ", slug: "beach", image: "/images/guide/beach.jpg" },
  { title: "イベント", slug: "event", image: "/images/guide/event.jpg" },
  { title: "旅シミュレーター", slug: "travel-simulator", image: "/images/guide/simulator.jpg" },
  { title: "歴史・伝統・文化", slug: "history-culture", image: "/images/guide/history.jpg" },
  { title: "うちなー図鑑", slug: "uchina-zukan", image: "/images/guide/zukan.jpg" },
  { title: "交通アクセス", slug: "access", image: "/images/guide/access.jpg" },
  { title: "初めてガイド", slug: "beginners-guide", image: "/images/guide/guide.jpg" },
];

export function OkinawaGuide() {
  return (
    <section className="mb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">沖縄まるわかり</h2>
        <p className="text-slate-400 text-sm tracking-widest uppercase">OKINAWA GUIDE</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 max-w-4xl mx-auto">
        {GUIDE_ITEMS.map((item) => (
          <Link
            key={item.title}
            href={`/guide/${item.slug}`}
            className="group flex flex-col items-center"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 overflow-hidden rounded-full shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border-4 border-white">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 128px, 160px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-700 group-hover:text-blue-600 transition-colors duration-300 text-center">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
