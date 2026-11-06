// ---- オープニングの台本 ----
// 町人のセリフは talks.json（書き方は docs/talks-spec.md、スキーマは docs/talks.schema.json）。
// ゲームは起動時に talks.json を読み、この TALKS に足す。

export const TALKS = {
  // オープニング（パン工房の中）。who は話している人（mayor / fuwao / chief）で、吹き出しとカメラがその人に向く。
  // 工場長（chief）のせりふは話す動き（Talk）になる。anim: 'laugh' と書くと笑う（Laugh）。
  // ふわお（fuwao）のせりふに anim: 'jump' と書くと、その場でぴょんぴょん飛び跳ねる。
  // face は人物画の表情（joy 喜 / angry 怒 / sad 哀 / fun 楽。省略すると joy）。人物画は町長と工場長のせりふに出る
  // shot: 'mecha' はメカを大きく映すカメラ、shot: 'final' はメカ・ふわお・町長を一緒に映す引きのカメラ
  opening: {
    lines: [
      { who: 'mayor', name: '町長', text: 'ふわお君！' },
      { who: 'mayor', name: '町長', face: 'sad', text: 'よく頑張ってくれたね……。こんなになるまで、ひとりで戦っていたのか。' },
      { who: 'mayor', name: '町長', face: 'sad', text: '工場も町も、ずいぶんひどいことになってしまった。' },
      { who: 'mayor', name: '町長', text: 'それでも、君が守ってくれた人たちがいる。君のおかげで、助かった命がたくさんあるんだ。' },
      { who: 'mayor', name: '町長', face: 'fun', text: 'ありがとう。本当にありがとう。' },
      { who: 'mayor', name: '町長', face: 'sad', text: 'だが、いまだにばい菌によって食べ物は腐り、ここのパン以外は食べられず、人々は飢えている。' },
      { who: 'mayor', name: '町長', face: 'angry', text: 'ばい菌たちは、今も町のあちこちに潜んでいる。君ひとりの力だけでは、これからの戦いは厳しいだろう。' },
      { who: 'mayor', name: '町長', text: 'そこで、町のみんなと工場長が力を合わせて、これを用意したんだ。' },
      { who: 'chief', name: '工場長', face: 'fun', text: 'おーい！ 町長、説明はわしに任せてくだされ！' },
      { who: 'chief', name: '工場長', face: 'joy', text: 'ふわお！ こいつは特製の搭乗メカじゃ！', shot: 'mecha' },
      { who: 'chief', name: '工場長', text: 'お前さんの体からパンのかけらを受け取って、前方に発射できる特製の砲台がついておるぞ！', shot: 'mecha' },
      { who: 'chief', name: '工場長', text: 'それに、トッピングの力も、このメカに活かせるようにしてある！', shot: 'mecha' },
      { who: 'mayor', name: '町長', text: 'これなら、君の小さな体でも、ばい菌たちと対等に戦えるはずだ。' },
      { who: 'mayor', name: '町長', text: 'もう一度、君の力を貸してくれないか。今度は、このメカと一緒に。' },
      { who: 'fuwao', name: 'ふわお', text: '（ぴょん！ ぴょん！）', anim: 'jump' },
      { who: 'chief', name: '工場長', face: 'joy', text: 'はっはっは！ そうこなくっちゃ！', anim: 'laugh' },
      { who: 'mayor', name: '町長', text: '頼んだよ、ふわお。', shot: 'final' },
    ],
  },
};
