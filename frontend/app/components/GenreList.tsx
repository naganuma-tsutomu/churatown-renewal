import Link from "next/link";

const GENRES = [
  { name: "グルメ", icon: "🍱", color: "from-orange-400 to-red-500" },
  { name: "遊ぶ・観光", icon: "🏖️", color: "from-emerald-400 to-teal-500" },
  { name: "ホテル", icon: "🏨", color: "from-blue-400 to-indigo-500" },
  { name: "不動産", icon: "🏠", color: "from-amber-400 to-yellow-600" },
];

export function GenreList() {
  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">ジャンルから探す</h2>
        <p className="text-slate-500">お好みのカテゴリから沖縄の魅力を見つけましょう</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {GENRES.map((g) => (
          <Link href={`/genres/${encodeURIComponent(g.name)}`} key={g.name} className="group">
            <div className="relative overflow-hidden rounded-3xl p-1 shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${g.color} opacity-10 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative bg-white group-hover:bg-transparent rounded-[1.4rem] p-6 text-center transition-colors duration-500 h-full flex flex-col items-center justify-center">
                <span className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-500">{g.icon}</span>
                <h3 className="font-bold text-slate-700 group-hover:text-white transition-colors duration-500">{g.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
