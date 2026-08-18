/*
 * ここに実際の情報を入力してください（サンプルデータです）。
 * side: "groom"（新郎側）/ "bride"（新婦側）/ "both"（ご両家共通）
 */

const COUPLE = {
  groomName: "直弥",
  groomNameRomaji: "Naoya",
  groomFullName: "細川 直弥",
  brideName: "日那",
  brideNameRomaji: "Hina",
  brideFullName: "川島 日那",
  dateLabel: "2026.8.23 SUN",       // フッター・年表示用（先頭4文字を年に使用）
  dateDisplay: "Sunday, 23 August 2026", // オープニング画面の日付表示用
};

// ---------- オープニングページ（スプラッシュ）の背景 ----------
// video に "assets/video/opening.mp4" のようなパスを設定すると動画モードになります。
// 空欄の場合は photos の写真をクロスフェードで順番に表示します（後で差し替えOK）。
const OPENING = {
  video: "",
  photos: [
    "assets/img/opening1.jpg",
    "assets/img/opening2.jpg",
    "assets/img/opening3.jpg",
    "assets/img/opening4.jpg",
    "assets/img/opening5.jpg",
  ],
  slideDurationMs: 3000,
  // 手書き風の一言（空欄""にすると非表示になります）
  tagline: "",
};

// 全体座席図の行構成（上から前列・中列・後列。各行は左から右の順）
const SEATING_ROWS = [
  ["1-1", "1-2", "1-3"],
  ["2-1", "2-2"],
  ["3-1", "3-2", "3-3"],
];

// トップページ（写真の上部に重ねて）表示するGreetingの文面。
// 配列の1要素が1段落、段落内の各文字列は改行して表示されます。
const TOP_MESSAGE = {
  paragraphs: [
    ["本日はご多用にもかかわらず", "お集まりいただきありがとうございます"],
    ["皆様にあたたかく見守られ", "今日の日を迎えられることを嬉しく思います"],
    ["日頃お世話になっております皆様と", "楽しく過ごさせていただければ幸いに存じます"],
    ["心ばかりの披露パーティーですが　皆様と素敵な時間が", "過ごせることを楽しみにしております"],
  ],
};

// ---------- 新郎・新婦プロフィール（写真＋7項目） ----------
// 2026/7/9ミーティングで確定した内容です（特技は削除・仕事を追加）。
// photo は "assets/img/profile/xxx.jpg" のように実際の写真を用意したら差し替えてください。
// 空のままにしておくと写真プレースホルダーが表示されます。
const GROOM_PROFILE = {
  role: "GROOM",
  name: "直弥",
  photo: "assets/img/profile/groom.jpg",
  stats: [
    { label: "BIRTHDAY", value: "1994.3.27" },
    { label: "BIRTHPLACE", value: "岐阜県" }, // 2026-08-18 確定（生い立ち文の「愛知県にて誕生」とは別。生まれ＝愛知／出身＝岐阜）
    { label: "BLOOD TYPE", value: "B" }, // 二人とも同じ血液型とのこと
    { label: "MBTI", value: "INFP-A（仲介者）" }, // 2026-08-18 確定
    { label: "WORK", value: "株式会社不二越" },
    { label: "HOBBY", value: "ゴルフ キャンプ 旅行" },
    { label: "FAVORITE FOOD", value: "お寿司 うなぎ 梅 トマト" },
  ],
};

const BRIDE_PROFILE = {
  role: "BRIDE",
  name: "日那",
  photo: "assets/img/profile/bride.jpg",
  stats: [
    { label: "BIRTHDAY", value: "1997.6.15" },
    { label: "BIRTHPLACE", value: "沖縄県" },
    { label: "BLOOD TYPE", value: "B" },
    { label: "MBTI", value: "ENTP-T（討論者）" },
    { label: "WORK", value: "社会福祉法人セーナー苑" },
    { label: "HOBBY", value: "旅行 手話 ウミガメ" },
    { label: "FAVORITE FOOD", value: "うなぎ お寿司 ポテチ チーズ" },
  ],
};

// ---------- PERSONAL HISTORY ページ（生い立ちの時系列） ----------
// timelineの各itemは { stage, photo, text } または { stage, photos: [...], text } の形です。
// photos に複数枚入れると、左右の矢印とドットで順に見られるスライドになります。
// photo（1枚だけ）の書き方もそのまま使えます。空欄はプレースホルダー表示。
const GROOM_HISTORY = {
  role: "GROOM",
  timeline: [
    {
      stage: "誕生時",
      photos: [
        "assets/img/history/groom/birth-1.jpg",
        "assets/img/history/groom/birth-2.jpg",
        "assets/img/history/groom/birth-3.jpg",
      ],
      text: "1994年3月27日、愛知県にて3,350gで誕生。沐浴中、小さな足を見た祖母に「この子は大きくならないね」と言われたそうです。…その予想、当たりました。",
    },
    {
      stage: "幼少期",
      photos: [
        "assets/img/history/groom/child-1.jpg",
        "assets/img/history/groom/child-2.jpg",
        "assets/img/history/groom/child-3.jpg",
        "assets/img/history/groom/child-4.jpg",
      ],
      text: "この頃はまだ姉にも可愛がられ、いつも姉の後ろをついて回っていました。七五三では千歳飴がもらえず、泣いて拗ねるキュートな一面も。",
    },
    {
      stage: "学生時代",
      photos: [
        "assets/img/history/groom/student-1.jpg",
        "assets/img/history/groom/student-2.jpg",
        "assets/img/history/groom/student-3.jpg",
      ],
      text: "高校では学年でただ一人のアーチェリー部員。向かいの賑やかな弓道部を羨みながら練習する日々でした。大学では航空宇宙工学を学ぶために上京。高校、大学ともに一生の友人たちと出会えました。",
    },
    {
      stage: "社会人",
      photos: [
        "assets/img/history/groom/work-1.jpg",
        "assets/img/history/groom/work-2.jpg",
        "assets/img/history/groom/work-3.jpg",
        "assets/img/history/groom/work-4.jpg",
        "assets/img/history/groom/work-5.jpg",
      ],
      text: "就職を機に富山へ。熱処理設備の設計や修理対応に携わり、国内外を飛び回る中で、多くの経験と出会いに恵まれました。8月からは全く異なる部署へ異動し、新たな仕事にイチから挑戦中です。",
    },
  ],
};

