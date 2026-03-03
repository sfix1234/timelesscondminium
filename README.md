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

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts
  - Cormorant Garamond
  - Noto Sans JP

## 開発手順

```bash
# リポジトリをクローン
git clone https://github.com/sfix1234/timelesscondminium.git
cd timelesscondminium

# ローカルサーバー起動
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いて確認します。

## 主要アセット

- `assets/images/craftsmen-group.jpg`
- `assets/images/stage-message.jpeg`
- `assets/images/kamon-bg.webp`

## License

&copy; 2026 THE TIMELESS CONDOMINIUM. All Rights Reserved.
