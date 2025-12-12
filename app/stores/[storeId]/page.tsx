import { getStoreIds, getStoreDetail } from '@/libs/microcms';
import Image from 'next/image';

// 1. 静的サイト生成 (SSG) のためのパスを定義
// ビルド時に一度実行され、microCMSにある全店舗のIDを取得します。
// これにより、全店舗のページが事前にHTMLとして生成され、超高速になります。
export async function generateStaticParams() {
  const paths = await getStoreIds();
  // 例: [{ storeId: '3ksGHYCUJM6' }, { storeId: 'KWLmAua8w' }, ...] を返す
  return paths;
}


// 2. 店舗詳細ページコンポーネント
// params.storeIdには、URLから抽出されたIDが入ります。
export default async function StoreDetailPage({
  params,
}: {
  params: { storeId: string };
}) {
  // URLのIDを使って、該当する店舗の詳細データを取得
  const resolvedParams = await params; // Await the params object itself
  const store = await getStoreDetail(resolvedParams.storeId);

  if (!store) {
    // データがない場合の処理（404ページなど）
    return <div>お探しの店舗は見つかりませんでした。</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* 店舗名 */}
      <h1>{store['store-name']}</h1>

      {/* 住所 */}
      <p>📍 **住所:** {store['store-address']}</p>

      {/* 写真 */}
      {store['store-img'] && (
        <Image
          src={store['store-img'].url}
          alt={store['store-name']}
          width={700}
          height={400}
          style={{ objectFit: 'cover', borderRadius: '8px' }}
          // Next.jsのImageコンポーネントを使うと、画像が自動で最適化されます
        />
      )}

      <hr style={{ margin: '30px 0' }} />

      <h2>店舗詳細情報</h2>
      {/* 他の詳細フィールドがあればここに追加 */}
      <p>ここは店舗の詳細説明や営業時間などの情報が入ります。</p>

      <a href="/stores" style={{ display: 'block', marginTop: '40px' }}>
        ← 店舗一覧に戻る
      </a>
    </div>
  );
}