const BRIDE_HISTORY = {
  role: "BRIDE",
  timeline: [
    {
      stage: "誕生時",
      photos: [
        "assets/img/history/bride/birth-1.jpg",
        "assets/img/history/bride/birth-2.jpg",
      ],
      text:
        "1997年6月15日（日）、沖縄県那覇市にて誕生☀️<br>" +
        "「日那」という名前の由来になりました。",
    },
    {
      stage: "幼少期",
      photos: [
        "assets/img/history/bride/child-1.jpg",
        "assets/img/history/bride/child-2.jpg",
        "assets/img/history/bride/child-3.jpg",
        "assets/img/history/bride/child-4.jpg",
        "assets/img/history/bride/child-5.jpg",
      ],
      text:
        "ビーチで毎日のように遊んでいました🏖<br>" +
        "人見知りがひどかったにも関わらず、<br>" +
        "素敵なおじ様には笑顔で抱っこされていたそうです！",
    },
    {
      stage: "学生時代",
      photos: [
        "assets/img/history/bride/student-1.jpg",
        "assets/img/history/bride/student-2.jpg",
        "assets/img/history/bride/student-3.jpg",
        "assets/img/history/bride/student-4.jpg",
      ],
      text:
        "小学生の時、家族で富士サファリパークに行き麓でキャンプをしたことは今でも大切な思い出です🐯<br>" +
        "高校時代はコーラス部に所属。<br>" +
        "音楽室でみんなと過ごした時間は私の青春です！<br>" +
        "短大では障害福祉で活躍できる保育士を目指し、<br>" +
        "恩師や大切な友人との出会いがありました🌱",
    },
    {
      stage: "社会人",
      photos: [
        "assets/img/history/bride/work-1.jpg",
        "assets/img/history/bride/work-2.jpg",
        "assets/img/history/bride/work-3.jpg",
        "assets/img/history/bride/work-4.jpg",
      ],
      text:
        "小さい頃から志していた福祉の道へ！<br>" +
        "障害者支援の仕事、NPO法人での活動、<br>" +
        "手話通訳者を目指しての学習、友人との旅行など、<br>" +
        "仕事もプライベートも充実しています✨",
    },
  ],
};

// ---------- OUR HISTORY ページ（お二人のストーリー） ----------
// 2026-08-11 クライアントより本文と写真を受領。5段階（出会い／交際スタート／プロポーズ／ご入籍／結婚式）
// から 4段階（出会い／お付き合い／プロポーズ／結婚）へ構成変更。
const OUR_HISTORY = [
  {
    stage: "出会い",
    photo: "assets/img/our-history/meeting.jpg",
    text:
      "きっかけはマッチングアプリ。メッセージを重ね、初めての出会いはコメダ珈琲店のモーニング。" +
      "お互い第一印象は◎！気づけばあっという間に3時間が過ぎていました。",
  },
  {
    stage: "お付き合い",
    photo: "assets/img/our-history/dating.jpg",
    text:
      "デートを重ね、🇮🇩出張前日に新郎から告白！1週間の出張を終え、帰国後にデート。" +
      "その帰り道、なぜかトンネルの中でOKの返事🫶🏻 まさかのタイミングに「ここで！？」となりつつ、" +
      "2月22日、晴れて交際スタート！",
  },
  {
    stage: "プロポーズ",
    photo: "assets/img/our-history/proposal.jpg",
    text:
      "12月22日は毎年恒例、スキマスイッチ武道館ライブの日。" +
      "「これから毎年、記念日にこのライブへ行けたら素敵だな」と思い、この日にプロポーズ。" +
      "日付が変わった瞬間に「結婚してください🌹」",
  },
  {
    stage: "結婚",
    photos: [
      "assets/img/our-history/marriage-1.jpg",
      "assets/img/our-history/marriage-2.jpg",
    ],
    text:
      "4月22日、晴れて夫婦に！「よい夫婦」の語呂合わせに加えて、" +
      "交際開始もプロポーズも22日だったことから、これからの記念日も“22日”に統一しました。" +
      "結婚指輪には新婦の大好きなウミガメを刻印しました。",
  },
];

