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

// timelineの各itemは { stage, photo, text } の形です。
// photo は "assets/img/profile/xxx.jpg" のように実際の写真を用意したら差し替えてください。
// 空のままにしておくと、その段に写真のプレースホルダーが表示されます。
const GROOM_PROFILE = {
  role: "GROOM",
  name: "直弥",
  nameRomaji: "NAOYA",
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

const BRIDE_PROFILE = {
  role: "BRIDE",
  name: "日那",
  nameRomaji: "HINA",
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

const TABLES = [
  {
    id: 1,
    guests: [
      { name: "山田 一郎", kana: "やまだ いちろう", side: "groom", relation: "学生時代の友人", note: "" },
      { name: "佐々木 隆", kana: "ささき たかし", side: "groom", relation: "会社の同期", note: "" },
      { name: "田中 真二", kana: "たなか しんじ", side: "groom", relation: "大学サークルの先輩", note: "本日は誠におめでとうございます。" },
      { name: "小林 舞", kana: "こばやし まい", side: "groom", relation: "会社の同僚", note: "" },
    ],
  },
  {
    id: 2,
    guests: [
      { name: "鈴木 一郎", kana: "すずき いちろう", side: "groom", relation: "幼馴染", note: "" },
      { name: "高橋 次郎", kana: "たかはし じろう", side: "groom", relation: "高校時代の友人", note: "" },
      { name: "中村 陽子", kana: "なかむら ようこ", side: "groom", relation: "従姉妹", note: "" },
      { name: "渡辺 健", kana: "わたなべ けん", side: "groom", relation: "会社の後輩", note: "" },
    ],
  },
  {
    id: 3,
    guests: [
      { name: "川島 誠", kana: "かわしま まこと", side: "bride", relation: "父方の叔父", note: "" },
      { name: "川島 文子", kana: "かわしま ふみこ", side: "bride", relation: "父方の叔母", note: "" },
      { name: "伊藤 大輔", kana: "いとう だいすけ", side: "groom", relation: "いとこ", note: "" },
    ],
  },
  {
    id: 4,
    guests: [
      { name: "山本 花", kana: "やまもと はな", side: "bride", relation: "学生時代の親友", note: "日那ちゃん、結婚おめでとう！" },
      { name: "加藤 美咲", kana: "かとう みさき", side: "bride", relation: "大学時代の友人", note: "" },
      { name: "吉田 恵", kana: "よしだ めぐみ", side: "bride", relation: "会社の同僚", note: "" },
      { name: "斎藤 直人", kana: "さいとう なおと", side: "bride", relation: "会社の上司", note: "" },
    ],
  },
  {
    id: 5,
    guests: [
      { name: "松本 里奈", kana: "まつもと りな", side: "bride", relation: "中学時代の友人", note: "" },
      { name: "井上 大輝", kana: "いのうえ だいき", side: "bride", relation: "サークルの先輩", note: "" },
      { name: "木村 沙織", kana: "きむら さおり", side: "bride", relation: "いとこ", note: "" },
      { name: "林 麻衣", kana: "はやし まい", side: "bride", relation: "会社の同期", note: "" },
    ],
  },
  {
    id: 6,
    guests: [
      { name: "清水 洋子", kana: "しみず ようこ", side: "bride", relation: "母方の叔母", note: "" },
      { name: "森田 隆", kana: "もりた たかし", side: "bride", relation: "父方の叔父", note: "" },
      { name: "橋本 由美", kana: "はしもと ゆみ", side: "both", relation: "ご両家共通のご友人", note: "お二人の出会いのきっかけです。" },
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

const DRINK = {
  alcohol: ["シャンパン", "ビール", "ハイボール", "赤ワイン", "白ワイン", "ウイスキー"],
  nonAlcohol: ["ノンアルコールビール", "オレンジジュース", "アップルジュース", "ウーロン茶", "アイスティー"],
};

const PHOTO_SHARE = {
  lines: ["本日撮影いただいたお写真を", "こちらよりシェアしてください"],
  buttonLabel: "SHARE",
  // 実際のGoogleフォト等の共有アルバムURLに差し替えてください
  url: "#",
};

const SECTIONS = [
  { id: "top", en: "TOP" },
  { id: "profile", en: "PROFILE" },
  { id: "seating", en: "SEATING LIST" },
  { id: "menu", en: "MENU" },
  { id: "drink", en: "DRINK" },
  { id: "photo", en: "PHOTO SHARING" },
];
