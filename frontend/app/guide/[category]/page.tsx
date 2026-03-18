import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// 全カテゴリのデータ
const GUIDE_CONTENT: { [key: string]: any } = {
  sightseeing: {
    title: "観光地",
    englishTitle: "SIGHTSEEING",
    subtitle: "エメラルドグリーンの海と歴史が織りなす絶景スポット",
    description: "沖縄には、ジンベエザメが泳ぐ巨大水槽が有名な「美ら海水族館」や、首里城などの世界遺産、万座毛のような絶景スポットが満載です。豊かな自然と歴史が育んだ、ここでしか見られない景色を体験してください。",
    heroImage: "https://images.unsplash.com/photo-1542640244-7e672d6cef21?auto=format&fit=crop&w=2000&q=80",
    color: "from-blue-500 to-cyan-400",
    items: [
      { title: "沖縄美ら海水族館", category: "本部町", image: "https://images.unsplash.com/photo-1518144591331-17a5dd71c477?auto=format&fit=crop&w=800&q=80", description: "世界最大級の水槽「黒潮の海」では、ジンベエザメが悠々と泳ぐ姿を観察できます。" },
      { title: "首里城公園", category: "那覇市", image: "https://images.unsplash.com/photo-1541093269199-afab3a57dfb7?auto=format&fit=crop&w=800&q=80", description: "琉球王国の歴史と文化の象徴。朱色に彩られた壮麗な建築が魅力です。" },
      { title: "万座毛", category: "恩納村", image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80", description: "象の鼻の形をした奇岩と、眼下に広がる東シナ海のエメラルドグリーンが絶景です。" }
    ]
  },
  beach: {
    title: "ビーチ",
    englishTitle: "BEACH",
    subtitle: "透明度抜群の海と白い砂浜、極上のリゾートタイム",
    description: "沖縄の魅力といえば、やはり美しいビーチ。パウダーサンドの砂浜が続く天然ビーチから、アクティビティが充実したリゾートビーチまで、あなたにぴったりの海を見つけてください。",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80",
    color: "from-teal-400 to-emerald-400",
    items: [
      { title: "古宇利ビーチ", category: "今帰仁村", image: "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=800&q=80", description: "古宇利大橋を渡ってすぐ。エメラルドグリーンの海と白い砂浜が広がる人気のビーチです。" },
      { title: "エメラルドビーチ", category: "本部町", image: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?auto=format&fit=crop&w=800&q=80", description: "海洋博公園内にある、美しく整備されたY字型のビーチです。白い砂浜とコバルトブルーの海が広がります。" }
    ]
  },
  event: {
    title: "イベント",
    englishTitle: "EVENT",
    subtitle: "エイサーにハーリー、沖縄の熱気を感じる祭り・行事",
    description: "沖縄では、伝統的な祭りから現代的なイベントまで、年中様々な催しが行われています。太鼓の音が響くエイサーや、海を駆けるハーリーなど、沖縄の文化と熱気を体感してください。",
    heroImage: "https://images.unsplash.com/photo-1518384401463-d3876063c195?auto=format&fit=crop&w=2000&q=80",
    color: "from-amber-500 to-red-500",
    items: [
      { title: "全島エイサーまつり", category: "沖縄市", image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80", description: "県内最大のエイサーの祭典。迫力ある太鼓の音と踊りが沖縄の夜を盛り上げます。" },
      { title: "那覇ハーリー", category: "那覇市", image: "https://images.unsplash.com/photo-1533240332313-0db49b439ad2?auto=format&fit=crop&w=800&q=80", description: "ゴールデンウィークに開催される一大イベント。装飾された爬龍船（はりゅうせん）で速さを競います。" }
    ]
  },
  "travel-simulator": {
    title: "旅シミュレーター",
    englishTitle: "TRAVEL SIMULATOR",
    subtitle: "あなたにぴったりの沖縄旅行プランをご提案",
    description: "旅行日数やメンバー、予算などに合わせて、最適なツアープランをシミュレーション。効率的な観光ルートやおすすめカフェなど、自分だけのオリジナルプランを作ってみましょう。",
    heroImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=80",
    color: "from-violet-500 to-purple-400",
    items: [
      { title: "初沖縄！王道2泊3日コース", category: "ファミリー・カップル", image: "https://images.unsplash.com/photo-1506929199175-6088fd057639?auto=format&fit=crop&w=800&q=80", description: "美ら海水族館や首里城、アメリカンビレッジを効率よく回る、初めての方に最適のプラン。" },
      { title: "女子旅！カフェ＆絶景インスタ映えコース", category: "友人同士", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80", description: "絶景海カフェや古宇利島のハートロックなど、写真映えするスポットを巡る旅。" }
    ]
  },
  "history-culture": {
    title: "歴史・伝統・文化",
    englishTitle: "HISTORY & CULTURE",
    subtitle: "琉球王国の面影を残す、独自の歴史と豊かな文化",
    description: "かつて独立した王国だった沖縄には、日本本土とは異なる独自の文化が根付いています。世界遺産に登録された城（グスク）跡や、色鮮やかな伝統工芸、宮廷料理など、奥深い魅力を探求してください。",
    heroImage: "https://images.unsplash.com/photo-1528156843702-fee3e95147be?auto=format&fit=crop&w=2000&q=80",
    color: "from-orange-500 to-yellow-500",
    items: [
      { title: "世界遺産・今帰仁城跡", category: "今帰仁村", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80", description: "美しい曲線を描く石垣が特徴のグスク。1月下旬には寒緋桜（カンヒザクラ）の名所としても有名です。" },
      { title: "伝統工芸「琉球ガラス」", category: "糸満市・名護市など", image: "https://images.unsplash.com/photo-1615486511484-92e174cc4be0?auto=format&fit=crop&w=800&q=80", description: "吹きガラスの手法で作られる色鮮やかなガラス細工。自分だけのオリジナルグラス作り体験も人気です。" }
    ]
  },
  "uchina-zukan": {
    title: "うちなー図鑑",
    englishTitle: "UCHINA ZUKAN",
    subtitle: "方言、植物、生き物…沖縄だけの不思議を発見",
    description: "「うちなー」とは沖縄のこと。珍しい動植物や、独特の食文化、日常で使われる「うちなーぐち（方言）」など、知れば知るほど面白い沖縄のウラ側をカジュアルに学べる図鑑です。",
    heroImage: "https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&w=2000&q=80",
    color: "from-rose-500 to-pink-400",
    items: [
      { title: "うちなーぐち辞典（入門編）", category: "言葉・文化", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80", description: "「はいさい」「にふぇーでーびる」「なんくるないさ」など、旅行中に使える便利な方言を紹介。" },
      { title: "ゴーヤーの秘密", category: "グルメ・野菜", image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30e4d?auto=format&fit=crop&w=800&q=80", description: "沖縄の夏を乗り切るスタミナ野菜、にがうり（ゴーヤー）。栄養価や美味しいチャンプルーの作り方も。" }
    ]
  },
  access: {
    title: "交通アクセス",
    englishTitle: "ACCESS",
    subtitle: "レンタカーからゆいレールまで、賢い移動手段",
    description: "沖縄本島は意外と広く、移動手段の選択が旅の快適さを左右します。定番のレンタカーをはじめ、那覇市内を走るモノレール、路線バスでのんびり旅など、目的やルートに合わせたアクセス方法をご案内します。",
    heroImage: "https://images.unsplash.com/photo-1543224795-a2262ccbe56a?auto=format&fit=crop&w=2000&q=80",
    color: "from-sky-500 to-blue-400",
    items: [
      { title: "沖縄都市モノレール「ゆいレール」", category: "那覇市", image: "https://images.unsplash.com/photo-1558409057-bbe679023136?auto=format&fit=crop&w=800&q=80", description: "那覇空港からてだこ浦西駅を結ぶモノレール。那覇市内の観光や、渋滞を避けたいお買い物に便利です。" },
      { title: "レンタカーのすゝめ", category: "沖縄全域", image: "https://images.unsplash.com/photo-1533558721112-076364e6ecb0?auto=format&fit=crop&w=800&q=80", description: "本島の北から南、絶景ロードを走るならやっぱりレンタカー。予約のコツや運転時の注意点をまとめました。" }
    ]
  },
  "beginners-guide": {
    title: "初めてガイド",
    englishTitle: "BEGINNERS GUIDE",
    subtitle: "パッキングからマナーまで、旅行前の不安を解消！",
    description: "沖縄旅行が初めての方、久しぶりの方向けの総合案内。持ち物リスト、ベストシーズン、気になる台風情報、地元の人と触れ合うときのマナーなど、安心して旅立つための情報をぎゅっと凝縮しました。",
    heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80",
    color: "from-green-500 to-teal-400",
    items: [
      { title: "沖縄旅行の持ち物チェックリスト", category: "準備", image: "https://images.unsplash.com/photo-1517614991034-730628e8331d?auto=format&fit=crop&w=800&q=80", description: "日焼け止め、サンダル、ETCカードから、ビーチアイテムまで。忘れ物を防ぐ最強の持ち物リスト。" },
      { title: "月別！沖縄の天気と服装ガイド", category: "お役立ち", image: "https://images.unsplash.com/photo-1487856403069-4246ab0ee3fa?auto=format&fit=crop&w=800&q=80", description: "春の心地よさ、夏の強い紫外線、冬の強風。行く月によって全く異なる、最適な服装の目安をご案内。" }
    ]
  }
};

export default async function GuidePage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const content = GUIDE_CONTENT[category];

  if (!content) {
    notFound();
  }

  // 他のカテゴリへのナビゲーション用
  const otherCategories = Object.keys(GUIDE_CONTENT)
    .filter(key => key !== category)
    .map(key => ({
      slug: key,
      title: GUIDE_CONTENT[key].title
    }));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ヒーローセクション */}
      <div className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={content.heroImage}
          alt={content.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/90" />
        <div className="relative z-10 text-center px-4">
          <p className="text-white/90 text-sm md:text-base font-bold tracking-widest uppercase mb-2">
            {content.englishTitle}
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            {content.title}
          </h1>
          <p className="text-white text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-md">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* 紹介テキスト */}
      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-10 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100 backdrop-blur-sm bg-white/95">
          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            {content.description}
          </p>
        </div>
      </div>

      {/* アイテムリスト */}
      <div className="max-w-6xl mx-auto px-4 mb-24">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 text-center mb-12">
          おすすめコンテンツ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group flex flex-col h-full border border-slate-100 hover:-translate-y-2"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute top-4 left-4 bg-gradient-to-r ${content.color} text-white text-xs font-bold px-4 py-2 rounded-full shadow-md`}>
                  {item.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-50 flex justify-end">
                  <span className="text-blue-600 font-bold text-sm group-hover:underline flex items-center gap-1">
                    詳細を見る
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 他のカテゴリへのナビゲーション */}
      <div className="bg-slate-100/80 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center justify-center gap-2">
            <span className="h-1 w-8 bg-blue-500 rounded-full"></span>
            他のガイドも見る
            <span className="h-1 w-8 bg-blue-500 rounded-full"></span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {otherCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/guide/${cat.slug}`}
                className="bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-400 hover:text-white text-slate-700 font-bold px-6 py-3 rounded-full shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 border border-slate-200/60"
              >
                {cat.title}
              </Link>
            ))}
          </div>
          <div className="mt-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-all hover:gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