// 実際の座席表（会場管理ツールの画像）から書き起こしたデータです。
// note: ゲストの紹介文（全体座席図でお名前をタップすると表示されます）。
//       友人ゲスト全員分の紹介文がLINEで届いたらここに貼り付けてください。
// yomi は旧・座席検索機能用の読み仮名です（検索機能の廃止に伴い現在は未使用）。
const TABLES = [
  {
    id: "1-1",
    sushi: { img: "assets/img/sushi/nodoguro.png", name: "ノドグロ炙り" },
    guests: [
      { name: "福永 桃子", yomi: "ふくなが ももこ", kana: "", side: "groom", category: "friend", relation: "友人", note: "今をときめく女社長。頭の回転が速く周りへの気配りも抜群。日本の宇宙開発を支える存在。" },
      { name: "鈴木 脩斗", yomi: "すずき しゅうと", kana: "", side: "groom", category: "friend", relation: "友人", note: "痩せるとウッディ、太るとバズ。優しさと仲間想いで愛される、まさに一人トイ・ストーリー。" },
      { name: "澤井 恭助", yomi: "さわい きょうすけ", kana: "", side: "groom", category: "friend", relation: "友人", note: "何事も丁寧で頭脳明晰な頼れるしっかり者。みんなから信頼される存在。唯一の欠点はイビキだけ？" },
      { name: "根岸 昂也", yomi: "ねぎし こうや", kana: "", side: "groom", category: "friend", relation: "友人", note: "外見も中身もイケメン。歌もうまい心優しい好青年。女子に生まれていたら絶対付き合いたい。" },
      { name: "大島 一輝", yomi: "おおしま かずき", kana: "", side: "groom", category: "friend", relation: "友人", note: "興味のあることへの熱量は人一倍。邦楽好きで落ち着いた声が魅力。朝にめっぽう弱く爆音目覚ましでも熟睡。" },
      { name: "布施 綾太", yomi: "ふせ りょうた", kana: "", side: "groom", category: "friend", relation: "友人", note: "理論派ギャンブラーで努力家。やると決めたことは最後までやり抜く。宇宙探査で月の裏側を知る男。" },
      { blank: true },
      { name: "加藤 遼", yomi: "かとう りょう", kana: "", side: "groom", category: "friend", relation: "友人", note: "自由気ままでマイペース。洋楽好きでレコードがよく似合う。詰めの甘さが愛嬌。一緒にいて楽しい存在。" },
    ],
  },
  {
    id: "1-2",
    sushi: { img: "assets/img/sushi/hotaruika.png", name: "ホタルイカ" },
    guests: [
      { name: "渡辺 周平", yomi: "わたなべ しゅうへい", kana: "", side: "groom", category: "friend", relation: "友人", note: "自由人なのに、不思議と社会に馴染む要領の良さがある。ジャンベと太陽と原付が似合う男。" },
      { name: "大脇 盛生", yomi: "おおわき もりお", kana: "", side: "groom", category: "friend", relation: "友人", note: "一緒にいると笑わない日がない。予想外の天然さと抜群の行動力で、いつも場を盛り上げてくれる。" },
      { name: "宮島 公志", yomi: "みやじま こうじ", kana: "", side: "groom", category: "friend", relation: "友人", note: "鋭い眼光なのに心はとても穏やかで、優しい平和主義者。一時期会うたびに髪色が変わっていた。" },
      { name: "山腰 航", yomi: "やまこし わたる", kana: "", side: "groom", category: "friend", relation: "友人", note: "一番長い付き合いの親友。物知りで植物にも詳しい。なぜか昔から僕のことを腹黒いと言い続ける" },
      { name: "澤野 拓哉", yomi: "さわの たくや", kana: "", side: "groom", category: "friend", relation: "友人", note: "段取り上手で準備は完璧。テキパキ動く姿が頼もしく、縁の下の力持ち。ローストビーフの腕前はプロ級。" },
      { name: "猿渡 蒼周", yomi: "さわたり そうしゅう", kana: "", side: "groom", category: "friend", relation: "友人", note: "広い視野で周りをよく見渡し、幅広い知識が売り。タワマン暮らしで、文字通り視野も広い男です。" },
    ],
  },
  {
    id: "1-3",
    sushi: { img: "assets/img/sushi/amaebi.png", name: "甘エビ" },
    guests: [
      { name: "舟見 卓馬", yomi: "ふなみ たくま", kana: "", side: "bride", category: "friend", relation: "同僚", note: "周りの方一人ひとりを大切にする姿勢や考え方を尊敬しています。このプロフィールブックを作ってくれました！" },
      { name: "田口 愛", yomi: "たぐち あい", kana: "", side: "bride", category: "friend", relation: "同僚", note: "仕事だけでなく、メイクやスキンケア、素敵なお店など私の知らない世界をたくさん教えてくれる憧れの先輩。" },
      { name: "島崎 平", yomi: "しまざき たいら", kana: "", side: "bride", category: "friend", relation: "同僚", note: "細やかな気遣いとさりげないフォローで、部署が変わってもずっと気にかけてくださる心強い先輩。" },
      { name: "高橋 夕歌", yomi: "たかはし ゆうか", kana: "", side: "bride", category: "friend", relation: "同僚", note: "どんなことも楽しめる前向きな考え方が素敵な先輩。周りを自然と笑顔にしてくれる、私が目指したい理想の奥さんです。" },
      { name: "窪田 小雪", yomi: "くぼた こゆき", kana: "", side: "bride", category: "friend", relation: "同僚", note: "ふんわりにこにこ笑顔に癒やされる可愛い後輩。穏やかな雰囲気の中に芯があり、周りに流されない強さも魅力です。" },
      { name: "荒井 優里亜", yomi: "あらい ゆりあ", kana: "", side: "bride", category: "friend", relation: "同僚", note: "優しくて、思いやりとAudi愛にあふれた先輩。個性的な感性が魅力的で、いつもたくさん支えてもらっています。" },
      { name: "幅﨑 千晶", yomi: "はばさき ちあき", kana: "", side: "bride", category: "friend", relation: "同僚", note: "誰に対しても忖度せず自分の考えを伝えられる方で、会うたびに綺麗になっていくかっこいい先輩。" },
      { name: "山田 恵梨香", yomi: "やまだ えりか", kana: "", side: "bride", category: "friend", relation: "同僚", note: "周りをよく見ていて、小さな変化にも気付けるしっかり者。どんな話も笑顔で聞いてくれるので、何でも話したくなります。" },
    ],
  },
  {
    id: "2-1",
    sushi: { img: "assets/img/sushi/ikura.png", name: "いくら" },
    guests: [
      { name: "松田 尭之", yomi: "まつだ たかゆき", kana: "", side: "groom", category: "friend", relation: "友人", note: "誰からも愛される人気者。人の意見を尊重しながらも、時折り見せるワガママさが愛されポイント。" },
      { name: "植村 俊亮", yomi: "うえむら しゅんすけ", kana: "", side: "groom", category: "friend", relation: "同僚", note: "穏やかで居心地のいい存在。実は男気もある。奥さんのために長年のタバコをやめた愛妻家。" },
      { name: "近田 理夫", yomi: "ちかだ みちお", kana: "", side: "groom", category: "friend", relation: "同僚", note: "人見知りとは無縁の慶應ボーイ。誰とでも仲良くなれるクラスに1人は欲しい存在。欲望にはとても素直。" },
      { name: "西村 光生", yomi: "にしむら みつお", kana: "", side: "groom", category: "friend", relation: "同僚", note: "優しさにあふれた唯一無二の雰囲気。純粋な人柄で、自然と周りを笑顔にしてくれる存在。" },
      { blank: true },
      { name: "石田尾 樹", yomi: "いしだお いつき", kana: "", side: "groom", category: "friend", relation: "同僚", note: "独自の視点とブレない価値観が魅力。映画とゲームを愛する。本人の「普通」は、だいたい普通じゃない。" },
    ],
  },
  {
    id: "2-2",
    sushi: { img: "assets/img/sushi/buri.png", name: "ブリ" },
    guests: [
      { name: "黒川 恵里", yomi: "くろかわ えり", kana: "", side: "bride", category: "friend", relation: "友人", note: "高校生の頃から達観していて、どんな相談事にも的確なアドバイスをくれる。学生時代からの私をよく知る同級生。" },
      { name: "金尾 有花", yomi: "かなお ゆか", kana: "", side: "bride", category: "friend", relation: "友人", note: "仕事も趣味も全力で楽しんでいる姿が素敵。その明るさにいつも元気をもらえるエネルギッシュな同級生。" },
      { name: "津田 奈菜子", yomi: "つだ ななこ", kana: "", side: "bride", category: "friend", relation: "友人", note: "見た目も心も美しく、清楚で凛としていて、謙虚さと芯の強さを兼ね備えたまさに大和撫子のような同級生。" },
      { name: "橋本 明日佳", yomi: "はしもと あすか", kana: "", side: "bride", category: "friend", relation: "友人", note: "ピュアで真面目な努力家。小動物のようなふわふわ可愛い姿と、建築士というギャップがとても魅力的な同級生。" },
      { name: "佐藤 百華", yomi: "さとう ももか", kana: "", side: "bride", category: "friend", relation: "友人", note: "真面目で誠実、一度決めたことは最後までやり抜く頑張り屋さん。いつも可愛くてたくさん癒しをくれる自慢の友人。" },
      { name: "片桐 行人", yomi: "かたぎり ゆきと", kana: "", side: "bride", category: "friend", relation: "友人", note: "まるで文豪のような独特な世界観で誰よりも深く物事を考える人。ギターの名手でもある、中高の同級生。" },
      { name: "明柴 聰史", yomi: "あけしば さとし", kana: "", side: "bride", category: "friend", relation: "恩師", note: "短大の恩師で、これまで出会った中で誰よりもタフな方。一緒に子ども家庭支援の活動をしています。" },
      { name: "伊井 信之助", yomi: "いい しんのすけ", kana: "", side: "bride", category: "friend", relation: "友人", note: "高校時代夢中でカホンを叩いていた姿は今でも忘れられない。一緒にいると自然体でいられる同級生。" },
    ],
  },
  {
    id: "3-1",
    sushi: { img: "assets/img/sushi/shiroebi.png", name: "白えび" },
    guests: [
      { name: "竹澤 朋", yomi: "たけざわ とも", kana: "", side: "groom", category: "family", relation: "義兄", note: "" },
      { name: "細川 満弘", yomi: "ほそかわ みつひろ", kana: "", side: "groom", category: "family", relation: "伯父", note: "" },
      { name: "竹澤 侑希", yomi: "たけざわ ゆうき", kana: "", side: "groom", category: "family", relation: "姪", note: "", honorific: "ちゃん" }, // 2026-08-19 敬称を「ちゃん」に
      { name: "細川 頼男", yomi: "ほそかわ よりお", kana: "", side: "groom", category: "family", relation: "伯父", note: "" },
      { name: "竹澤 眞美子", yomi: "たけざわ まみこ", kana: "", side: "groom", category: "family", relation: "姉", note: "" },
      { name: "細川 操", yomi: "ほそかわ みさお", kana: "", side: "groom", category: "family", relation: "伯母", note: "" },
      { name: "細川 眞紀子", yomi: "ほそかわ まきこ", kana: "", side: "groom", category: "family", relation: "母", note: "" },
      { name: "細川 優", yomi: "ほそかわ まさる", kana: "", side: "groom", category: "family", relation: "父", note: "" },
    ],
  },
  {
    id: "3-2",
    sushi: { img: "assets/img/sushi/masuzushi.png", name: "ますの寿司" },
    guests: [
      { name: "細川 博史", yomi: "", kana: "", side: "groom", category: "family", relation: "従兄", note: "" },
      { name: "細川 良清", yomi: "ほそかわ よしきよ", kana: "", side: "groom", category: "family", relation: "伯父", note: "" },
      { name: "細川 裕美", yomi: "ほそかわ ひろみ", kana: "", side: "groom", category: "family", relation: "伯母", note: "" },
      { name: "細川 幸秀", yomi: "ほそかわ ゆきひで", kana: "", side: "groom", category: "family", relation: "伯父", note: "" },
      { name: "細川 紀子", yomi: "ほそかわ のりこ", kana: "", side: "groom", category: "family", relation: "伯母", note: "" },
      { name: "細川 公也", yomi: "ほそかわ きみや", kana: "", side: "groom", category: "family", relation: "伯父", note: "" },
      { name: "東 真知子", yomi: "あずま まちこ", kana: "", side: "groom", category: "family", relation: "叔母", note: "" },
      { name: "東 泰希", yomi: "あずま たいき", kana: "", side: "groom", category: "family", relation: "叔父", note: "" },
    ],
  },
  {
    id: "3-3",
    sushi: { img: "assets/img/sushi/baigai.png", name: "バイ貝" },
    guests: [
      { blank: true },
      { name: "川島 隆之", yomi: "かわしま たかゆき", kana: "", side: "bride", category: "family", relation: "親族", note: "" },
      { name: "川島 敬子", yomi: "かわしま けいこ", kana: "", side: "bride", category: "family", relation: "叔母", note: "" },
      { name: "川島 悠呂", yomi: "かわしま ゆうろ", kana: "", side: "bride", category: "family", relation: "弟", note: "" },
      { name: "川島 茂", yomi: "かわしま しげる", kana: "", side: "bride", category: "family", relation: "叔父", note: "" },
      { name: "銘形 壽雅子", yomi: "めいがた すがこ", kana: "", side: "bride", category: "family", relation: "大叔母", note: "" },
      { name: "川島 満", yomi: "かわしま みつる", kana: "", side: "bride", category: "family", relation: "父", note: "" },
      { name: "川島 江里奈", yomi: "かわしま えりな", kana: "", side: "bride", category: "family", relation: "母", note: "" },
    ],
  },
];

