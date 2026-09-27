# 紹介パートナー管理

管理者が担当者を登録し、担当者本人がパスワードを設定して紹介リンクを発行する機能です。

## 現在の公開先（2026-09-27）

- Vercelチーム: `fido`（`fido-89dfcaca`）
- プロジェクト: `timelesscondminium`（`prj_dX6OSqyOMfAnAvAGYiGQtgNNQWqG`）
- 本番ブランチ: `fido-production`。このブランチへのpushでfidoに自動デプロイ。
- 旧環境の `main` は維持しており、fido用の変更は `fido-production` で管理。
- 公開URL: `https://timelesscondminium.vercel.app`
- 担当者ログイン: `https://timelesscondminium.vercel.app/partners`
- DB: Neon `timeless-partners`、Free、Washington D.C.（`iad1`）。本番環境のみに接続。
- 初期管理者: `ytaishu07@gmail.com`。本人がパスワード・認証アプリの初期設定を完了してから利用。

`timelesscondominium.com` は旧Vercelチームを向いており、ドメインの切り替えは未実施です。
現在の `PARTNER_ORIGIN` は `https://timelesscondminium.vercel.app` です。
下記の新規導入例にある元ドメインをそのまま使わず、運用中の公開先に合わせて設定してください。
ドメインを切り替えるときはDNSの管理権限を確認し、`PARTNER_ORIGIN` を更新して再デプロイし、
ログイン・紹介リンク・メール連携を確認します。すでに発行した仮ドメインのリンクも引き続き扱えるようにしてください。

本番接続設定と初期管理者の設定URLは、Gitリポジトリの外にある非公開フォルダに保存しています。
秘密鍵や初期設定URLをこの文書やGitに追記しないでください。

## 画面

- `/partners`：担当者ログイン・本人のリンク一覧・リンク発行
- `/partners/activate#token=...`：初期設定・パスワード再設定（48時間、1回限り）
- `/management/<PARTNER_ADMIN_PATH>`：管理者専用。一般ページや担当者画面には入口を表示しません。
- `/r/<slug>`：公開する紹介リンク。停止時には無効ページを表示します。

URL名は3〜48文字の英小文字・数字・ハイフン。日本語の管理名も設定できます。
URL名は発行後に変更・再利用しません。表示名の変更とリンクの停止・再開ができます。
別名が必要になった場合は新しいリンクを作成します。1担当者100リンクまでです。

## 本番導入

1. 専用のPostgreSQLデータベースを用意します。Neon / Supabase等のPostgreSQL接続URLに対応します。
2. `node scripts/affiliate-admin.mjs generate-config /private/tmp/timeless-partner-config.env` で専用秘密鍵と管理URLのランダム部分を生成します。既存ファイルは上書きしません。
3. Vercelの本番環境に以下のサーバー専用環境変数を登録します。`NEXT_PUBLIC_`は付けません。

   | 変数 | 内容 |
   | --- | --- |
   | `PARTNER_DATABASE_URL` | 専用DBの接続URL。TLS接続を使用 |
   | `PARTNER_SECRET` | 生成した43文字以上の秘密鍵。MFAシードの暗号化と紹介Cookieの署名に使用 |
   | `PARTNER_ADMIN_PATH` | 生成した24〜80文字の管理者専用パス |
   | `PARTNER_ORIGIN` | `https://timelesscondominium.com` |

4. 同じ設定をローカルの秘密ファイルまたはプロセス環境変数に設定して、初期化を実行します。

   ```sh
   node scripts/affiliate-admin.mjs init ytaishu07@gmail.com /private/tmp/timeless-partner-admin.txt
   ```

   テーブル作成は再実行可能ですが、初期設定済み管理者の上書きは拒否します。出力ファイルは所有者のみ読み書き可能な権限で作成します。接続URL・秘密鍵・初期設定URLをGitに登録しないでください。

5. Vercelへデプロイします。環境変数の変更は再デプロイ後に反映されます。
6. 管理者本人が秘密ファイルに記載された初期設定URLを開き、パスワードと認証アプリを登録します。復旧コード8個を安全な場所に保存します。
7. 管理者画面をブックマークし、担当者を登録します。発行された初期設定URLは本人へ個別に渡します。アプリから案内メールを自動送信する機能はありません。

認証アプリと復旧コードの両方を失った場合は、本人確認後に運用担当者が復旧します。公開APIには管理者のMFAを解除する機能を設けていません。`PARTNER_SECRET`の不用意な変更は既存のMFAシードを復号できなくするため、DBとともに安全に保管してください。

## 紹介情報と既存機能

紹介リンクは、担当者固有の紹介コードを付けたトップページにリダイレクトします。90日間の署名付きHttpOnly Cookieでリンクを保持し、問い合わせ受付時にDB上の有効な担当者・リンクへ照合します。Cookie・フォームを改ざんして他の担当者の名義を指定することはできません。

既存のPT001〜PT006・PT999の紹介URLは継続利用できます。新しい紹介リンクから既存の紹介URLへ遷移した際は、後から開いた既存リンクを優先します。ブラウザや端末をまたいだ追跡は行いません。Cookieの削除や期限切れでは紐付けが失われます。

通知メールには紹介会社・担当者名・リンク名を追記します。既存の問い合わせシートA〜I列は維持し、J〜L列へ紹介会社・担当者名・URL名を追記します。公開APIには紹介担当者の個人情報を返しません。ローカルプレビューではメール送信とGoogle Sheetsへの接続を無効にしています。

## 保護

- 管理者はパスワード＋認証アプリ必須。TOTPと復旧コードは再利用を拒否
- パスワードはscrypt（N=131072、r=8、p=1）＋個別ソルトで保存
- セッションと招待トークンはランダム値を生成し、DBにはハッシュのみ保存
- 管理者セッション2時間、担当者セッション8時間。停止・パスワード再設定で失効
- APIごとの権限確認、Origin照合、HttpOnly / Secure / SameSite Cookie
- DBに保持するログイン回数制限。複数のサーバー間でも共有
- URL名の一意制約とトランザクション。並行発行での重複を防止
- 管理画面はno-store / no-referrer / noindex、CSP、外部解析タグ除外
- 管理者用操作履歴。パスワードやトークンはログに記録しない

## 動作確認

```sh
npm run test:partners
npm run preview:partners
# 別ターミナル
node tests/affiliate-http.mjs
npm run build
```

プレビューは `http://127.0.0.1:3100`、架空アカウントのみを使います。認証情報は起動ログに表示される一時ファイルに保存します。本番データ・本番メールを使用しません。ローカルDBの分岐は開発モードかつVercel以外でのみ有効です。

本番DBでは期限切れのセッション・招待・回数制限を定期的に整理し、バックアップを有効にしてください。アクセス履歴の保存期間は運用方針に合わせて設定します。
