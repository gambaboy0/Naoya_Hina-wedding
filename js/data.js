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
  slideDurationMs: 3000,
  // 手書き風の一言（空欄""にすると非表示になります）
  tagline: "今日という素晴らしい日に カンパイ!!",
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

// ---------- 新郎・新婦プロフィール（写真＋7項目） ----------
// 2026/7/9ミーティングで確定した内容です（特技は削除・仕事を追加）。
// photo は "assets/img/profile/xxx.jpg" のように実際の写真を用意したら差し替えてください。
// 空のままにしておくと写真プレースホルダーが表示されます。
const GROOM_PROFILE = {
  role: "GROOM",
  name: "直弥",
  photo: "",
  stats: [
    { label: "BIRTHDAY", value: "1994.3.27" },
    { label: "BIRTHPLACE", value: "岐阜県" },
    { label: "BLOOD TYPE", value: "B" }, // 二人とも同じ血液型とのこと
    { label: "MBTI", value: "INFP-A（仲介者）" }, // ※要再確認
    { label: "WORK", value: "株式会社不二越" },
    { label: "HOBBY", value: "ゴルフ キャンプ 旅行" },
    { label: "FAVORITE FOOD", value: "お寿司" },
  ],
};

const BRIDE_PROFILE = {
  role: "BRIDE",
  name: "日那",
  photo: "",
  stats: [
    { label: "BIRTHDAY", value: "1997.6.15" },
    { label: "BIRTHPLACE", value: "沖縄県" },
    { label: "BLOOD TYPE", value: "B" },
    { label: "MBTI", value: "ENTP-T（討論者）" },
    { label: "WORK", value: "社会福祉法人セーナー苑" },
    { label: "HOBBY", value: "旅行" },
    { label: "FAVORITE FOOD", value: "チーズ お肉 お魚 じゃがいも うなぎ お寿司" },
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
    { stage: "学生時代", photo: "", text: "外で駆け回るのが大好きな子ども時代を経て、部活動や新しい出会いに恵まれながら、学生生活を思いきり楽しみました。" },
    { stage: "社会人", photo: "", text: "社会人として日々奮闘しながら、充実した毎日を送っています。" },
  ],
};