// Menu de Mariage 2026/8/23 細川様・川島様
// en: コース区分（小さく上に表示）／ jp: 日本語の料理名（主）／ desc: フランス語名（副）
const MENU_FOOD = [
  { en: "Premier", jp: "本鮪　中トロのグリルと夏野菜のサラダ　生姜風味", desc: "Thon grillé salade á la japonaise" },
  { en: "Deuxième", jp: "フォアグラソテー　コンソメで煮込んだ大根と共に", desc: "Foie gras chaud mijoté radis japon" },
  { en: "Potage", jp: "じゃが芋とポワロー葱の冷製ポタージュ", desc: "Potage vichyssoise" },
  { en: "Poisson", jp: "オマール海老のポワレ　アメリケーヌソース", desc: "Homard cuire à la toi et moi" },
  { en: "Granité", jp: "お口直しの氷菓子", desc: "" },
  { en: "Viande", jp: "黒毛和牛フィレ肉　黒トリュフソース", desc: "Filet de bœuf « WAGYU » cuir sauce aux truffe noire" },
  { en: "Dessert", jp: "デザートブッフェ", desc: "Dessert Buffet" },
  { en: "Café ou Thé", jp: "コーヒー又は紅茶", desc: "" },
];

// ---------- Q&A ページ（お互いへの質問と回答） ----------
// 新郎新婦が決めた質問11個です（2026-07-22最終版に差し替え済み。質問の追加・削除OK）。
// groom / bride にお二人からの回答テキストを貼り付けてください。
// 空欄のあいだは「お楽しみに」のプレースホルダーが表示されます。
const QA_ITEMS = [
  { q: "好きなアーティストは？", groom: "アジカン、サカナクション、きのこ帝国", bride: "スキマスイッチ、秦基博、BUMP OF CHICKEN" },
  { q: "好きな芸能人は？", groom: "山田裕貴、森奈々", bride: "舘ひろし、西野七瀬" },
  { q: "第一印象は？", groom: "可愛い！スタイルいい！", bride: "笑顔が素敵なかわいい人だな" },
  { q: "現在の印象は？", groom: "誠実に人や物事に向き合う素敵な人！", bride: "おおらかで包容力があり寛大な人！" },
  { q: "お互いのことをなんて呼んでる？", groom: "日那ちゃん", bride: "直弥さん" },
  { q: "どんな夫婦になりたい？", groom: "年をとっても仲良しな夫婦", bride: "ほっこりほのぼのとした夫婦🌱" },
  { q: "最後の晩餐は何を食べたい？", groom: "お寿司", bride: "うなぎ！" },
  { q: "お互いの尊敬できるところは？", groom: "理路整然と考えて気持ちを言葉にするのが上手なところ", bride: "どんなトラブルも笑顔で対応できる度量の大きさ。頼りになる🫶🏻" },
  { q: "一番の思い出の場所は？", groom: "デルタウイング", bride: "宮古島の誕生日&前撮り旅行" },
  { q: "結婚してから見つけた良いところは？", groom: "気づいたら掃除をしてくれている！", bride: "家事炊事パーフェクト🥺✨" },
  { q: "プロポーズの思い出は？", groom: "ドタバタ！待ちきれず大の字で寝そべる日那ちゃんの姿", bride: "10ヶ月記念日のクリスマスデート！スキマスイッチのライブ当日で幸せ倍増😳🫶🏻🎄" },
];

