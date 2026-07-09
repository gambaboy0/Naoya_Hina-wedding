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
  dateLabel: "2026.8.23 SUN",
};

// ---------- オープニングページ（スプラッシュ）の背景 ----------
// video に "assets/video/opening.mp4" のようなパスを設定すると動画モードになります。
// 空欄の場合は photos の写真をクロスフェードで順番に表示します（後で差し替えOK）。
const OPENING = {
  video: "",
  photos: ["assets/img/top.jpg", "assets/img/kimono.jpg", "assets/img/menu-bg.jpg"],
  slideDurationMs: 3500,
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

// ---------- ナビゲーションボタン（トップページ・各ページ下部・ハンバーガーメニュー共通） ----------
// replay: true のボタンはページ遷移ではなく、オープニング画面を再生する特別な動作をします。
// disabled: true のボタンは「準備中」のグレー表示になります（ラベルが決まったら差し替え）。
const NAV_ITEMS = [
  { id: "profile", en: "Profile", jp: "プロフィール" },
  { id: "history", en: "Personal History", jp: "生い立ち" },
  { id: "our-history", en: "Our History", jp: "二人の道" },
  { id: "seating", en: "Seating", jp: "お座席" },
  { id: "menu", en: "Menu", jp: "お食事" },
  { id: "map", en: "Map", jp: "おすすめマップ" },
  { id: "", en: "Coming Soon", jp: "近日公開", disabled: true },
  { id: "top", en: "Top", jp: "トップページ", replay: true },
];

// ---------- おすすめマップ（新郎新婦の思い出の場所） ----------
// lat / lng / address は公開情報からの近似値です。特に居酒屋・バー・トンネルは
// 正確な場所・正式名称を新郎新婦に確認して差し替えてください（写真・テキスト依頼リスト.md参照）。
// desc は仮文です。zoom はボタンを押したときの拡大率（数字が大きいほど拡大）。
const MAP_SPOTS = [
  {
    no: 1,
    name: "居酒屋 いっこまっこ",
    lat: 36.6959, lng: 137.2137, zoom: 17,
    address: "富山県富山市（富山駅周辺）※要確認",
    desc: "新郎新婦が通った思い出の居酒屋です。（仮文）",
    gquery: "居酒屋 いっこまっこ 富山",
  },
  {
    no: 2,
    name: "居酒屋 吟魚系列",
    lat: 36.6905, lng: 137.2113, zoom: 17,
    address: "富山県富山市（中心部）※要確認",
    desc: "新鮮な富山の魚が楽しめる、二人お気に入りの居酒屋です。（仮文）",
    gquery: "居酒屋 吟魚 富山",
  },
  {
    no: 3,
    name: "バー カーブドキキ",
    lat: 36.6920, lng: 137.2140, zoom: 17,
    address: "富山県富山市（中心部）※要確認",
    desc: "二人がゆっくり語り合った思い出のバーです。（仮文）",
    gquery: "バー カーブドキキ 富山",
  },
  {
    no: 4,
    name: "コメダ珈琲店 掛尾店",
    lat: 36.6636, lng: 137.2274, zoom: 16,
    address: "富山県富山市掛尾町 ※要確認",
    desc: "休日の朝によく訪れた、くつろぎの喫茶店です。（仮文）",
    gquery: "コメダ珈琲店 掛尾店 富山",
  },
  {
    no: 5,
    name: "ホタルイカミュージアム",
    lat: 36.7724, lng: 137.3405, zoom: 15,
    address: "富山県滑川市中川原410",
    desc: "富山湾の神秘・ほたるいかに出会える博物館です。（仮文）",
    gquery: "ほたるいかミュージアム 滑川",
  },
  {
    no: 6,
    name: "立山 称名滝",
    lat: 36.5876, lng: 137.5054, zoom: 14,
    address: "富山県中新川郡立山町芦峅寺",
    desc: "落差日本一の大瀑布。二人で訪れた絶景スポットです。（仮文）",
    gquery: "称名滝 立山",
  },
  {
    no: 7,
    name: "富山きときと空港",
    lat: 36.6483, lng: 137.1875, zoom: 14,
    address: "富山県富山市秋ケ島30",
    desc: "旅の思い出が詰まった、富山の空の玄関口です。（仮文）",
    gquery: "富山きときと空港",
  },
  {
    no: 8,
    name: "石川と富山の間のトンネル",
    lat: 36.6595, lng: 136.8646, zoom: 14,
    address: "石川県・富山県境（倶利伽羅峠付近）※要確認",
    desc: "二人の行き来を繋いだ思い出のトンネルです。（仮文）",
    gquery: "倶利伽羅トンネル",
  },
  {
    no: 9,
    name: "富岩運河環水公園 遊覧船",
    lat: 36.7093, lng: 137.2136, zoom: 15,
    address: "富山県富山市湊入船町",
    desc: "世界一美しいスタバでも有名な、水辺の公園。遊覧船がおすすめです。（仮文）",
    gquery: "富岩運河環水公園",
  },
];
