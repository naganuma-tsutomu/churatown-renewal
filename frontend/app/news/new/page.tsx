"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import { 
  Bold, Italic, Underline as UnderlineIcon, Link as LinkIcon, 
  Image as ImageIcon, List, ListOrdered, Heading1, Heading2, Undo, Redo,
  ChevronLeft, Send, Upload, X
} from "lucide-react";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("image", file);
        try {
          const res = await fetch("http://localhost:8080/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (data.url) {
            editor.chain().focus().setImage({ src: data.url }).run();
          }
        } catch (err) {
          console.error("Upload failed", err);
        }
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-slate-200 transition ${editor.isActive("heading", { level: 1 }) ? "bg-slate-200 text-blue-600" : "text-slate-600"}`}
        type="button" title="Heading 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-slate-200 transition ${editor.isActive("heading", { level: 2 }) ? "bg-slate-200 text-blue-600" : "text-slate-600"}`}
        type="button" title="Heading 2"
      >
        <Heading2 size={18} />
      </button>
      <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-slate-200 transition ${editor.isActive("bold") ? "bg-slate-200 text-blue-600" : "text-slate-600"}`}
        type="button" title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-slate-200 transition ${editor.isActive("italic") ? "bg-slate-200 text-blue-600" : "text-slate-600"}`}
        type="button" title="Italic"
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-slate-200 transition ${editor.isActive("underline") ? "bg-slate-200 text-blue-600" : "text-slate-600"}`}
        type="button" title="Underline"
      >
        <UnderlineIcon size={18} />
      </button>
      <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-slate-200 transition ${editor.isActive("bulletList") ? "bg-slate-200 text-blue-600" : "text-slate-600"}`}
        type="button" title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-slate-200 transition ${editor.isActive("orderedList") ? "bg-slate-200 text-blue-600" : "text-slate-600"}`}
        type="button" title="Ordered List"
      >
        <ListOrdered size={18} />
      </button>
      <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
      <button
        onClick={addImage}
        className="p-2 rounded hover:bg-slate-200 transition text-slate-600"
        type="button" title="Add Image"
      >
        <ImageIcon size={18} />
      </button>
      <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-2 rounded hover:bg-slate-200 transition text-slate-600 disabled:opacity-30"
        type="button" title="Undo"
      >
        <Undo size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-2 rounded hover:bg-slate-200 transition text-slate-600 disabled:opacity-30"
        type="button" title="Redo"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

export default function NewNews() {
  const router = useRouter();
  const [shopId, setShopId] = useState("");
  const [title, setTitle] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({
        openOnClick: false,
      }),
      ImageExtension,
    ],
    content: "<p>ここにニュースの本文を入力してください...</p>",
    editorProps: {
      attributes: {
        class: "prose prose-slate prose-lg max-w-none focus:outline-none min-h-[300px] p-6 text-slate-700",
      },
    },
  });

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) setMainImageUrl(data.url);
      } catch (err) {
        setError("画像アップロードに失敗しました");
      }
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:8080/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          shop_id: parseInt(shopId),
          title,
          content: editor.getHTML(),
          image_url: mainImageUrl
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "投稿に失敗しました");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/shops/${shopId}`);
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 font-bold text-sm">
            <ChevronLeft size={16} /> トップに戻る
          </Link>
          <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase">ニュース投稿エディタ</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12">
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white">
            <h2 className="text-3xl font-black mb-2">記事を作成しましょう</h2>
            <p className="opacity-80 font-medium">リッチテキストと画像で魅力的なニュースを届けます。</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-10">
            {success && (
              <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl border border-emerald-200 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500 text-3xl">🎉</span>
                  <div>
                    <p className="font-black text-lg leading-tight text-emerald-900">投稿が完了しました！</p>
                    <p className="text-sm font-medium opacity-80 mt-1">まもなく店舗詳細ページへ移動します...</p>
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="bg-rose-50 text-rose-800 p-6 rounded-2xl border border-rose-200 flex items-center gap-4">
                <X className="text-rose-500" />
                <p className="font-bold">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1 space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">店舗ID</label>
                  <input
                    type="number"
                    required
                    value={shopId}
                    onChange={(e) => setShopId(e.target.value)}
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-lg"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">アイキャッチ画像</label>
                  <div className="relative group">
                    <div className={`aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden ${mainImageUrl ? "border-emerald-200 bg-emerald-50" : "border-slate-200 hover:border-blue-400 hover:bg-blue-50/50"}`}>
                      {mainImageUrl ? (
                        <>
                          <img src={mainImageUrl} className="w-full h-full object-cover" />
                        </>
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="mx-auto text-slate-300 mb-2 group-hover:text-blue-500 transition-colors" />
                          <p className="text-xs font-black text-slate-400 group-hover:text-blue-600 transition-colors uppercase">Upload Image</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleMainImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-8">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">ニュースタイトル</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-6 text-2xl font-black bg-white border-2 border-slate-100 rounded-3xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-200"
                    placeholder="タイトルを入力..."
                  />
                </div>
                
                <div className="border-2 border-slate-100 rounded-3xl overflow-hidden focus-within:border-blue-500 transition-all shadow-inner bg-white">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest p-4 pb-0">本文コンテンツ</label>
                  <MenuBar editor={editor} />
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-6 rounded-3xl font-black text-xl text-white shadow-2xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] ${
                  loading ? "bg-slate-300 cursor-not-allowed" : "bg-gradient-to-br from-blue-600 to-indigo-700 hover:shadow-blue-500/40 hover:-translate-y-1"
                }`}
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={24} />
                    <span>ニュースを公開する</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
