# トップページ（index.html）メンテナンスメモ

このファイルは、`naogare-lab`のトップページ（`index.html`）を保守する人（別のClaude
プロジェクト／別のセッションを含む）向けの引き継ぎメモです。

## 場所と構成

- リポジトリ: https://github.com/akasaka-dev/naogare-lab
- Cloudflare Workers + Static Assets + D1 でホスティング
- トップページ本体: リポジトリ直下の `index.html`（日本語版）と `en/index.html`（英語版）
- トップページ用画像: `assets/top/*.webp`

**このトップページには開発用の別コピーはありません。**
`index.html` / `en/index.html` を直接編集して commit / push するだけで完結します。

（各ゲーム `game/<name>/` は `ClaudePj/game/<name>` に開発用コピーを持ち、そちらを
編集してから `naogare-lab/game/<name>` へコピーする2段構えですが、トップページは
このリポジトリが唯一の場所です）

## 日本語版・英語版の同期

`index.html`（`/`）と `en/index.html`（`/en/`）は独立したファイルで、ビルド時に
自動生成されるものではありません。**カタログのゲーム内容・並び順・日付・
`.hero__stats` の数字・フッターなど、中身に関わる変更は必ず両方のファイルに
同じ内容を反映すること。** 文言（説明文・見出し）は英語版では英訳し、ゲームの
タイトルも読めるよう英訳したものを使っている（例: 「一句ござる！」→
"Ikku Gozaru! – Haiku Duel"、「たすけあいヒーロー ふわお」→ "Fuwao: Mutual Aid
Hero"）。実際にプレイする `/game/<name>/` のゲーム本体は日本語版しかないので、
英語版のカタログ `.entry__meta` には `· Japanese UI` を付けて期待値のズレを防いで
いる。

`en/index.html` は `/en/` 配下にあるため、画像パスは `assets/top/...` のような
相対パスではなく `/assets/top/...` のようにルート相対で書くこと（日本語版は
リポジトリ直下にあるので相対パスのままでよい）。`<head>` には両ファイルとも
`hreflang="ja"` / `hreflang="en"` / `hreflang="x-default"` の `<link rel="alternate">`
を置いてある。ヘッダー右上の「EN」/「日本語」リンク（`.lang-switch`）で相互に
行き来できる。

## デプロイ

- `main` ブランチに push すると、Cloudflare Workers Builds が自動でビルド・デプロイします。
- 手動デプロイ操作は不要です。push 後、GitHubのCheck Runs（`Workers Builds: naogare-lab`）で
  成功しているか確認できます。
- 本番URL: https://naogare-lab.naogare.workers.dev/

## 新しいゲームをカタログに追加する手順

**この手順は `index.html` と `en/index.html` の両方に対して行うこと**
（英語版は説明文・タイトルを英訳し、`.entry__meta` に `· Japanese UI` を付ける。
画像パスはルート相対 `/assets/top/...` にする）。

カタログの**表示順は新着順**（一番新しいゲームが一番上）ですが、`No.0X` は
「追加された順」に割り振られる固定の通し番号で、一度付いたら変わりません
（新しいゲームは必ず次の番号＝現在の最大値+1になります。既存エントリの番号を
ずらしたり振り直したりはしません）。つまり画面上、番号は上から下に向かって
新しい→古いの順（数字としては降順）に並びます。

1. 元画像（タイトル画面のスクリーンショット等）を用意する
   （これまでは `ClaudePj/game/top素材/` に置いて渡す運用でした）
2. WebPに変換する: 長辺1000px以内にリサイズ → quality 85 で
   `assets/top/<name>.webp` として保存
3. `index.html` 内の `.catalog` ブロックの**先頭**（現在一番上にあるエントリの直前）に
   `<div class="entry-row">`（`<a class="entry">` + いいねボタンの `<button class="like-btn">`）
   を1つ追加し、番号は**既存の最大値+1**を新規に割り振る（既存エントリの番号は一切変更しない）
   （既存のいずれかのブロックをコピーして書き換えるのが早い。`data-game` 属性は
   `/api/likes/<id>` で使うゲームIDと一致させること）
4. 「準備中」カード（`.entry--soon`、一覧の一番下に固定）の番号を、追加したゲームの次の番号に更新する
5. `.hero__stats` の「公開中の作品」数と、`.hero__lede` の本数表記も更新する
6. ローカルで `python -m http.server` などを使って表示・リンク先を確認してから commit

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
