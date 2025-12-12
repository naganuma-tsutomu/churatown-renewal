import { createClient } from 'microcms-js-sdk';

// microCMSで登録したフィールドの型を定義（最低限の型）
type Store = {
  id: string;
  'store-name': string;
  'store-address': string;
  'store-img'?: {
    url: string;
    width: number;
    height: number;
  };
  // 他のフィールドがあればここに追加
};

// 環境変数からAPI情報を読み込む
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_ID || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

// 店舗情報を全件取得する例
// 戻り値の型を明示することで、ページ側で安全にデータを使えます
export const getStores = async (): Promise<Store[]> => {
  const data = await client.getList<Store>({
    endpoint: 'churatown-stores',
  });
  return data.contents;
};

// ID一覧を取得する例
export const getStoreIds = async () => {
  const data = await client.getList<Pick<Store, 'id'>>({
    endpoint: 'churatown-stores',
    queries: { fields: 'id' },
  });
  return data.contents.map(content => ({
    storeId: content.id
  }));
};

// 単一の店舗情報をIDで取得する例
export const getStoreDetail = async (contentId: string): Promise<Store | null> => {
  try {
    // getListDetail を使うことで、単一のオブジェクトを取得
    const data = await client.getListDetail<Store>({
      endpoint: 'churatown-stores',
      contentId: contentId,
    });
    return data;
  } catch (error) {
    return null;
  }
};
