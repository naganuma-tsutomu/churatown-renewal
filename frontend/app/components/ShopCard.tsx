import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

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
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col group overflow-hidden">
        <div className="relative aspect-video overflow-hidden">
          {shop.image_url ? (
            <img
              src={shop.image_url}
              alt={shop.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-300">
              <span className="text-4xl">📸</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute top-3 left-3 bg-ocean-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
            {shop.category}
          </span>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 line-clamp-2 mb-3 group-hover:text-ocean-600 transition-colors">
            {shop.name}
          </h3>
          <div className="text-slate-400 text-sm space-y-1.5 mt-auto">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0" /> {shop.address}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 shrink-0" /> {shop.phone}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