// ランキング企画（お二人それぞれのTOP3。回答が届いたら差し替えてください）
const QA_RANKINGS = [
  { title: "ゲストの中で無人島に一緒に行くなら", groom: ["盛生", "父", "りょー"], bride: ["父ちゃん", "明柴先生", "夕歌さん"] },
  {
    groomTitle: "おすすめ温泉ランキング",
    groom: ["龍神温泉 元湯", "大澤温泉 野天風呂 山の家", "別府温泉 鶴の湯"],
    brideTitle: "おすすめマニアックポテチランキング",
    bride: ["The燻煙（湖池屋オンライン）", "マウイチップス ガーリックシュリンプ味（フラ印）", "じゃがボルダ 鰹と昆布のうまみだし味（Calbee×東京ばな奈）"],
  },
];

// ---------- ナビゲーションボタン（トップページ・各ページ下部・ハンバーガーメニュー共通） ----------
// replay: true のボタンはページ遷移ではなく、オープニング画面を再生する特別な動作をします。
// disabled: true のボタンは「準備中」のグレー表示になります（ラベルが決まったら差し替え）。
// en/jp はセクション見出し用。btn はメニュー選択ボタン＆ハンバーガーINDEX用（英語1行＋日本語）。
// icon … 2026-08-18 に新郎新婦からいただいたボタン画像（白フチを切り落として軽量化したもの）。
//        icon を消すと、その項目だけ以前の文字のボタン（en1 + jp）に戻ります。
const NAV_ITEMS = [
  { id: "groom", en: "Groom", jp: "新郎プロフィール", icon: "assets/img/nav/nav-groom.jpg?v=20260818a", btn: { en1: "Groom", jp: "新郎プロフィール" } },
  { id: "bride", en: "Bride", jp: "新婦プロフィール", icon: "assets/img/nav/nav-bride.jpg?v=20260818a", btn: { en1: "Bride", jp: "新婦プロフィール" } },
  { id: "menu", en: "Menu", jp: "お食事", icon: "assets/img/nav/nav-menu.jpg?v=20260818a", btn: { en1: "Menu", jp: "お食事" } },
  { id: "seating", en: "Seating", jp: "お座席", icon: "assets/img/nav/nav-seating.jpg?v=20260818a", btn: { en1: "Seating", jp: "席次表" } },
  { id: "our-history", en: "Memory", jp: "ふたりの思い出", icon: "assets/img/nav/nav-our-history.jpg?v=20260818a", btn: { en1: "Memory", jp: "ふたりの思い出" } },
  { id: "qa", en: "Q&amp;A", jp: "ふたりに質問", icon: "assets/img/nav/nav-qa.jpg?v=20260818a", btn: { en1: "Q&amp;A", jp: "ふたりに質問" } },
  { id: "map", en: "Map", jp: "グルメマップ", icon: "assets/img/nav/nav-map.jpg?v=20260818e", btn: { en1: "Map", jp: "グルメマップ" } },
  { id: "album", en: "Photo", jp: "アルバム", icon: "assets/img/nav/nav-album.jpg?v=20260818a", btn: { en1: "Photo", jp: "アルバム" } },
];

