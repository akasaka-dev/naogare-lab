// ---- 会話の台本 ----
// キーは住民の id（main.js の RESIDENTS）。id の台本がなければ kind（grandpa / grandma / girl）の台本を使う。
//   name     … 吹き出しの上に出す名前
//   portrait … 人物画の画像（portraits/ に置く。背景が透明な PNG）。なければ吹き出しは本人の頭の上に出る
//   lines    … せりふ。1 つずつクリック（タップ / Space）で進む。文字列のほかに
//              { text, portrait } と書くと、そのせりふだけ人物画（表情など）を差し替えられる
// 今は仮のせりふ。

export const TALKS = {
  // オープニング（パン工房の中）。who は話している人（mayor / fuwao / chief）で、吹き出しとカメラがその人に向く。
  // 工場長（chief）のせりふは話す動き（Talk）になる。anim: 'laugh' と書くと笑う（Laugh）。
  // ふわお（fuwao）のせりふに anim: 'jump' と書くと、その場でぴょんぴょん飛び跳ねる。
  // shot: 'mecha' はメカを大きく映すカメラ、shot: 'final' はメカ・ふわお・町長を一緒に映す引きのカメラ
  opening: {
    lines: [
      { who: 'mayor', name: '町長', text: 'ふわお君！' },
      { who: 'mayor', name: '町長', text: 'よく頑張ってくれたね……。こんなになるまで、ひとりで戦っていたのか。' },
      { who: 'mayor', name: '町長', text: '工場も町も、ずいぶんひどいことになってしまった。' },
      { who: 'mayor', name: '町長', text: 'それでも、君が守ってくれた人たちがいる。君のおかげで、助かった命がたくさんあるんだ。' },
      { who: 'mayor', name: '町長', text: 'ありがとう。本当にありがとう。' },
      { who: 'mayor', name: '町長', text: 'だが、まだ終わってはいない。' },
      { who: 'mayor', name: '町長', text: 'ばい菌たちは、まだ町のあちこちに潜んでいる。君ひとりの力だけでは、これからの戦いは厳しいだろう。' },
      { who: 'mayor', name: '町長', text: 'そこで、町のみんなと工場長が力を合わせて、これを用意したんだ。' },
      { who: 'chief', name: '工場長', text: 'おーい！ 町長、説明はわしに任せてくだされ！' },
      { who: 'chief', name: '工場長', text: 'ふわお！ こいつは特製の搭乗メカじゃ！', shot: 'mecha' },
      { who: 'chief', name: '工場長', text: 'お前さんの体からパンのかけらを受け取って、前方に発射できる特製の砲台がついておるぞ！', shot: 'mecha' },
      { who: 'chief', name: '工場長', text: 'それに、トッピングの力も、このメカに活かせるようにしてある！', shot: 'mecha' },
      { who: 'mayor', name: '町長', text: 'これなら、君の小さな体でも、ばい菌たちと対等に戦えるはずだ。' },
      { who: 'mayor', name: '町長', text: 'もう一度、君の力を貸してくれないか。今度は、このメカと一緒に。' },
      { who: 'fuwao', name: 'ふわお', text: '（ぴょん！ ぴょん！）', anim: 'jump' },
      { who: 'chief', name: '工場長', text: 'はっはっは！ そうこなくっちゃ！', anim: 'laugh' },
      { who: 'mayor', name: '町長', text: '頼んだよ、ふわお。', shot: 'final' },
    ],
  },

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
