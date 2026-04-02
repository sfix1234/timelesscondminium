# THE TIMELESS CONDOMINIUM

京都・上七軒を舞台にしたラグジュアリー邸宅プロモーションサイトです。  
1ページ構成で、スクロール演出とセクション遷移を中心に設計しています。

## 実装内容

- Hero / Story / Craftsmen / Stage セクション
- Stage 直下のメッセージセクション（縦組みテキスト + 画像）
- 家紋背景を使った `REGISTRATION` セクション
- スクロール時の `is-visible` 連動アニメーション
- Stage 詳細用のスライドインパネル

## Tech Stack

- Next.js 15
- React 19
- Node.js / npm

## 開発手順

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認します。

## 本番ビルド

```bash
npm run build
npm run start
```

## 環境変数

`.env.example` を `.env.local` にコピーして必要な値を設定します。

- `RESEND_API_KEY` (本番必須)
- `ACCESS_FROM_EMAIL` (本番必須 / Resendで検証済み送信元)
- `ACCESS_COOKIE_SECRET` (本番必須 / 認証Cookie署名用シークレット)
- `ACCESS_RECEIVING_EMAIL` (推奨 / 受信用メールアドレス。複数はカンマ区切り)
- `ACCESS_RECIVING_EMAIL` (任意 / 旧設定・誤記フォールバック)
- `ACCESS_ADMIN_EMAIL` (任意 / 申請通知の送信先)
- `CLIENT_PREVIEW_ENABLED` (任意 / クライアント配布用環境でのみ `true`)
- `CLIENT_PREVIEW_USERNAME` (任意 / クライアント配布用Basic認証のユーザー名)
- `CLIENT_PREVIEW_PASSWORD` (任意 / クライアント配布用Basic認証のパスワード)

## クライアント配布用環境

本番URLとは別に、クライアント共有専用のURLを作る場合は以下を設定します。

- Vercelで別Projectまたは専用Previewドメインを用意する
- その環境にだけ `CLIENT_PREVIEW_ENABLED=true` を設定する
- `CLIENT_PREVIEW_USERNAME` と `CLIENT_PREVIEW_PASSWORD` を設定する

有効化すると、その環境では全ページにBasic認証がかかり、あわせて `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex` が付与されます。

## 主要アセット

- `assets/images/craftsmen-group.jpg`
- `assets/images/stage-message.jpeg`
- `assets/images/kamon-bg.webp`

## License

&copy; 2026 THE TIMELESS CONDOMINIUM. All Rights Reserved.
