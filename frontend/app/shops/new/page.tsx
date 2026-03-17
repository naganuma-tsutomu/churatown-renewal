"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function NewShop() {
  const router = useRouter();
  const { token, user, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    category: "グルメ",
  });
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/shops/new");
    }
  }, [user, isLoading]);

  const categories = ["グルメ", "遊ぶ・観光", "ホテル", "不動産"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

    try {
      let imageUrl = "";

      // 1. Upload image if exists
      if (image) {
        console.log("Uploading image...");
        const uploadFormData = new FormData();
        uploadFormData.append("image", image);

        const uploadRes = await fetch(`${apiBaseUrl}/api/upload`, {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json().catch(() => ({}));
          throw new Error(errorData.error || "画像のアップロードに失敗しました");
        }
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      // 2. Create shop
      console.log("Creating shop...");
      const shopRes = await fetch(`${apiBaseUrl}/api/shops`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          image_url: imageUrl,
          attributes: "{}",
        }),
      });

      if (!shopRes.ok) {
        const errorData = await shopRes.json().catch(() => ({}));
        throw new Error(errorData.error || "店舗の登録に失敗しました");
      }

      console.log("Shop created successfully");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/" className="text-cyan-100 hover:text-white transition-colors text-sm font-medium mb-4 inline-block">
            ← 戻る
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">店舗を登録する</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl font-medium">
            ⚠️ {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">店舗名 *</label>
              <input
                type="text"
                required
                className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all bg-slate-50"
                placeholder="例: うちーな食堂"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">カテゴリ</label>
              <select
                className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all bg-slate-50"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">住所</label>
              <input
                type="text"
                className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all bg-slate-50"
                placeholder="沖縄県那覇市..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">電話番号</label>
              <input
                type="text"
                className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all bg-slate-50"
                placeholder="098-..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">トップ画像</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-3xl hover:border-blue-400 transition-colors bg-slate-50/50">
                <div className="space-y-1 text-center">
                  {previewUrl ? (
                    <div className="relative w-full max-w-xs mx-auto mb-4 overflow-hidden rounded-2xl">
                      <img src={previewUrl} alt="Preview" className="w-full h-40 object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setImage(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-slate-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-slate-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 transition-colors">
                      <span>画像を選択</span>
                      <input type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                    </label>
                    <p className="pl-1">またはドラッグ＆ドロップ</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all focus:ring-4 focus:ring-blue-200 disabled:opacity-50 shadow-xl shadow-blue-200"
          >
            {uploading ? "登録中..." : "店舗を登録する"}
          </button>
        </form>
      </main>
    </div>
  );
}
