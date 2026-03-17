import Link from "next/link";

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

export function ShopCard({ shop }: { shop: Shop }) {
  return (
    <Link href={`/shops/${shop.id}`}>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full flex flex-col group overflow-hidden">
        {shop.image_url ? (
          <div className="h-48 overflow-hidden">
            <img
              src={shop.image_url}
              alt={shop.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-300">
            <span className="text-4xl">📸</span>
          </div>
        )}
        <div className="p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-slate-800 line-clamp-2">{shop.name}</h3>
            <span className="bg-cyan-50 text-cyan-700 text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ml-3">
              {shop.category}
            </span>
          </div>
          <div className="text-slate-500 text-sm mb-4 flex-1">
            <p className="flex items-center gap-2 mb-1">
              <span className="text-slate-400">📍</span> {shop.address}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-slate-400">📞</span> {shop.phone}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