const BRIDE_HISTORY = {
  role: "BRIDE",
  timeline: [
    { stage: "誕生時", photo: "", text: "○年○月○日、○○県にて誕生しました。" },
    { stage: "幼少期", photo: "", text: "人見知りせず、誰とでもすぐ仲良くなる子どもでした。" },
    { stage: "学生時代", photo: "", text: "習い事や友人との時間を大切にしながら、多くの出会いと経験を通して自分の将来を見つめる学生時代を過ごしました。" },
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
// note: ゲストの紹介文（全体座席図でお名前をタップすると表示されます）。
//       友人ゲスト全員分の紹介文がLINEで届いたらここに貼り付けてください。
// yomi は旧・座席検索機能用の読み仮名です（検索機能の廃止に伴い現在は未使用）。
const TABLES = [
  {
    id: "1-1",
    guests: [
      { name: "福永 桃子", yomi: "ふくなが ももこ", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "鈴木 脩斗", yomi: "すずき しゅうと", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "根岸 昂也", yomi: "ねぎし こうや", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "大島 一輝", yomi: "おおしま かずき", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "布施 綾太", yomi: "ふせ りょうた", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "加藤 遼", yomi: "かとう りょう", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "澤井 恭助", yomi: "さわい きょうすけ", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
    ],
  },
  {
    id: "1-2",
    guests: [
      { name: "渡辺 周平", yomi: "わたなべ しゅうへい", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "大脇 盛生", yomi: "おおわき もりお", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "宮島 公志", yomi: "みやじま こうじ", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "山腰 航", yomi: "やまこし わたる", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "澤野 拓哉", yomi: "さわの たくや", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "猿渡 蒼周", yomi: "さわたり そうしゅう", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
    ],
  },
  {
    id: "1-3",
    guests: [
      { name: "舟見 卓馬", yomi: "ふなみ たくま", kana: "", side: "bride", category: "friend", relation: "同僚", note: "周りの方一人ひとりを大切にする姿勢や考え方を尊敬しています。このプロフィールブックを作ってくれました！" },
      { name: "田口 愛", yomi: "たぐち あい", kana: "", side: "bride", category: "friend", relation: "同僚", note: "仕事だけでなく、メイクやスキンケア、素敵なお店など私の知らない世界をたくさん教えてくれる憧れの先輩。" },
      { name: "島崎 平", yomi: "しまざき たいら", kana: "", side: "bride", category: "friend", relation: "同僚", note: "細やかな気遣いとさりげないフォローで、部署が変わってもずっと気にかけてくださる心強い先輩。" },
      { name: "高橋 夕歌", yomi: "たかはし ゆうか", kana: "", side: "bride", category: "friend", relation: "同僚", note: "どんなことも楽しめる前向きな考え方が素敵な先輩。周りを自然と笑顔にしてくれる、私が目指したい理想の奥さんです。" },
      { name: "窪田 小雪", yomi: "くぼた こゆき", kana: "", side: "bride", category: "friend", relation: "同僚", note: "ふんわりにこにこ笑顔に癒やされる可愛い後輩。穏やかな雰囲気の中に芯があり、周りに流されない強さも魅力です。" },
      { name: "荒井 優里亜", yomi: "あらい ゆりあ", kana: "", side: "bride", category: "friend", relation: "同僚", note: "優しくて、思いやりとAudi愛にあふれた先輩。個性的な感性が魅力的で、いつもたくさん支えてもらっています。" },
      { name: "幅崎 千晶", yomi: "はばさき ちあき", kana: "", side: "bride", category: "friend", relation: "同僚", note: "誰に対しても忖度せず自分の考えを伝えられる方で、会うたびに綺麗になっていくかっこいい先輩。" },
      { name: "山田 恵梨香", yomi: "やまだ えりか", kana: "", side: "bride", category: "friend", relation: "同僚", note: "周りをよく見ていて、小さな変化にも気付けるしっかり者。どんな話も笑顔で聞いてくれるので、何でも話したくなります。" },
    ],
  },
  {
    id: "2-1",
    guests: [
      { name: "松田 堯之", yomi: "まつだ たかゆき", kana: "", side: "groom", category: "friend", relation: "友人", note: "" },
      { name: "植村 俊亮", yomi: "うえむら しゅんすけ", kana: "", side: "groom", category: "friend", relation: "同僚", note: "" },
      { name: "近田 理夫", yomi: "ちかだ みちお", kana: "", side: "groom", category: "friend", relation: "同僚", note: "" },
      { name: "西村 光生", yomi: "にしむら みつお", kana: "", side: "groom", category: "friend", relation: "同僚", note: "" },
      { name: "石田尾 樹", yomi: "いしだお いつき", kana: "", side: "groom", category: "friend", relation: "同僚", note: "" },
    ],
  },
  {
    id: "2-2",
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
    guests: [
      { name: "竹澤 朋", yomi: "たけざわ とも", kana: "", side: "groom", category: "family", relation: "義兄", note: "" },
      { name: "細川 満弘", yomi: "ほそかわ みつひろ", kana: "", side: "groom", category: "family", relation: "伯父", note: "" },
      { name: "竹澤 侑希", yomi: "たけざわ ゆうき", kana: "", side: "groom", category: "family", relation: "姪", note: "" },
      { name: "細川 頼男", yomi: "ほそかわ よりお", kana: "", side: "groom", category: "family", relation: "伯父", note: "" },
      { name: "竹澤 眞美子", yomi: "たけざわ まみこ", kana: "", side: "groom", category: "family", relation: "姉", note: "" },
      { name: "細川 操", yomi: "ほそかわ みさお", kana: "", side: "groom", category: "family", relation: "伯母", note: "" },
      { name: "細川 眞紀子", yomi: "ほそかわ まきこ", kana: "", side: "groom", category: "family", relation: "母", note: "" },
      { name: "細川 優", yomi: "ほそかわ まさる", kana: "", side: "groom", category: "family", relation: "父", note: "" },
    ],
  },
  {
    id: "3-2",
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
    guests: [
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
// 2026/7/9ミーティングで挙がった質問候補10個です（質問の追加・削除OK）。
// groom / bride にお二人からの回答テキストを貼り付けてください。
// 空欄のあいだは「お楽しみに」のプレースホルダーが表示されます。
const QA_ITEMS = [
  { q: "好きなアーティストは？", groom: "アジカン、サカナクション、きのこ帝国", bride: "スキマスイッチ、秦基博、BUMP OF CHICKEN" },
  { q: "好きな芸能人は？", groom: "山田裕貴、森奈々", bride: "舘ひろし、西野七瀬" },
  { q: "相手の第一印象は？", groom: "可愛い！スタイルいい！", bride: "笑顔が素敵なかわいい人だな" },
  { q: "相手の今の印象は？", groom: "誠実に人や物事に向き合う素敵な人！", bride: "おおらかで包容力があり寛大な人！" },
  { q: "お互いをなんて呼んでいる？", groom: "日那ちゃん", bride: "直弥さん" },
  { q: "地球最後の日に何をする？", groom: "", bride: "" },
  { q: "最後の晩餐は何がいい？", groom: "お寿司", bride: "うなぎ！" },
  { q: "結婚してから見つけた相手のいいところは？", groom: "気づいたら掃除をしてくれている！", bride: "家事炊事パーフェクト🥺✨" },
  { q: "来世で相手を見つける方法は？", groom: "", bride: "" },
  { q: "一番の思い出の場所は？", groom: "デルタウイング", bride: "宮古島の誕生日&前撮り旅行" },
];

// ランキング企画（お二人それぞれのTOP3。回答が届いたら差し替えてください）
const QA_RANKINGS = [
  { title: "ゲストの中で無人島に一緒に行くなら", groom: ["盛生", "父", "りょー"], bride: ["父ちゃん", "明柴先生", "夕歌さん"] },
  {
    groomTitle: "おすすめ温泉ランキング",
    groom: ["龍神温泉 元湯", "大澤温泉 野天風呂 山の家", "別府温泉 鶴の湯"],
    brideTitle: "おすすめマニアックポテチ",
    bride: ["The燻煙（湖池屋オンライン）", "マウイチップス ガーリックシュリンプ味（フラ印）", "じゃがボルダ 鰹と昆布のうまみだし味（Calbee×東京ばな奈）"],
  },
];

// ---------- ナビゲーションボタン（トップページ・各ページ下部・ハンバーガーメニュー共通） ----------
// replay: true のボタンはページ遷移ではなく、オープニング画面を再生する特別な動作をします。
// disabled: true のボタンは「準備中」のグレー表示になります（ラベルが決まったら差し替え）。
const NAV_ITEMS = [
  { id: "groom", en: "Groom", jp: "新郎プロフィール" },
  { id: "bride", en: "Bride", jp: "新婦プロフィール" },
  { id: "our-history", en: "Our History", jp: "二人の道" },
  { id: "seating", en: "Seating", jp: "お座席" },
  { id: "menu", en: "Menu", jp: "お食事" },
  { id: "qa", en: "Q&amp;A", jp: "ふたりに質問" },
  { id: "map", en: "Map", jp: "おすすめマップ" },
  { id: "top", en: "Top", jp: "トップページ", replay: true },
];

// ---------- おすすめマップ（新郎新婦の思い出の場所） ----------
// タイトル下に表示する説明文（1要素＝1行）
const MAP_INTRO = [
  "ふたりが実際に訪れた 思い出のおすすめスポットをご紹介します",
  "富山にお越しの際は ぜひ立ち寄ってみてください",
];

// lat / lng / address は公開情報からの近似値です。特に居酒屋・バー・トンネルは
// 正確な場所・正式名称を新郎新婦に確認して差し替えてください（写真・テキスト依頼リスト.md参照）。
// desc は仮文です。zoom はボタンを押したときの拡大率（数字が大きいほど拡大）。
// photos: ふたりの写真を { src: "assets/img/map/xxx.jpg", caption: "写真の説明" } の形で
//         複数枚追加できます（小さく並び、タップで拡大表示されます）。
// web / instagram: お店の公式サイトやInstagramのURLを設定すると説明カードにリンクが表示されます。
//         例: web: "https://example.com", instagram: "https://www.instagram.com/xxx/"
// gmap: GoogleマップのリンクURLを直接設定できます（新郎新婦から共有されたリンクをそのまま貼り付け）。
//       未設定の場合は gquery の検索クエリでGoogleマップを開きます。
// placeholder: true の項目は「準備中」のグレー枠になります（場所が決まったら差し替え）。
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
  { no: 10, name: "準備中", placeholder: true },
  { no: 11, name: "準備中", placeholder: true },
  { no: 12, name: "準備中", placeholder: true },
];
