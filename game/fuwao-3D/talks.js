// ---- 会話の台本 ----
// キーは住民の id（main.js の RESIDENTS）。id の台本がなければ kind（grandpa / grandma / girl）の台本を使う。
//   name     … 吹き出しの上に出す名前
//   portrait … 人物画の画像（portraits/ に置く。背景が透明な PNG）。なければ吹き出しは本人の頭の上に出る
//   lines    … せりふ。1 つずつクリック（タップ / Space）で進む。文字列のほかに
//              { text, portrait } と書くと、そのせりふだけ人物画（表情など）を差し替えられる
// 今は仮のせりふ。

export const TALKS = {
  grandpa: {
    name: 'おじいちゃん',
    portrait: null,
    lines: ['（まだ会話はありません）'],
  },
  grandma: {
    name: 'おばあちゃん',
    portrait: null,
    lines: ['（まだ会話はありません）'],
  },
  mayor: {
    name: '町長',
    portrait: null,
    lines: ['（まだ会話はありません）'],
  },
  girl: {
    name: '女の子',
    portrait: null,
    lines: ['（まだ会話はありません）'],
  },
};
