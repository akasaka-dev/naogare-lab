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
   （元画像に透過がある場合はそのままだと黒背景になる。イラストの内側に透明部分が
   あることもあるので、白など絵に合う単色の背景に合成してから保存する。
   例: `assets/top/kuma.webp` は白背景に合成済み）
3. `index.html` 内の `.catalog` ブロックの**先頭**（現在一番上にあるエントリの直前）に
   `<div class="entry-row" id="g-<ゲームID>">`（`<a class="entry">` + いいねボタンの
   `<button class="like-btn">`）を1つ追加し、番号は**既存の最大値+1**を新規に割り振る（既存エントリの番号は一切変更しない）
   （既存のいずれかのブロックをコピーして書き換えるのが早い。`data-game` 属性は
   `/api/likes/<id>` で使うゲームIDと一致させること。さらに `src/likes.js` の
   `VALID_GAME_IDS` にもそのIDを追加すること。追加し忘れるといいねボタンが
   `invalid_game`（400）になる。`id="g-<ゲームID>"` は目次からのジャンプ先）
4. 目次（`<nav id="index">`）の **GAMES グループの `.index__grid` の先頭**に
   `<li><a class="index__item" href="#g-<ゲームID>">…</a></li>` を1つ追加する
   （既存の `<li>` をコピーして、`href`・サムネ画像・`.index__name` を書き換える。
   サムネは手順2の画像をそのまま使う。目次は幅が狭いので、長いタイトルは
   `.index__name` だけ短くしてよい（例: 「黄昏のフォー・イン・ア・ロウII」））
5. 「準備中」カード（`.entry--soon`、一覧の一番下に固定）の番号を、追加したゲームの次の番号に更新する
6. `.hero__stats` の「公開中の作品」数を更新する（`.hero__lede` には本数を書いていないので変更不要）
7. `sitemap.xml` に `https://naogare-lab.naogare.workers.dev/game/<name>/` の `<url>` エントリを1つ追加する
   （`robots.txt` は変更不要）
8. ローカルで `python -m http.server` などを使って表示・リンク先を確認してから commit
   （目次のサムネを押して、該当エントリーへ飛ぶことも確認する）

## 音楽コーナーに作品（サントラ・楽曲）を追加する手順

**これも `index.html` と `en/index.html` の両方に対して行うこと。**

音楽コーナー（`<section id="channel">`）は、チャンネル紹介（NM Labo）の下に
`.release` カードが並ぶ構成。並び順は次のとおり。

- Web で聴く楽曲（例: Forevermore → `/saikai/`）: チャンネル紹介のすぐ下、サントラより上
- サントラ: **古い順**（新しいものを一番下に追加）

1. `.release` カードを1つ追加する。既存のサントラのブロックをコピーして、
   YouTube 埋め込み（`https://www.youtube.com/embed/<動画ID>`）、`title`、見出し、説明文、
   BOOTH のリンクを書き換える。`<div class="release" id="m-ost-<ゲームID>">` のように
   目次用の id を付ける（楽曲は `m-<名前>`、例: `m-forevermore`）
   - 動画ではなくページへのリンクにする場合は、`<a class="release__media" href="...">` に
     `<img>` を入れる（Forevermore のブロックを参照）
2. 目次（`<nav id="index">`）の **MUSIC グループの `.index__grid`** に、
   ページ上の並びと同じ位置で `<li>` を1つ追加する。
   サントラはゲームのサムネ画像を使い回し、`<span class="index__badge">OST</span>` を付ける
   （楽曲は `SONG`）
3. ローカルで表示と目次からのジャンプを確認してから commit

## SEO関連ファイル

- `robots.txt` / `sitemap.xml` はリポジトリ直下にあり、`index.html` 等と同様に
  push すればそのまま静的ファイルとして配信される（ビルド生成物ではない）
- `index.html` の `<head>` には `rel="canonical"`（`https://naogare-lab.naogare.workers.dev/`）、
  `en/index.html` には `rel="canonical"`（`https://naogare-lab.naogare.workers.dev/en/`）を
  それぞれ設定済み。ページのURL構造を変える場合はここも合わせて見直すこと

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
