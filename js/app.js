(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const SIDE_LABEL = { groom: "新郎", bride: "新婦", both: "新郎新婦" };
  const sideLabel = (side) => SIDE_LABEL[side] || "";

  // ---------- splash ----------
  const SPLASH_FADE_MS = 400;
  let splashTimerId = null;
  let splashStopped = false;
  let slideTimerId = null;
  let openMenuOnTop = false; // 戻るボタンでトップに来たときメニュー選択画面を開くためのフラグ

  // スライド1巡分（3枚×3.5秒）＋余韻で自動遷移する
  const SPLASH_DURATION_MS = OPENING.video
    ? 8000
    : (OPENING.slideDurationMs || 3500) * Math.max(OPENING.photos.length, 1);

  // ---------- splash background (video or photo slideshow) ----------
  function renderSplashMedia() {
    const box = $("#splash-media");
    if (OPENING.video) {
      box.innerHTML =
        '<video class="splash-video" src="' + OPENING.video + '" autoplay muted loop playsinline></video>';
      return;
    }
    box.innerHTML = OPENING.photos
      .map(
        (src, i) =>
          '<div class="splash-slide' + (i === 0 ? " is-active" : "") +
          "\" style=\"background-image:url('" + src + "')\"></div>"
      )
      .join("");
  }

  function stopSlideshow() {
    if (slideTimerId !== null) {
      window.clearInterval(slideTimerId);
      slideTimerId = null;
    }
  }

  function startSlideshow() {
    stopSlideshow();
    if (OPENING.video) return;
    const slides = $$(".splash-slide");
    if (slides.length < 2) return;
    let idx = 0;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === 0));
    slideTimerId = window.setInterval(() => {
      idx = (idx + 1) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));
    }, OPENING.slideDurationMs || 3500);
  }

  function clearSplashTimer() {
    if (splashTimerId !== null) {
      window.clearTimeout(splashTimerId);
      splashTimerId = null;
    }
  }

  function revealMain() {
    clearSplashTimer();
    const splash = $("#splash");
    if (splash.hidden || splash.classList.contains("is-leaving")) return;
    splash.classList.add("is-leaving");
    window.setTimeout(() => {
      splash.hidden = true;
      stopSlideshow();
      $("#app").hidden = false;
      $("#index-toggle").hidden = parseHash() === "top";
    }, SPLASH_FADE_MS);
  }

  function startSplashTimer() {
    clearSplashTimer();
    if (splashStopped) return;
    splashTimerId = window.setTimeout(revealMain, SPLASH_DURATION_MS);
  }

  function toggleSplashStop() {
    splashStopped = !splashStopped;
    $("#splash-stop").classList.toggle("is-active", splashStopped);
    if (splashStopped) {
      clearSplashTimer();
    } else {
      startSplashTimer();
    }
  }

  function replaySplash() {
    splashStopped = false;
    $("#splash-stop").classList.remove("is-active");
    navigate("top");
    const splash = $("#splash");
    splash.classList.remove("is-leaving");
    splash.hidden = false;
    $("#index-toggle").hidden = true;
    $("#back-toggle").hidden = true;
    startSlideshow();
    startSplashTimer();
  }

  // ---------- page router ----------
  function parseHash() {
    return location.hash.replace(/^#/, "") || "top";
  }

  function showPage(page) {
    $$(".page").forEach((sec) => {
      sec.hidden = sec.dataset.page !== page;
    });
    $("#back-toggle").hidden = page === "top";
    // ハンバーガーメニューは詳細ページのみ表示（トップページ・スプラッシュ中は非表示）
    $("#index-toggle").hidden = !$("#splash").hidden || page === "top";
    window.scrollTo(0, 0);
    // Leafletはhidden中にサイズを取れないため、マップページ表示時に初期化する
    if (page === "map") {
      window.setTimeout(() => {
        initToyamaMap();
        if (toyamaMap) toyamaMap.invalidateSize();
      }, 60);
    }
    // トップに来たとき: 戻るボタン経由ならメニュー選択画面を、それ以外は挨拶文を表示
    if (page === "top") {
      if (openMenuOnTop) {
        openMenuOnTop = false;
        setTopMenuOpen(true);
      } else {
        resetTopMenu();
      }
    }
  }

  function navigate(page) {
    if (location.hash === "#" + page) {
      showPage(page);
    } else {
      location.hash = "#" + page;
    }
  }

  function render() {
    showPage(parseHash());
  }

  // ---------- couple info (title / splash / TOP / footer) ----------
  function renderCoupleInfo() {
    const names = COUPLE.groomNameRomaji + " & " + COUPLE.brideNameRomaji;
    document.getElementById("page-title").textContent = names + " ご結婚式 | デジタル席次表";
    $("#splash-names").textContent = names;
    $("#splash-date").textContent = COUPLE.dateDisplay || COUPLE.dateLabel;
    const tagline = $("#splash-tagline");
    if (tagline) {
      tagline.textContent = OPENING.tagline || "";
      tagline.hidden = !OPENING.tagline;
    }
    $("#footer-text").textContent = names + " Wedding · " + COUPLE.dateLabel.slice(0, 4);
  }

  // ---------- TOP message (greeting to guests) ----------
  function renderTopMessage() {
    $("#top-message").innerHTML = TOP_MESSAGE.paragraphs
      .map((lines) => "<p>" + lines.join("<br>") + "</p>")
      .join("");
  }

  // ---------- nav grids (TOP / PROFILE / PERSONAL HISTORY / OUR HISTORY 共通) ----------
  function buildNavGridHtml() {
    return NAV_ITEMS.map((item) => {
      const b = item.btn || { en1: item.en, en2: "", jp: item.jp };
      const inner =
        '<span class="nav-square-en">' + b.en1 + (b.en2 ? "<br>" + b.en2 : "") + "</span>" +
        '<span class="nav-square-jp">' + b.jp + "</span>";
      if (item.disabled) {
        return '<div class="nav-square is-disabled">' + inner + "</div>";
      }
      if (item.replay) {
        return '<button type="button" class="nav-square" data-replay-splash>' + inner + "</button>";
      }
      if (item.topGreeting) {
        return '<button type="button" class="nav-square" data-top-greeting>' + inner + "</button>";
      }
      return '<a href="#' + item.id + '" class="nav-square">' + inner + "</a>";
    }).join("");
  }

  function renderNavGrids() {
    const html = buildNavGridHtml();
    ["#nav-grid-top", "#nav-grid-groom", "#nav-grid-bride", "#nav-grid-our-history", "#nav-grid-seating", "#nav-grid-menu", "#nav-grid-qa", "#nav-grid-map", "#nav-grid-album"].forEach((sel) => {
      const el = $(sel);
      if (el) el.innerHTML = html;
    });
  }

  // ---------- index (hamburger panel; トップページのボタンと同一表記) ----------
  function renderIndexLists() {
    const items = NAV_ITEMS.map((item) => {
      const b = item.btn || { en1: item.en, jp: item.jp };
      const inner =
        '<span class="idx-en">' + b.en1 + "</span>" +
        '<span class="idx-jp">' + b.jp + "</span>";
      if (item.disabled) {
        return '<li class="is-disabled"><span class="idx-row">' + inner + "</span></li>";
      }
      if (item.topGreeting) {
        return '<li><button type="button" class="idx-row" data-index-link data-top-greeting>' + inner + "</button></li>";
      }
      return '<li><a href="#' + item.id + '" data-index-link>' + inner + "</a></li>";
    }).join("");
    $("#index-list-panel").innerHTML = items;
  }

  // ---------- section titles (トップページのボタンと同一表記に統一) ----------
  function renderSectionTitles() {
    $$("[data-title-for]").forEach((el) => {
      const item = NAV_ITEMS.find((n) => n.id === el.dataset.titleFor);
      if (item) {
        el.innerHTML =
          '<span class="section-title-en">' + item.en + "</span>" +
          '<span class="section-title-jp">' + item.jp + "</span>";
      }
    });
  }

  // ---------- index slide-in panel ----------
  function openIndexPanel() {
    $("#index-panel").hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeIndexPanel() {
    $("#index-panel").hidden = true;
    document.body.classList.remove("modal-open");
  }

  // ---------- shared timeline renderer (PERSONAL HISTORY / OUR HISTORY) ----------
  // 写真は photos（複数枚）または photo（1枚）のどちらでも書けます。
  // 複数枚のときは、左右の矢印とドットで順に見られるスライドになります。
  // 写真1枚は "パス" でも { src: "パス", pos: "bottom" } でも書けます。
  // pos は、写真が枠に収まりきらないときにどこを残すかの指定です。
  //   "top" = 上を残す ／ "bottom" = 下を残す ／ 未指定 = 中央
  // 例）集合写真で全員の顔が下寄りにあるときは pos: "bottom"
  function photoSrc(p) {
    return typeof p === "string" ? p : p.src;
  }

  function photoStyle(p) {
    if (typeof p === "string" || !p.pos) return "";
    return ' style="object-position: center ' + p.pos + ';"';
  }

  function buildPhotoBlock(entry, uid) {
    const list = entry.photos && entry.photos.length ? entry.photos : entry.photo ? [entry.photo] : [];

    if (!list.length) {
      return '<div class="timeline-photo-placeholder">' + entry.stage + "のお写真</div>";
    }
    if (list.length === 1) {
      return (
        '<img class="timeline-photo" src="' + photoSrc(list[0]) + '"' +
        photoStyle(list[0]) + ' alt="' + entry.stage + '">'
      );
    }

    const slides = list
      .map(
        (p, i) =>
          '<div class="ph-slide"><img src="' + photoSrc(p) + '"' + photoStyle(p) +
          ' alt="' + entry.stage + " " + (i + 1) + '枚目" loading="lazy"></div>'
      )
      .join("");

    const dots = list
      .map((_, i) => '<button class="ph-dot" type="button" data-go="' + i + '" aria-label="' + (i + 1) + '枚目"></button>')
      .join("");

    return (
      '<div class="photo-slider" data-slider="' + uid + '">' +
      '<div class="ph-track">' + slides + "</div>" +
      '<button class="ph-arrow ph-prev" type="button" aria-label="前の写真">‹</button>' +
      '<button class="ph-arrow ph-next" type="button" aria-label="次の写真">›</button>' +
      '<div class="ph-count"><span class="ph-cur">1</span> / ' + list.length + "</div>" +
      '<div class="ph-dots">' + dots + "</div>" +
      "</div>"
    );
  }

  function activateSliders(container) {
    container.querySelectorAll(".photo-slider").forEach((slider) => {
      const track = slider.querySelector(".ph-track");
      const dots = Array.from(slider.querySelectorAll(".ph-dot"));
      const cur = slider.querySelector(".ph-cur");
      const total = dots.length;
      // アルバムのように1枚ごとの説明文がある場合だけ、下の1行を差し替える
      const cap = slider.querySelector(".ph-caption");
      // アルバムの「小さい写真を1列に並べたもの」（ない場合は空配列）
      const thumbs = Array.from(slider.querySelectorAll(".ph-thumb"));

      // 各ページは最初 hidden の状態で組み立てられる。
      // その間は clientWidth が 0 になり、0で割ると NaN（「NaN / 2」表示）になるので保険をかける。
      const indexNow = () => {
        const w = track.clientWidth;
        if (!w) return 0;
        const i = Math.round(track.scrollLeft / w);
        return Number.isFinite(i) ? i : 0;
      };

      function sync() {
        const i = Math.min(Math.max(indexNow(), 0), total - 1);
        dots.forEach((d, n) => d.classList.toggle("is-on", n === i));
        cur.textContent = String(i + 1);
        slider.querySelector(".ph-prev").disabled = i === 0;
        slider.querySelector(".ph-next").disabled = i === total - 1;
        if (cap) {
          const slide = track.children[i];
          cap.textContent = slide ? slide.dataset.caption || "" : "";
        }
        thumbs.forEach((t, n) => t.classList.toggle("is-on", n === i));
      }

      function goTo(i) {
        const target = Math.min(Math.max(i, 0), total - 1);
        track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
      }

      track.addEventListener("scroll", () => {
        window.clearTimeout(track._t);
        track._t = window.setTimeout(sync, 80);
      });
      slider.querySelector(".ph-prev").addEventListener("click", () => goTo(indexNow() - 1));
      slider.querySelector(".ph-next").addEventListener("click", () => goTo(indexNow() + 1));
      dots.forEach((d) => d.addEventListener("click", () => goTo(Number(d.dataset.go))));
      thumbs.forEach((t) => t.addEventListener("click", () => goTo(Number(t.dataset.go))));

      sync();
    });
  }

  function renderTimelineList(container, entries) {
    container.innerHTML = entries
      .map((entry, i) => {
        return (
          '<div class="timeline-entry">' +
          buildPhotoBlock(entry, i) +
          '<p class="timeline-stage">' + entry.stage + "</p>" +
          '<p class="timeline-text">' + entry.text + "</p>" +
          "</div>"
        );
      })
      .join("");
    activateSliders(container);
  }

  function renderHistory() {
    renderTimelineList($("#history-groom-timeline"), GROOM_HISTORY.timeline);
    renderTimelineList($("#history-bride-timeline"), BRIDE_HISTORY.timeline);
  }

  function renderOurHistory() {
    renderTimelineList($("#our-history-timeline"), OUR_HISTORY);
  }

  // ---------- profile (photo + 7 facts) ----------
  function renderProfilePerson(prefix, person) {
    $("#profile-" + prefix + "-name").textContent = person.name;
    $("#profile-" + prefix + "-photo").innerHTML = person.photo
      ? '<img class="timeline-photo" src="' + person.photo + '" alt="' + person.name + '">'
      : '<div class="timeline-photo-placeholder">' + person.name + "のお写真</div>";
    $("#profile-" + prefix + "-stats").innerHTML = person.stats
      .map(
        (s) =>
          '<div class="profile-stat-row">' +
          '<span class="profile-stat-label">' + s.label + "</span>" +
          '<span class="profile-stat-value">' + s.value + "</span>" +
          "</div>"
      )
      .join("");
  }

  function renderProfile() {
    renderProfilePerson("groom", GROOM_PROFILE);
    renderProfilePerson("bride", BRIDE_PROFILE);
  }

  // ---------- seating ----------
  // 卓の目印（お寿司のアイコン）。sushi が未設定の卓は今までどおり卓番号を表示します。
  function tableMarkHtml(table) {
    return table && table.sushi
      ? '<img class="chart-sushi" src="' + table.sushi.img + '" alt="' + table.sushi.name + '">'
      : table
      ? table.id
      : "";
  }

  function openGuestModal(guest, tableId) {
    const body = $("#guest-modal-body");
    const relationText = sideLabel(guest.side) + (guest.relation ? "の" + guest.relation : "");
    const table = TABLES.find((t) => t.id === tableId);
    const seatHtml =
      table && table.sushi
        ? '<span class="modal-seat">' +
          '<img class="modal-seat-icon" src="' + table.sushi.img + '" alt="' + table.sushi.name + '">' +
          '<span class="modal-seat-name">' + table.sushi.name + "</span>" +
          "</span>"
        : "";
    body.innerHTML =
      '<p class="modal-eyebrow">GUEST</p>' +
      '<h3 class="modal-name">' + guest.name + "</h3>" +
      (guest.kana ? '<p class="modal-kana">' + guest.kana + "</p>" : "") +
      '<p class="modal-relation">' + relationText + seatHtml + "</p>" +
      (guest.note
        ? '<div class="modal-note"><p class="modal-note-label">ご紹介</p><p class="modal-note-text">' + guest.note + "</p></div>"
        : "");

    $("#guest-modal").hidden = false;
    document.body.classList.add("modal-open");
  }

  // ---------- chart table block (共通描画: 属性検索の結果／全体座席図) ----------
  // guests配列は座席表画像の行順（左,右,左,右…）なので、
  // 偶数index→左列・奇数index→右列に分けると画像と同じ並びになる。
  function buildChartSeatHtml(table, gi) {
    const g = table.guests[gi];
    if (g.blank) {
      return '<div class="chart-seat-blank" aria-hidden="true"></div>';
    }
    return (
      '<button type="button" class="chart-seat" data-table="' + table.id + '" data-gi="' + gi + '">' +
      '<span class="chart-seat-rel">' + sideLabel(g.side) + g.relation + "</span>" +
      '<span class="chart-seat-name">' + g.name + "様</span>" +
      "</button>"
    );
  }

  function buildChartTableHtml(table) {
    const left = [];
    const right = [];
    table.guests.forEach((g, gi) => {
      (gi % 2 === 0 ? left : right).push(buildChartSeatHtml(table, gi));
    });
    return (
      '<div class="chart-table">' +
      '<div class="chart-col">' + left.join("") + "</div>" +
      '<div class="chart-table-circle">' + tableMarkHtml(table) + "</div>" +
      '<div class="chart-col">' + right.join("") + "</div>" +
      "</div>"
    );
  }

  // ---------- 全体座席図（印刷席次表風の1枚レイアウト） ----------
  function renderFullChart() {
    const el = $("#full-chart");
    const coupleHtml =
      '<div class="chart-couple">' +
      '<span class="chart-couple-role">新郎</span><span class="chart-couple-name">' + COUPLE.groomFullName + "</span>" +
      '<span class="chart-couple-role">新婦</span><span class="chart-couple-name">' + COUPLE.brideFullName + "</span>" +
      "</div>";
    const rowsHtml = SEATING_ROWS.map((row) => {
      const tablesHtml = row
        .map((id) => {
          const table = TABLES.find((t) => t.id === id);
          return table ? buildChartTableHtml(table) : "";
        })
        .join("");
      return '<div class="chart-row">' + tablesHtml + "</div>";
    }).join("");
    el.innerHTML = coupleHtml + rowsHtml;
  }

  // ---------- recommended map (Leaflet + OpenStreetMap) ----------
  const TOYAMA_CENTER = [36.62, 137.25];
  const TOYAMA_ZOOM = 9;
  let toyamaMap = null;

  function initToyamaMap() {
    if (toyamaMap || typeof L === "undefined" || !$("#toyama-map")) return;
    toyamaMap = L.map("toyama-map", { scrollWheelZoom: false }).setView(TOYAMA_CENTER, TOYAMA_ZOOM);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(toyamaMap);
    MAP_SPOTS.forEach((s) => {
      if (s.placeholder || s.lat === undefined) return;
      const icon = L.divIcon({
        className: "spot-marker",
        html: "<span>" + s.no + "</span>",
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });
      L.marker([s.lat, s.lng], { icon })
        .addTo(toyamaMap)
        .bindPopup("<b>" + s.no + ". " + s.name + "</b>");
    });
  }

  function renderMapSpots() {
    const intro = $("#map-intro");
    if (intro) intro.innerHTML = MAP_INTRO.join("<br>");
    const grid = $("#map-spot-grid");
    if (!grid) return;
    grid.innerHTML = MAP_SPOTS.map((s, i) => {
      const inner =
        '<span class="map-spot-no">' + s.no + "</span>" +
        '<span class="map-spot-name">' + s.name + "</span>";
      if (s.placeholder) {
        return '<div class="map-spot-btn is-placeholder">' + inner + "</div>";
      }
      return '<button type="button" class="map-spot-btn" data-spot="' + i + '">' + inner + "</button>";
    }).join("");
  }

  // ふたりの写真サムネイル（写真が未登録の間はプレースホルダーを表示）
  function buildSpotPhotosHtml(spot, spotIndex) {
    const photos = spot.photos || [];
    if (photos.length === 0) {
      return (
        '<div class="map-desc-photos">' +
        [1, 2, 3]
          .map((n) => '<div class="map-photo-thumb map-photo-placeholder">お写真' + n + "</div>")
          .join("") +
        "</div>"
      );
    }
    return (
      '<div class="map-desc-photos">' +
      photos
        .map(
          (p, pi) =>
            '<button type="button" class="map-photo-thumb" data-spot-photo="' + spotIndex + "::" + pi + '">' +
            '<img src="' + p.src + '" alt="' + (p.caption || spot.name) + '">' +
            "</button>"
        )
        .join("") +
      "</div>"
    );
  }

  // ---------- album (ジャンルごとに横へ送るアルバム) ----------
  // 新郎プロフィール／ふたりの思い出と同じスライダーを使い、まとまりごとに1つ置く。
  // 写真をタップすると拡大表示（おすすめマップと同じ #photo-modal を使い回し）。
  // 動画はスライダーの中でそのまま再生できるので、拡大表示にはしない。
  function buildAlbumSlider(group, gi) {
    const list = group.items.map((it) => normalizePhoto(it, ""));
    // 1枚でも説明文があるまとまりだけ、写真の下に説明文の行を作る
    const hasCaption = list.some((p) => p.caption);

    const slides = list
      .map((p, i) => {
        const media =
          p.type === "video"
            ? '<video src="' + p.src + '" controls playsinline preload="metadata"></video>'
            : '<img src="' + p.src + '" alt="' + (p.caption || group.title) + '" loading="lazy">';
        // 画像だけタップで拡大（動画は再生ボタンを優先する）
        const tap = p.type === "video" ? "" : ' data-album-group-photo="' + gi + "::" + i + '"';
        return (
          '<div class="ph-slide" data-caption="' + (p.caption || "") + '"' + tap + ">" + media + "</div>"
        );
      })
      .join("");

    const dots = list
      .map((_, i) => '<button class="ph-dot" type="button" data-go="' + i + '" aria-label="' + (i + 1) + '枚目"></button>')
      .join("");

    // 全部の写真を小さく1列に並べたもの。タップするとその写真へ飛ぶ
    const thumbs = list
      .map((p, i) => {
        const inner =
          p.type === "video"
            ? '<span class="ph-thumb-video">▶</span>'
            : '<img src="' + p.src + '" alt="" loading="lazy">';
        return (
          '<button type="button" class="ph-thumb" data-go="' + i + '" aria-label="' + (i + 1) + '枚目へ">' +
          inner + "</button>"
        );
      })
      .join("");

    return (
      '<div class="photo-slider" data-slider="album' + gi + '">' +
      '<div class="ph-track">' + slides + "</div>" +
      '<button class="ph-arrow ph-prev" type="button" aria-label="前の写真">‹</button>' +
      '<button class="ph-arrow ph-next" type="button" aria-label="次の写真">›</button>' +
      '<div class="ph-count"><span class="ph-cur">1</span> / ' + list.length + "</div>" +
      // 小さい写真の列がドットの代わりになるので、ドットは隠す（枚数の計算には使う）
      '<div class="ph-dots is-off">' + dots + "</div>" +
      (hasCaption ? '<p class="ph-caption timeline-text"></p>' : "") +
      '<div class="ph-thumbs">' + thumbs + "</div>" +
      "</div>"
    );
  }

  function renderAlbum() {
    const el = $("#album-list");
    if (!el) return;
    if (typeof ALBUM_GROUPS === "undefined" || !ALBUM_GROUPS.length) {
      el.innerHTML = '<p class="album-empty">お写真を準備中です</p>';
      return;
    }
    el.innerHTML = ALBUM_GROUPS.map((g, gi) =>
      '<div class="timeline-entry">' +
      buildAlbumSlider(g, gi) +
      '<p class="timeline-stage">' + g.title + "</p>" +
      "</div>"
    ).join("");
    activateSliders(el);
  }

  function openAlbumGroupModal(groupIndex, photoIndex) {
    const g = ALBUM_GROUPS[groupIndex];
    if (!g) return;
    openPhotoList(g.items, photoIndex || 0, g.title);
  }

  // 拡大表示は「いま開いている写真の一覧」と「何枚目か」を覚えておき、
  // ◁ ▷ で同じ一覧の中を行き来する。アルバムとおすすめマップで共用。
  let modalPhotos = [];
  let modalIndex = 0;

  // 写真は "パス" でも { src, caption, type } でも書ける。type: "video" なら動画。
  function normalizePhoto(p, fallbackCaption) {
    if (typeof p === "string") return { src: p, caption: fallbackCaption || "", type: "image" };
    return { src: p.src, caption: p.caption || fallbackCaption || "", type: p.type || "image" };
  }

  function renderPhotoModalBody() {
    const p = modalPhotos[modalIndex];
    if (!p) return;
    const atFirst = modalIndex === 0;
    const atLast = modalIndex === modalPhotos.length - 1;
    const media =
      p.type === "video"
        ? '<video class="photo-modal-img" src="' + p.src + '" controls playsinline preload="metadata"></video>'
        : '<img class="photo-modal-img" src="' + p.src + '" alt="">';
    $("#photo-modal-body").innerHTML =
      media +
      (p.caption ? '<p class="photo-modal-caption">' + p.caption + "</p>" : "") +
      '<div class="photo-modal-nav">' +
      '<button type="button" class="pm-btn" data-photo-prev aria-label="前の写真"' +
      (atFirst ? " disabled" : "") + ">◁</button>" +
      '<button type="button" class="pm-btn pm-close" data-close aria-label="閉じる">×</button>' +
      '<button type="button" class="pm-btn" data-photo-next aria-label="次の写真"' +
      (atLast ? " disabled" : "") + ">▷</button>" +
      "</div>";
  }

  function openPhotoList(list, index, fallbackCaption) {
    if (!list || !list.length) return;
    modalPhotos = list.map((p) => normalizePhoto(p, fallbackCaption));
    modalIndex = Math.min(Math.max(index, 0), list.length - 1);
    renderPhotoModalBody();
    $("#photo-modal").hidden = false;
    document.body.classList.add("modal-open");
  }

  function stepPhoto(delta) {
    const next = modalIndex + delta;
    if (next < 0 || next >= modalPhotos.length) return;
    modalIndex = next;
    renderPhotoModalBody();
  }

  function openPhotoModal(spotIndex, photoIndex) {
    const spot = MAP_SPOTS[spotIndex];
    if (!spot || !spot.photos) return;
    // マップの写真はキャプション未設定のことがあるので、場所の名前で補う
    const list = spot.photos.map((ph) => ({ src: ph.src, caption: ph.caption || spot.name }));
    openPhotoList(list, photoIndex);
  }

  function selectMapSpot(index) {
    const s = MAP_SPOTS[index];
    if (!s) return;
    $$(".map-spot-btn").forEach((b, i) => b.classList.toggle("is-active", i === index));

    // 説明文を地図の下に表示
    const desc = $("#map-spot-desc");
    desc.hidden = false;
    desc.innerHTML =
      '<p class="map-desc-no">SPOT ' + s.no + "</p>" +
      '<h3 class="map-desc-name">' + s.name + "</h3>" +
      '<p class="map-desc-address">' + s.address + "</p>" +
      buildSpotPhotosHtml(s, index) +
      '<p class="map-desc-text">' + s.desc + "</p>" +
      '<div class="map-desc-links">' +
      '<a class="map-desc-link" href="' +
      (s.gmap || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(s.gquery)) +
      '" target="_blank" rel="noopener">Googleマップで開く →</a>' +
      (s.web ? '<a class="map-desc-link" href="' + s.web + '" target="_blank" rel="noopener">公式サイト →</a>' : "") +
      (s.instagram ? '<a class="map-desc-link" href="' + s.instagram + '" target="_blank" rel="noopener">Instagram →</a>' : "") +
      "</div>";

    // 地図をその場所へなめらかにズームし、地図＋説明文が見える位置までスライド
    initToyamaMap();
    if (toyamaMap) {
      toyamaMap.invalidateSize();
      toyamaMap.flyTo([s.lat, s.lng], s.zoom, { duration: 2 });
    }
    $("#toyama-map").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- food / drink ----------
  function renderCourseList(sel, items) {
    const box = $(sel);
    if (!box) return;
    box.innerHTML = "";
    items.forEach((c) => {
      const row = document.createElement("div");
      row.className = "course-row-flat";
      row.innerHTML =
        '<p class="course-en">' + c.en + "</p>" +
        '<p class="course-jp">' + c.jp + "</p>" +
        (c.desc ? '<p class="course-desc">' + c.desc + "</p>" : "");
      box.appendChild(row);
    });
  }

  function renderFood() {
    renderCourseList("#food-list", MENU_FOOD);
  }

  // ---------- Q&A (お互いへの質問と回答 + ランキング企画) ----------
  const QA_EMPTY_TEXT = "回答をお楽しみに";

  function buildQaAnswerHtml(role, name, text) {
    return (
      '<div class="qa-answer qa-answer-' + role + '">' +
      '<span class="qa-answer-name">' + name + "</span>" +
      '<span class="qa-answer-text' + (text ? "" : " is-empty") + '">' + (text || QA_EMPTY_TEXT) + "</span>" +
      "</div>"
    );
  }

  function renderQa() {
    const list = $("#qa-list");
    if (!list) return;
    list.innerHTML = QA_ITEMS.map((item, i) => {
      return (
        '<div class="qa-card">' +
        '<p class="qa-q-label">Q' + String(i + 1).padStart(2, "0") + "</p>" +
        '<p class="qa-question">' + item.q + "</p>" +
        buildQaAnswerHtml("groom", COUPLE.groomName, item.groom) +
        buildQaAnswerHtml("bride", COUPLE.brideName, item.bride) +
        "</div>"
      );
    }).join("");

    const buildRankColHtml = (role, name, answers) =>
      '<div class="qa-rank-col qa-answer-' + role + '">' +
      '<p class="qa-rank-name"><span class="qa-answer-name">' + name + "</span></p>" +
      answers
        .map(
          (v, i) =>
            '<p class="qa-rank-item' + (v ? "" : " is-empty") + '">' +
            '<span class="qa-rank-no">' + (i + 1) + "位</span>" +
            (v || "？？？") +
            "</p>"
        )
        .join("") +
      "</div>";

    $("#qa-rankings").innerHTML =
      '<h3 class="carousel-title">Ranking</h3>' +
      QA_RANKINGS.map((r) => {
        // title: 新郎新婦共通のお題（左右2列で表示）。
        // groomTitle/brideTitleがある場合は新郎新婦で別のお題なので、
        // 新郎のカード→新婦のカードの順に縦積みで別々に表示する。
        if (r.groomTitle || r.brideTitle) {
          return (
            '<div class="qa-card qa-rank-card">' +
            '<p class="qa-question">' + r.groomTitle + "</p>" +
            '<div class="qa-rank-cols qa-rank-cols-single">' + buildRankColHtml("groom", COUPLE.groomName, r.groom) + "</div>" +
            "</div>" +
            '<div class="qa-card qa-rank-card">' +
            '<p class="qa-question">' + r.brideTitle + "</p>" +
            '<div class="qa-rank-cols qa-rank-cols-single">' + buildRankColHtml("bride", COUPLE.brideName, r.bride) + "</div>" +
            "</div>"
          );
        }
        return (
          '<div class="qa-card qa-rank-card">' +
          '<p class="qa-question">' + r.title + "</p>" +
          '<div class="qa-rank-cols">' +
          buildRankColHtml("groom", COUPLE.groomName, r.groom) +
          buildRankColHtml("bride", COUPLE.brideName, r.bride) +
          "</div>" +
          "</div>"
        );
      }).join("");
  }

  function closeAnyModal() {
    ["#guest-modal", "#photo-modal"].forEach((sel) => {
      const el = $(sel);
      if (el && !el.hidden) el.hidden = true;
    });
    document.body.classList.remove("modal-open");
  }

  // ---------- top page: Menu toggle (挨拶文 ⇔ メニュー選択画面 を切替) ----------
  // メニュー選択画面ではヘッダー(Greeting・サブタイトル)とMENUボタンを隠す
  function setTopMenuOpen(open) {
    const hero = $(".top-hero-full");
    const box = $("#top-greeting-box");
    const nav = $("#nav-grid-top");
    const btn = $("#top-menu-toggle");
    if (!hero || !box || !nav || !btn) return;
    if (open) {
      hero.classList.add("is-menu-open");
      box.classList.add("is-faded");
      nav.hidden = false;
      nav.classList.add("is-faded");
      window.requestAnimationFrame(() => nav.classList.remove("is-faded"));
    } else {
      hero.classList.remove("is-menu-open");
      nav.classList.add("is-faded");
      box.classList.remove("is-faded");
      window.setTimeout(() => { nav.hidden = true; }, 400);
    }
    btn.dataset.open = open ? "1" : "";
  }

  function resetTopMenu() {
    const hero = $(".top-hero-full");
    const box = $("#top-greeting-box");
    const nav = $("#nav-grid-top");
    const btn = $("#top-menu-toggle");
    if (!hero || !box || !nav || !btn) return;
    hero.classList.remove("is-menu-open");
    box.classList.remove("is-faded");
    nav.classList.add("is-faded");
    nav.hidden = true;
    btn.dataset.open = "";
  }

  // ---------- global event delegation ----------
  document.addEventListener("click", (e) => {
    const menuToggle = e.target.closest("#top-menu-toggle");
    if (menuToggle) {
      setTopMenuOpen(menuToggle.dataset.open !== "1");
      return;
    }
    // メニュー選択画面 右下のBACKボタン: 挨拶文の画面に戻す
    const topBackBtn = e.target.closest("#top-menu-back");
    if (topBackBtn) {
      setTopMenuOpen(false);
      return;
    }
    // TopPageボタン/INDEX: トップページの挨拶文画面へ
    const topGreetingEl = e.target.closest("[data-top-greeting]");
    if (topGreetingEl) {
      closeIndexPanel();
      if (parseHash() === "top") {
        setTopMenuOpen(false);
      } else {
        openMenuOnTop = false;
        navigate("top");
      }
      return;
    }
    // 各ページ左上の戻るボタン: トップページのメニュー選択画面へ
    const backEl = e.target.closest("#back-toggle");
    if (backEl) {
      openMenuOnTop = true;
      navigate("top");
      return;
    }
    const skipBtn = e.target.closest("#splash-skip");
    if (skipBtn) {
      revealMain();
      return;
    }
    const stopBtn = e.target.closest("#splash-stop");
    if (stopBtn) {
      toggleSplashStop();
      return;
    }
    const replayBtn = e.target.closest("[data-replay-splash]");
    if (replayBtn) {
      replaySplash();
      return;
    }
    const navEl = e.target.closest("[data-nav]");
    if (navEl) {
      navigate(navEl.dataset.nav);
      return;
    }
    const indexToggle = e.target.closest("#index-toggle");
    if (indexToggle) {
      openIndexPanel();
      return;
    }
    const indexLink = e.target.closest("[data-index-link]");
    if (indexLink) {
      closeIndexPanel();
      return; // let the anchor's href trigger hashchange -> render()
    }
    const closeIndexEl = e.target.closest("[data-close-index]");
    if (closeIndexEl) {
      closeIndexPanel();
      return;
    }
    const closeEl = e.target.closest("[data-close]");
    if (closeEl) {
      closeAnyModal();
      return;
    }
    if (e.target.closest("[data-photo-prev]")) {
      stepPhoto(-1);
      return;
    }
    if (e.target.closest("[data-photo-next]")) {
      stepPhoto(1);
      return;
    }
    const groupPhoto = e.target.closest("[data-album-group-photo]");
    if (groupPhoto) {
      const parts = groupPhoto.dataset.albumGroupPhoto.split("::");
      openAlbumGroupModal(Number(parts[0]), Number(parts[1]));
      return;
    }
    const photoThumb = e.target.closest("[data-spot-photo]");
    if (photoThumb) {
      const parts = photoThumb.dataset.spotPhoto.split("::");
      openPhotoModal(Number(parts[0]), Number(parts[1]));
      return;
    }
    const spotBtn = e.target.closest(".map-spot-btn[data-spot]");
    if (spotBtn) {
      selectMapSpot(Number(spotBtn.dataset.spot));
      return;
    }
    const scrollTopBtn = e.target.closest("[data-scroll-top]");
    if (scrollTopBtn) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const seatBtn = e.target.closest(".chart-seat");
    if (seatBtn) {
      const table = TABLES.find((t) => t.id === seatBtn.dataset.table);
      if (table) {
        const guest = table.guests[Number(seatBtn.dataset.gi)];
        if (guest) openGuestModal(guest, table.id);
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAnyModal();
      closeIndexPanel();
    }
  });

  window.addEventListener("hashchange", render);

  window.addEventListener("DOMContentLoaded", () => {
    renderCoupleInfo();
    renderTopMessage();
    renderNavGrids();
    renderIndexLists();
    renderSectionTitles();
    renderProfile();
    renderHistory();
    renderOurHistory();
    renderFullChart();
    renderMapSpots();
    renderAlbum();
    renderFood();
    renderQa();
    render();
    renderSplashMedia();
    startSlideshow();
    startSplashTimer();
  });
})();
