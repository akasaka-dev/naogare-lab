# トップページ（index.html）メンテナンスメモ

このファイルは、`naogare-lab`のトップページ（`index.html`）を保守する人（別のClaude
プロジェクト／別のセッションを含む）向けの引き継ぎメモです。

## 場所と構成

- リポジトリ: https://github.com/akasaka-dev/naogare-lab
- Cloudflare Workers + Static Assets + D1 でホスティング
- トップページ本体: リポジトリ直下の `index.html`
- トップページ用画像: `assets/top/*.webp`

**このトップページには開発用の別コピーはありません。**
`index.html` を直接編集して commit / push するだけで完結します。

（各ゲーム `game/<name>/` は `ClaudePj/game/<name>` に開発用コピーを持ち、そちらを
編集してから `naogare-lab/game/<name>` へコピーする2段構えですが、トップページは
このリポジトリが唯一の場所です）

## デプロイ

- `main` ブランチに push すると、Cloudflare Workers Builds が自動でビルド・デプロイします。
- 手動デプロイ操作は不要です。push 後、GitHubのCheck Runs（`Workers Builds: naogare-lab`）で
  成功しているか確認できます。
- 本番URL: https://naogare-lab.naogare.workers.dev/

## 新しいゲームをカタログに追加する手順

カタログは**新着順**（一番新しいゲームが一番上）で並んでいます。新しいゲームは
必ず一覧の先頭に挿入し、それに伴って既存エントリの番号を全部+1でずらします
（末尾に追記して番号を繰り下げていく、という古いやり方はもう使いません）。

1. 元画像（タイトル画面のスクリーンショット等）を用意する
   （これまでは `ClaudePj/game/top素材/` に置いて渡す運用でした）
2. WebPに変換する: 長辺1000px以内にリサイズ → quality 85 で
   `assets/top/<name>.webp` として保存
3. `index.html` 内の `.catalog` ブロックの**先頭**（既存の `No.01` エントリの直前）に
   `<div class="entry-row">`（`<a class="entry">` + いいねボタンの `<button class="like-btn">`）
   を1つ追加し、`No.01` を付ける
   （既存のいずれかのブロックをコピーして書き換えるのが早い。`data-game` 属性は
   `/api/likes/<id>` で使うゲームIDと一致させること）
4. 既存の全エントリの `No.0X` を1つずつ繰り下げる（例: 旧No.01→No.02、旧No.04→No.05）
5. 「準備中」カード（`.entry--soon`、一覧の一番下に固定）の番号も新しい合計数+1に更新する
6. `.hero__stats` の「公開中の作品」数と、`.hero__lede` の本数表記も更新する
7. ローカルで `python -m http.server` などを使って表示・リンク先を確認してから commit

## デザインの方針（トークン）

- 配色: 濃紺の夜色（`--night`）＋ ティール（`--current`、「流れ」のイメージ）＋
  琥珀色（`--lantern`、提灯のイメージ）。
  「クリーム色＋セリフ＋テラコッタ」のようなありがちな配色は意図的に避けています。
- フォント: 見出し = Shippori Mincho、本文 = Zen Kaku Gothic New、
  カタログ番号や日付 = JetBrains Mono（Google Fontsから読み込み、
  `rel="preload"` → `onload`でstylesheetに切り替える非ブロッキング方式）
- 「流」の一文字装飾は現在は使っていません（見出し・準備中カードから削除済み）

## Git identity

このリポジトリのローカル git 設定（`user.name` / `user.email`）は、グローバル設定ではなく
**このリポジトリだけ**に対して以下で設定しています。

```
user.name  = akasaka-dev
user.email = 174847550+akasaka-dev@users.noreply.github.com
```

もし全く新しい場所に `clone` し直す場合は、同様に上記をそのリポジトリのローカル設定として
入れ直す必要があります（`git config user.name "..."` / `git config user.email "..."`）。
