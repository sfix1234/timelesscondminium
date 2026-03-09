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
- `ACCESS_ADMIN_EMAIL` (任意 / 申請通知の送信先)

## 主要アセット

- `assets/images/craftsmen-group.jpg`
- `assets/images/stage-message.jpeg`
- `assets/images/kamon-bg.webp`

## License

&copy; 2026 THE TIMELESS CONDOMINIUM. All Rights Reserved.
