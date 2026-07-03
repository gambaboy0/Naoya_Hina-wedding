# Naoya & Hina ご結婚式 | デジタル席次表

QRコードから開く、スマホ向けの結婚式デジタル席次表です。ビルド不要の静的サイト（HTML/CSS/JSのみ）なので、`index.html` をブラウザで開くだけで動作します。

## フォルダ構成

```
seating-chart-site/
├── index.html        画面本体（スプラッシュ＋1本の縦スクロールページ）
├── css/style.css      デザイン
├── js/app.js          スプラッシュ・INDEX・検索・モーダルなどの動作
├── js/data.js         ゲスト・挨拶文・プロフィール・メニューの中身（編集はここだけでOK）
└── assets/img/
    ├── top.jpg         スプラッシュ画面の背景（Welcome to our wedding）
    ├── kimono.jpg       TOPセクションの写真
    └── menu-bg.jpg      PROFILEセクションの写真
```

サイト構成は TOP → INDEX → GREETING → PROFILE → SEATING LIST → MENU → DRINK → PHOTO SHARING の1本の縦スクロールで、右上のメニューアイコンからいつでも各セクションへジャンプできます。

## 内容の差し替え方

`js/data.js` を編集してください。ゲスト名・続柄・テーブル、挨拶文、お食事／お飲物メニュー、プロフィール（生年月日・出身地・血液型・MBTI・メッセージ）、写真共有リンクをすべてここで管理しています。HTML/CSSを触る必要はありません。

写真を差し替える場合は `assets/img/top.jpg`（スプラッシュ用）・`assets/img/kimono.jpg`（TOP用）・`assets/img/menu-bg.jpg`（PROFILE用）を同じファイル名で置き換えてください。

## ローカルでプレビュー

`index.html` をダブルクリックしてブラウザで開くだけで確認できます。

## GitHubで共有する（無料・非公開）

新郎新婦のお写真や実際のゲストのお名前が含まれるため、**Privateリポジトリ + Netlify** の組み合わせを推奨します。GitHub Pagesは無料プランだとPublicリポジトリのみ対応のため、非公開のまま無料公開したい場合はNetlifyが簡単です。

1. GitHubで新規リポジトリを作成する（Visibility は **Private** を選択）
2. リポジトリ画面の「Add file」→「Upload files」を開き、この `seating-chart-site` フォルダの中身（`index.html`・`css/`・`js/`・`assets/`）をまとめてドラッグ＆ドロップしてアップロードし、コミットする
3. https://netlify.com にアクセスし、GitHubアカウントでサインアップ（無料）
4. 「Add new site」→「Import an existing project」→ GitHub を選択し、さきほどのリポジトリを認証・選択
5. ビルド設定は空欄のまま（Build command なし、Publish directory は `/`）で「Deploy」を押す
6. 数十秒でデプロイが完了し、`https://ランダムな文字列.netlify.app` のようなURLが発行される
7. このURLをQRコードにして印刷すれば、ゲストがスマホでアクセスできる

※ 内容を修正したいときは、GitHub上でファイルを直接編集（鉛筆アイコン）してコミットすれば、Netlifyが自動的に再デプロイします。

※ 非公開にこだわらない場合は、リポジトリを Public にして GitHub Pages（Settings → Pages → Branch を選択）を使う方法でも無料で公開できます。