// ---------- アルバム（ジャンルごとに横へ送れる4つのまとまり） ----------
// 2026-08-11 構成変更: 「1枚ずつ並べる一覧＋グループのタイル」→
//   新郎プロフィール／ふたりの思い出と同じ「まとまりごとに横スライド」方式へ統一。
//
// 1つのまとまり = { title: "見出し", items: [ 写真… ] }
// items の1件は次のどちらでも書けます。
//   "assets/img/album/01.jpg"                              … 画像だけ（説明文なし）
//   { src: "…jpg", caption: "写真の下に出る一言" }          … 説明文つき
//   { src: "…mp4", type: "video" }                         … 動画
// 並び順＝表示順です。写真が増えたら配列に足すだけで反映されます。
const ALBUM_GROUPS = [
  {
    title: "色々な思い出",
    items: [
      { src: "assets/img/album/01.jpg", caption: "大阪 海遊館" },
      { src: "assets/img/album/02.jpg", caption: "愛知 大府みどり公園" },
      { src: "assets/img/album/03.jpg", caption: "砺波 チューリップ公園" },
      { src: "assets/img/album/04.jpg", caption: "愛知 スキマ聖地巡礼" },
      { src: "assets/img/album/05.jpg", caption: "長野 戸倉上山田温泉" },
      { src: "assets/img/album/06.jpg", caption: "石川 河北ひまわり畑" },
      { src: "assets/img/album/07.jpg", caption: "秋田 大曲花火大会" },
      { src: "assets/img/album/08.jpg", caption: "大阪 大阪関西万博" },
      { src: "assets/img/album/09.jpg", caption: "大阪 アクアポニックス" },
      { src: "assets/img/album/10.jpg", caption: "北海道 札幌の夜景" },
      { src: "assets/img/album/11.jpg", caption: "三重 なばなの里" },
      { src: "assets/img/album/12.jpg", caption: "長野 りんご狩り" },
      { src: "assets/img/album/13.jpg", caption: "長野 軽井沢高原教会" },
      { src: "assets/img/album/14.jpg", caption: "福井 東尋坊の梅の花" },
      { src: "assets/img/album/15.jpg", caption: "富山 河津桜" },
    ],
  },
  {
    title: "兼六園前撮り",
    items: [
      "assets/img/album/g16/01.jpg",
      "assets/img/album/g16/02.jpg",
      "assets/img/album/g16/03.jpg",
      "assets/img/album/g16/04.jpg",
      "assets/img/album/g16/05.jpg",
      "assets/img/album/g16/06.jpg",
      "assets/img/album/g16/07.jpg",
      "assets/img/album/g16/08.jpg",
      "assets/img/album/g16/09.jpg",
      "assets/img/album/g16/10.jpg",
      "assets/img/album/g16/11.jpg",
      "assets/img/album/g16/12.jpg",
      "assets/img/album/g16/13.jpg",
      "assets/img/album/g16/14.jpg",
    ],
  },
  {
    title: "宮古島前撮り",
    items: [
      "assets/img/album/g17/01.jpg",
      "assets/img/album/g17/02.jpg",
      "assets/img/album/g17/03.jpg",
      "assets/img/album/g17/04.jpg",
      "assets/img/album/g17/05.jpg",
      "assets/img/album/g17/06.jpg",
      "assets/img/album/g17/07.jpg",
      "assets/img/album/g17/08.jpg",
      "assets/img/album/g17/09.jpg",
      "assets/img/album/g17/10.jpg",
      "assets/img/album/g17/11.jpg",
      "assets/img/album/g17/12.jpg",
      "assets/img/album/g17/13.jpg",
      "assets/img/album/g17/14.jpg",
    ],
  },
  {
    title: "宮古島思い出",
    items: [
      "assets/img/album/g18/01.jpg",
      "assets/img/album/g18/02.jpg",
      "assets/img/album/g18/03.jpg",
      "assets/img/album/g18/04.jpg",
      "assets/img/album/g18/05.jpg",
      "assets/img/album/g18/06.jpg",
      "assets/img/album/g18/07.jpg",
      "assets/img/album/g18/08.jpg",
      // 2026-08-19: 動画2本（09.mp4 / 10.mp4）は掲載を取りやめ。
      // 載せ直す場合は下の2行を戻すだけでよい（ファイルは assets/img/album/g18/ に残してある）。
      // { src: "assets/img/album/g18/09.mp4", type: "video" },
      // { src: "assets/img/album/g18/10.mp4", type: "video" },
    ],
  },
];

