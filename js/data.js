/*
 * ここに実際の情報を入力してください（サンプルデータです）。
 * side: "groom"（新郎側）/ "bride"（新婦側）/ "both"（ご両家共通）
 */

const COUPLE = {
  groomName: "直弥",
  groomNameRomaji: "Naoya",
  brideName: "日那",
  brideNameRomaji: "Hina",
  dateLabel: "2026.8.23 SUN",
};

const VENUE = {
  name: "NEEDs 富山 ヴィクトリアハウス",
  address: "富山県富山市新庄本町3丁目2-30",
};

// トップページ（写真の下）に表示するGreetingの文面。
// 配列の1要素が1段落、段落内の各文字列は改行して表示されます。
const TOP_MESSAGE = {
  paragraphs: [
    ["本日はご多用中にもかかわらず", "おあつまりいただきありがとうございます"],
    ["皆様にあたたかく見守られ", "今日の日を迎えられることを嬉しく思います"],
    ["日頃お世話になっております皆さまと", "楽しく過ごさせて頂ければ幸いに存じます"],
    ["心ばかりの披露パーティーですが", "皆さまと良い時間が過ごせることを楽しみにしております"],
  ],
};

// ---------- PROFILE ページ（写真＋定番情報7項目） ----------
// photo は "assets/img/profile/xxx.jpg" のように実際の写真を用意したら差し替えてください。
// 空のままにしておくと写真プレースホルダーが表示されます。
const GROOM_PROFILE = {
  role: "GROOM",
  name: "直弥",
  photo: "",
  stats: [
    { label: "BIRTHDAY", value: "1997.01.01" },
    { label: "BIRTHPLACE", value: "東京都" },
    { label: "BLOOD TYPE", value: "A" },
    { label: "MBTI", value: "INFJ" },
    { label: "HOBBY", value: "旅行" },
    { label: "SPECIALTY", value: "料理" },
    { label: "FAVORITE FOOD", value: "ラーメン" },
  ],
};

const BRIDE_PROFILE = {
  role: "BRIDE",
  name: "日那",
  photo: "",
  stats: [
    { label: "BIRTHDAY", value: "1998.05.20" },
    { label: "BIRTHPLACE", value: "神奈川県" },
    { label: "BLOOD TYPE", value: "O" },
    { label: "MBTI", value: "ENFJ" },
    { label: "HOBBY", value: "カフェ巡り" },
    { label: "SPECIALTY", value: "写真撮影" },
    { label: "FAVORITE FOOD", value: "スイーツ" },
  ],
};

// ---------- PERSONAL HISTORY ページ（生い立ちの時系列） ----------
// timelineの各itemは { stage, photo, text } の形です。
// photo は実際の写真を用意したら差し替えてください（空欄はプレースホルダー表示）。
const GROOM_HISTORY = {
  role: "GROOM",
  timeline: [
    { stage: "誕生時", photo: "", text: "○年○月○日、○○県にて元気な産声をあげました。" },
    { stage: "幼少期", photo: "", text: "好奇心旺盛で、いつも笑顔の絶えない子どもでした。" },
    { stage: "小学生", photo: "", text: "外で駆け回るのが大好きで、放課後は友達と毎日遊んでいました。" },
    { stage: "中学生", photo: "", text: "部活動に打ち込み、仲間と過ごす時間が何より楽しい時期でした。" },
    { stage: "高校生", photo: "", text: "勉強と部活の両立に励みながら、将来の夢を思い描いていました。" },
    { stage: "大学生", photo: "", text: "新しい出会いに恵まれ、様々なことに挑戦した4年間でした。" },
    { stage: "社会人", photo: "", text: "社会人として日々奮闘しながら、充実した毎日を送っています。" },
  ],
};

const BRIDE_HISTORY = {
  role: "BRIDE",
  timeline: [
    { stage: "誕生時", photo: "", text: "○年○月○日、○○県にて誕生しました。" },
    { stage: "幼少期", photo: "", text: "人見知りせず、誰とでもすぐ仲良くなる子どもでした。" },
    { stage: "小学生", photo: "", text: "習い事に励みながら、家族と過ごす時間を大切にしていました。" },
    { stage: "中学生", photo: "", text: "友人たちと笑い合いながら過ごした、かけがえのない時間でした。" },
    { stage: "高校生", photo: "", text: "多くの経験を通して、少しずつ自分の将来を考え始めました。" },
    { stage: "大学生", photo: "", text: "新しい環境で視野を広げ、多くの友人と出会いました。" },
    { stage: "社会人", photo: "", text: "仕事にやりがいを感じながら、日々前向きに過ごしています。" },
  ],
};

