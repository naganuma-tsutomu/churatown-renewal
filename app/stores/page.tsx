import Link from 'next/link';
import { getStores } from '@/libs/microcms';

export default async function StoresPage() {
  const stores = await getStores();

  return (
    <div>
      <h1>🌺 沖縄のお店一覧</h1>
      {/* ... (省略) */}
        <ul>
          {stores.map((store: any) => (
            <li key={store.id}>
              <Link href={`/stores/${store.id}`}>
              {/* ✅ 修正点1: フィールドIDを使用 */}
              <h2>{store['store-name']}</h2>

              {/* ✅ 修正点2: フィールドIDを使用 */}
              <p>住所: {store['store-address']}</p>

              {/* ✅ 修正点3: 画像フィールドIDと.urlを使用 */}
              {store['store-img'] && (
                <img
                  src={store['store-img'].url}
                  alt={store['store-name']}
                  width="300"
                  height="200"
                />
              )}
              </Link>
            </li>
          ))}
        </ul>
      {/* ... (省略) */}
    </div>
  );
}