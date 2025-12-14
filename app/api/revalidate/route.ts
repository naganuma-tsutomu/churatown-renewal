// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    // 1. MicroCMSからの署名を検証（セキュリティ対策）
    const signature = req.headers.get('X-MICROCMS-Signature');
    const body = await req.text(); // 生のボディを取得

    // 環境変数に設定したシークレットキー
    const secret = process.env.MICROCMS_WEBHOOK_SECRET;

    if (!secret || !signature) {
      return NextResponse.json({ message: 'Secret or Signature missing' }, { status: 401 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    // 2. キャッシュをクリア（再検証）
    // ここではサイト全体('/')を更新対象にしていますが、
    // 特定のパスだけ更新したい場合は revalidatePath('/blog/[slug]') などにします
    revalidatePath('/', 'layout');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}