// ---------- OUR HISTORY ページ（お二人のストーリー） ----------
const OUR_HISTORY = [
  { stage: "出会い", photo: "", text: "共通の友人の紹介で出会いました。" },
  { stage: "交際スタート", photo: "", text: "自然と惹かれ合い、お付き合いが始まりました。" },
  { stage: "プロポーズ", photo: "", text: "忘れられない特別な一日に、プロポーズを受けました。" },
  { stage: "ご入籍", photo: "", text: "2026年4月22日、入籍しました。" },
  { stage: "結婚式", photo: "", text: "2026年8月23日、皆さまに見守られ結婚式を迎えます。" },
];

// 実際の座席表（会場管理ツールの画像）から書き起こしたデータです。
// ふりがな(kana)・ひとことメッセージ(note)は元データに無いため空欄にしています。
const TABLES = [
  {
    id: "1-1",
    guests: [
      { name: "福永 桃子", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "鈴木 脩斗", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "北出 智也", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "根岸 昂也", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "大島 一輝", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "布施 綾太", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "加藤 遼", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "澤井 恭助", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
    ],
  },
  {
    id: "1-2",
    guests: [
      { name: "渡辺 修平", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "大脇 盛夫", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "宮島 公志", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "山腰 航", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "澤野 拓哉", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "猿渡 蒼周", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
    ],
  },
  {
    id: "1-3",
    guests: [
      { name: "舟見 卓馬", kana: "", side: "bride", category: "friend", relation: "同僚", note: "" },
      { name: "田口 愛", kana: "", side: "bride", category: "friend", relation: "同僚", note: "" },
      { name: "島崎 平", kana: "", side: "bride", category: "friend", relation: "同僚", note: "" },
      { name: "高橋 夕歌", kana: "", side: "bride", category: "friend", relation: "同僚", note: "" },
      { name: "窪田 小雪", kana: "", side: "bride", category: "friend", relation: "同僚", note: "" },
      { name: "荒井 優里亜", kana: "", side: "bride", category: "friend", relation: "同僚", note: "" },
      { name: "幅崎 千晶", kana: "", side: "bride", category: "friend", relation: "同僚", note: "" },
      { name: "山田 恵梨香", kana: "", side: "bride", category: "friend", relation: "同僚", note: "" },
    ],
  },
  {
    id: "2-1",
    guests: [
      { name: "松田 堯之", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "植村 俊亮", kana: "", side: "groom", category: "friend", relation: "同僚", note: "" },
      { name: "長島 貴之", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "近田 理夫", kana: "", side: "groom", category: "friend", relation: "同僚", note: "" },
      { name: "西村 光夫", kana: "", side: "groom", category: "friend", relation: "同僚", note: "" },
      { name: "石田尾 樹", kana: "", side: "groom", category: "friend", relation: "同僚", note: "" },
    ],
  },
  {
    id: "2-2",
    guests: [
      { name: "黒川 恵里", kana: "", side: "bride", category: "friend", relation: "友人", note: "" },
      { name: "金尾 有花", kana: "", side: "bride", category: "friend", relation: "友人", note: "" },
      { name: "津田 奈菜子", kana: "", side: "bride", category: "friend", relation: "友人", note: "" },
      { name: "橋本 明日佳", kana: "", side: "bride", category: "friend", relation: "友人", note: "" },
      { name: "佐藤 百華", kana: "", side: "bride", category: "friend", relation: "友人", note: "" },
      { name: "片桐 行人", kana: "", side: "bride", category: "friend", relation: "友人", note: "" },
      { name: "明柴 聰史", kana: "", side: "bride", category: "friend", relation: "恩師", note: "" },
      { name: "伊井 信之助", kana: "", side: "bride", category: "friend", relation: "友人", note: "" },
    ],
  },
  {
    id: "3-1",
    guests: [
      { name: "竹澤 朋", kana: "", side: "groom", category: "family", relation: "義兄", note: "" },
      { name: "細川 和恵", kana: "", side: "groom", category: "family", relation: "伯母", note: "" },
      { name: "竹澤 侑希", kana: "", side: "groom", category: "family", relation: "姪", note: "" },
      { name: "細川 良清", kana: "", side: "groom", category: "family", relation: "伯父", note: "" },
      { name: "竹澤 眞美子", kana: "", side: "groom", category: "family", relation: "姉", note: "" },
      { name: "細川 満弘", kana: "", side: "groom", category: "family", relation: "伯父", note: "" },
      { name: "細川 眞紀子", kana: "", side: "groom", category: "family", relation: "母", note: "" },
      { name: "細川 優", kana: "", side: "groom", category: "family", relation: "父", note: "" },
    ],
  },
  {
    id: "3-2",
    guests: [
      { name: "細川 裕美", kana: "", side: "groom", category: "family", relation: "伯母", note: "" },
      { name: "細川 幸芳", kana: "", side: "groom", category: "family", relation: "伯父", note: "" },
      { name: "細川 紀子", kana: "", side: "groom", category: "family", relation: "伯母", note: "" },
      { name: "細川 公也", kana: "", side: "groom", category: "family", relation: "伯父", note: "" },
      { name: "細川 操", kana: "", side: "groom", category: "family", relation: "伯母", note: "" },
      { name: "細川 頼男", kana: "", side: "groom", category: "family", relation: "伯父", note: "" },
      { name: "東 真知子", kana: "", side: "groom", category: "family", relation: "叔母", note: "" },
      { name: "東 泰希", kana: "", side: "groom", category: "family", relation: "叔父", note: "" },
    ],
  },
  {
    id: "3-3",
    guests: [
      { name: "川島 隆之", kana: "", side: "bride", category: "family", relation: "親族", note: "" },
      { name: "川島 敏子", kana: "", side: "bride", category: "family", relation: "親族", note: "" },
      { name: "川島 敬子", kana: "", side: "bride", category: "family", relation: "叔母", note: "" },
      { name: "川島 悠呂", kana: "", side: "bride", category: "family", relation: "弟", note: "" },
      { name: "川島 茂", kana: "", side: "bride", category: "family", relation: "叔父", note: "" },
      { name: "銘形 寿賀子", kana: "", side: "bride", category: "family", relation: "大叔母", note: "" },
      { name: "川島 満", kana: "", side: "bride", category: "family", relation: "父", note: "" },
      { name: "川島 江里奈", kana: "", side: "bride", category: "family", relation: "母", note: "" },
    ],
  },
];

const MENU_FOOD = [
  { jp: "前菜", en: "Amuse-Bouche", desc: "季節野菜のテリーヌ 生ハム添え" },
  { jp: "スープ", en: "Potage", desc: "北海道産コーンの冷製スープ" },
  { jp: "お魚料理", en: "Poisson", desc: "真鯛のポワレ 白ワインソース" },
  { jp: "お肉料理", en: "Viande", desc: "国産牛フィレ肉のロースト" },
  { jp: "デザート", en: "Dessert", desc: "ウェディングケーキ＆季節のフルーツ" },
];

// ---------- ナビゲーションボタン（各ページ下部＋TOPページに共通表示） ----------
// replay: true のボタンはページ遷移ではなく、オープニング画面を再生する特別な動作をします。
const NAV_ITEMS = [
  { id: "profile", en: "Profile", jp: "プロフィール" },
  { id: "history", en: "Personal History", jp: "生い立ち" },
  { id: "our-history", en: "Our History", jp: "二人の道" },
  { id: "seating", en: "Seating", jp: "お座席" },
  { id: "menu", en: "Menu", jp: "お食事" },
  { id: "top", en: "Top", jp: "トップページ", replay: true },
];

// ---------- ハンバーガーメニュー（INDEXパネル）用 ----------
const SECTIONS = [
  { id: "profile", en: "PROFILE" },
  { id: "history", en: "PERSONAL HISTORY" },
  { id: "our-history", en: "OUR HISTORY" },
  { id: "seating", en: "SEATING LIST" },
  { id: "menu", en: "MENU" },
  { id: "top", en: "TOP" },
];
