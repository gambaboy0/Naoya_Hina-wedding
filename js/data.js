/*
 * ここに実際の情報を入力してください（サンプルデータです）。
 * side: "groom"（新郎側）/ "bride"（新婦側）/ "both"（ご両家共通）
 */

const COUPLE = {
  groomName: "太郎",
  brideName: "花子",
  familyName: "川島",
  dateLabel: "2026.11.15 SUN",
};

const GREETING = {
  lines: [
    "本日はご多用中にもかかわらず",
    "お集まりいただきありがとうございます",
    "",
    "皆様にあたたかく見守られ",
    "今日の日を迎えられることを嬉しく思います",
    "",
    "未熟なふたりですが手を取り合い",
    "共に歩んでゆきたいと思います",
    "",
    "これからも末永いお付き合いをお願いいたします",
    "どうぞ楽しいひとときをお過ごしください",
  ],
};

const GROOM_PROFILE = {
  role: "GROOM",
  name: "太郎",
  nameRomaji: "TARO",
  stats: [
    { label: "BIRTHDAY", value: "1997.01.01" },
    { label: "BIRTH PLACE", value: "東京都" },
    { label: "BLOOD TYPE", value: "A" },
    { label: "MBTI", value: "INFJ" },
  ],
  message:
    "本日は僕たちのためにお集まりいただき、本当にありがとうございます。" +
    "至らない点も多い二人ですが、これからも変わらぬお付き合いをよろしくお願いします。",
};

const BRIDE_PROFILE = {
  role: "BRIDE",
  name: "花子",
  nameRomaji: "HANAKO",
  stats: [
    { label: "BIRTHDAY", value: "1998.05.20" },
    { label: "BIRTH PLACE", value: "神奈川県" },
    { label: "BLOOD TYPE", value: "O" },
    { label: "MBTI", value: "ENFJ" },
  ],
  message:
    "遠方より、またお忙しい中お越しいただき感謝しております。" +
    "皆様のおかげで今日という日を迎えられました。楽しんでいってくださいね。",
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
      { name: "川島 誠", kana: "かわしま まこと", side: "groom", relation: "父方の叔父", note: "" },
      { name: "川島 文子", kana: "かわしま ふみこ", side: "groom", relation: "父方の叔母", note: "" },
      { name: "伊藤 大輔", kana: "いとう だいすけ", side: "groom", relation: "いとこ", note: "" },
    ],
  },
  {
    id: 4,
    guests: [
      { name: "山本 花", kana: "やまもと はな", side: "bride", relation: "学生時代の親友", note: "花子ちゃん、結婚おめでとう！" },
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
  { id: "greeting", en: "GREETING" },
  { id: "profile", en: "PROFILE" },
  { id: "seating", en: "SEATING LIST" },
  { id: "menu", en: "MENU" },
  { id: "drink", en: "DRINK" },
  { id: "photo", en: "PHOTO SHARING" },
];