// ---------- おすすめマップ（新郎新婦の思い出の場所） ----------
// タイトル下に表示する説明文（1要素＝1行）
const MAP_INTRO = [
  "新郎新婦がおすすめする富山のグルメマップです",
  "富山にお越しの際はぜひ行ってみてください！",
];

// address・gmap・web・instagram は 2026-08-18 に新郎新婦からいただいた情報。
// lat / lng は住所からの概算値です（ピンの位置は実機で1件ずつ確認してください）。
// gmap を設定してあるので、「Googleマップで開く →」は新郎新婦からいただいたリンクを開きます。
// desc は新郎新婦からいただいた紹介文。zoom はボタンを押したときの拡大率（数字が大きいほど拡大）。
// photos: 写真の掲載は 2026-08-18 に取りやめ。載せる方針に戻った場合は
//         { src: "assets/img/map/xxx.jpg", caption: "写真の説明" } の形で追加すれば表示されます。
// placeholder: true の項目は「準備中」のグレー枠になります（現在は使用していません）。
const MAP_SPOTS = [
  {
    no: 1,
    name: "だんらんや",
    lat: 36.668381, lng: 137.236572, zoom: 17, // 国土地理院「富山市太田81番地」。番地レベル
    address: "富山県富山市太田81-1（富山山室本店）",
    desc:
      "直弥さんのお気に入りが、今ではふたりの定番に🍴<br>" +
      "ふたりが出会う前から、毎月給料日に通っていたほど直弥さんが大好きなお店！イチオシは網焼きハンバーグ。今ではふたりでいちばんよく行く洋食屋さんです。",
    photos: [{ src: "assets/img/map/spot-01.jpg", caption: "だんらんや" }],
    gmap: "https://www.google.com/maps/search/?api=1&query=洋食だんらんや+富山山室本店",
    web: "https://www.danranya.co.jp/",
  },
  {
    no: 2,
    name: "ノマ",
    lat: 36.653679, lng: 137.22995, zoom: 17, // 国土地理院「富山市堀60番地」。番地レベル
    address: "富山県富山市堀60-4",
    desc:
      "何を選んでも大満足のランチ🍚<br>" +
      "メインから小鉢まで、どれもおいしくボリューム満点。おしゃれで居心地のいいお店です🌱 白ご飯を納豆そぼろ丼に変更するのがおすすめ！",
    photos: [{ src: "assets/img/map/spot-02.jpg", caption: "ノマ" }],
    gmap: "https://www.google.com/maps/search/?api=1&query=ノマ+富山市堀60-4",
    instagram: "https://www.instagram.com/noma_toyama_cafe/",
  },
  {
    no: 3,
    name: "中華そば つぼみ",
    lat: 36.715584, lng: 137.264175, zoom: 17, // 国土地理院「新庄北町18番24号」。番地レベル
    address: "富山県富山市新庄北町18-24 1F",
    desc:
      "行列のできる人気ラーメン店🍜<br>" +
      "おすすめは濃厚な鶏白湯！店主さんの細やかな気遣いも魅力です。味も接客も大満足で、並んででも食べたい、リピート間違いなしのお店！",
    photos: [{ src: "assets/img/map/spot-03.jpg", caption: "中華そば つぼみ" }],
    gmap: "https://www.google.com/maps/search/?api=1&query=中華そば+つぼみ+富山市新庄北町18-24",
    instagram: "https://www.instagram.com/tsubomi20180720/",
  },
  {
    no: 4,
    name: "Cafe MicT",
    lat: 36.697231, lng: 137.251312, zoom: 17, // 国土地理院「荒川二丁目24番15号」。番地レベル
    address: "富山県富山市荒川2-24-15",
    desc:
      "こだわりの一杯を楽しめるカフェ☕️<br>" +
      "木の温もりを感じる落ち着いた店内で、実力派バリスタが淹れるこだわりのコーヒーと、相性ぴったりのスイーツが楽しめます🌿",
    photos: [{ src: "assets/img/map/spot-04.jpg", caption: "Cafe MicT" }],
    gmap: "https://www.google.com/maps/search/?api=1&query=MicT+富山市荒川2-24-15",
    instagram: "https://www.instagram.com/mict_info/",
  },
  {
    no: 5,
    name: "ミチツムギ",
    lat: 36.7575, lng: 137.17951, zoom: 17, // OpenStreetMapに店舗の登録あり（正確）
    address: "富山県射水市本江1426",
    desc:
      "海を眺めながら食べる贅沢かき氷🍧<br>" +
      "自家製ソースと焼き菓子を組み合わせたかき氷が特徴！アサイーボウルや焼き菓子の販売もありますよ🍪 海沿いをお散歩するのもおすすめです🌱",
    photos: [{ src: "assets/img/map/spot-05.jpg", caption: "ミチツムギ" }],
    gmap: "https://www.google.com/maps/search/?api=1&query=氷と焼き菓子+ミチツムギ+射水市本江1426",
    instagram: "https://www.instagram.com/michitsumugi/",
  },
  {
    no: 6,
    name: "すしだるま",
    lat: 36.649006, lng: 137.213623, zoom: 17, // 国土地理院「二俣448番地」。番地レベル
    address: "富山県富山市二俣448-1",
    desc:
      "3回目のデートで訪れたお寿司屋さん🍣<br>" +
      "回転寿司ながら、ひと手間かけた本格的なお寿司が魅力。富山のおいしいお寿司を気軽に楽しみたい方におすすめです！",
    photos: [{ src: "assets/img/map/spot-06.jpg", caption: "すしだるま" }],
    gmap: "https://www.google.com/maps/search/?api=1&query=すしだるま+富山市二俣448-1",
    web: "https://sushidaruma.biz/",
  },
  {
    no: 7,
    name: "コメダ珈琲店 富山掛尾店",
    lat: 36.66164, lng: 137.21353, zoom: 17, // OpenStreetMapに店舗の登録あり（正確）
    address: "富山県富山市掛尾町26番1",
    desc:
      "ふたりが初めて出会った場所☕️<br>" +
      "初対面でモーニングをしながら3時間おしゃべり！初めましてとは思えないくらい、時間が経つのもあっという間でした🌱",
    photos: [{ src: "assets/img/map/spot-07.jpg?v=20260819a", caption: "コメダ珈琲店 富山掛尾店" }],
    gmap: "https://www.google.com/maps/search/?api=1&query=コメダ珈琲店+富山掛尾店",
  },
  {
    no: 8,
    name: "カーブ・ド・キキ",
    lat: 36.698845, lng: 137.213058, zoom: 17, // 国土地理院「桜町二丁目1番10号」。番地レベル
    address: "富山県富山市桜町2-1-10 山本ビル2F",
    desc:
      "ひなの“推しおじ”がいる、隠れ家的なワインバー🍷<br>" +
      "ちょっと珍しいワインや日本酒が楽しめます。マイペースで飾らないマスターの人柄も素敵！手作りのおいしいプレートも毎回のお楽しみです。",
    photos: [{ src: "assets/img/map/spot-08.jpg", caption: "カーブ・ド・キキ" }],
    gmap: "https://www.google.com/maps/search/?api=1&query=カーブ・ド・キキ+富山市桜町2-1-10",
  },
  {
    no: 9,
    name: "吟魚系列",
    lat: 36.699127, lng: 137.210617, zoom: 17, // 国土地理院「新富町二丁目1番3号」。番地レベル
    address: "富山県富山市新富町2-1-3（吟魚 本店）ほか市内に5店舗",
    desc:
      "富山で居酒屋に迷ったら、まずおすすめしたいお店🍶<br>" +
      "富山らしい料理や地酒が豊富で、刺身盛りも絶品！何を頼んでもおいしく、系列店が5店舗あるので予定に合わせて選びやすいのも魅力です。",
    photos: [{ src: "assets/img/map/spot-09.jpg", caption: "吟魚系列" }],
    gmap: "https://www.google.com/maps/search/?api=1&query=吟魚+富山市新富町2-1-3",
    instagram: "https://www.instagram.com/forza.gingyo/",
  },
];
