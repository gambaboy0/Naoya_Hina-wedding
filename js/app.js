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
    $("#splash-date").textContent = COUPLE.dateLabel;
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
      const inner =
        '<span class="nav-square-en">' + item.en + "</span>" +
        '<span class="nav-square-jp">' + item.jp + "</span>";
      if (item.disabled) {
        return '<div class="nav-square is-disabled">' + inner + "</div>";
      }
      if (item.replay) {
        return '<button type="button" class="nav-square" data-replay-splash>' + inner + "</button>";
      }
      return '<a href="#' + item.id + '" class="nav-square">' + inner + "</a>";
    }).join("");
  }

  function renderNavGrids() {
    const html = buildNavGridHtml();
    ["#nav-grid-top", "#nav-grid-profile", "#nav-grid-history", "#nav-grid-our-history", "#nav-grid-seating", "#nav-grid-menu", "#nav-grid-map"].forEach((sel) => {
      const el = $(sel);
      if (el) el.innerHTML = html;
    });
  }

  // ---------- index (hamburger panel; トップページのボタンと同一表記) ----------
  function renderIndexLists() {
    const items = NAV_ITEMS.map((item, i) => {
      const num = String(i + 1).padStart(2, "0");
      const inner =
        '<span class="idx-num">' + num + "</span>" +
        '<span class="idx-en">' + item.en + "</span>" +
        '<span class="idx-jp">' + item.jp + "</span>";
      if (item.disabled) {
        return '<li class="is-disabled"><span class="idx-row">' + inner + "</span></li>";
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
  function renderTimelineList(container, entries) {
    container.innerHTML = entries
      .map((entry) => {
        const photoHtml = entry.photo
          ? '<img class="timeline-photo" src="' + entry.photo + '" alt="' + entry.stage + '">'
          : '<div class="timeline-photo-placeholder">' + entry.stage + "のお写真</div>";
        return (
          '<div class="timeline-entry">' +
          photoHtml +
          '<p class="timeline-stage">' + entry.stage + "</p>" +
          '<p class="timeline-text">' + entry.text + "</p>" +
          "</div>"
        );
      })
      .join("");
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
  function openGuestModal(guest, tableId) {
    const body = $("#guest-modal-body");
    const relationText = sideLabel(guest.side) + (guest.relation ? "の" + guest.relation : "");
    body.innerHTML =
      '<p class="modal-eyebrow">GUEST</p>' +
      '<h3 class="modal-name">' + guest.name + "</h3>" +
      (guest.kana ? '<p class="modal-kana">' + guest.kana + "</p>" : "") +
      '<p class="modal-relation">' + relationText + "</p>" +
      '<p class="modal-table">お席：' + tableId + " テーブル</p>" +
      (guest.note
        ? '<div class="modal-note"><p class="modal-note-label">ひとこと</p><p class="modal-note-text">' + guest.note + "</p></div>"
        : "");

    $("#guest-modal").hidden = false;
    document.body.classList.add("modal-open");
  }

  // ---------- chart table block (共通描画: 属性検索の結果／全体座席図) ----------
  // guests配列は座席表画像の行順（左,右,左,右…）なので、
  // 偶数index→左列・奇数index→右列に分けると画像と同じ並びになる。
  function buildChartSeatHtml(table, gi) {
    const g = table.guests[gi];
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
      '<div class="chart-table-circle">' + table.id + "</div>" +
      '<div class="chart-col">' + right.join("") + "</div>" +
      "</div>"
    );
  }

  // ---------- guest finder (属性ボタン → ドロップダウン → 丸テーブル表示) ----------
  function populateGuestPicker(side, category) {
    const picker = $("#guest-picker");
    picker.innerHTML = '<option value="">お名前を選んでください</option>';
    TABLES.forEach((t) => {
      t.guests.forEach((g, gi) => {
        if (g.side === side && g.category === category) {
          const opt = document.createElement("option");
          opt.value = t.id + "::" + gi;
          opt.textContent = g.name;
          picker.appendChild(opt);
        }
      });
    });
    picker.disabled = false;
    $("#picked-table-result").innerHTML = "";
  }

  function showPickedTable(value) {
    const result = $("#picked-table-result");
    if (!value) {
      result.innerHTML = "";
      return;
    }
    const [tableId] = value.split("::");
    const table = TABLES.find((t) => t.id === tableId);
    if (!table) {
      result.innerHTML = "";
      return;
    }
    result.innerHTML = '<p class="picked-table-label">' + table.id + " テーブル</p>" + buildChartTableHtml(table);
  }

  function setupGuestFinder() {
    $$(".category-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".category-btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        populateGuestPicker(btn.dataset.side, btn.dataset.category);
      });
    });
    $("#guest-picker").addEventListener("change", (e) => showPickedTable(e.target.value));
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
    const grid = $("#map-spot-grid");
    if (!grid) return;
    grid.innerHTML = MAP_SPOTS.map(
      (s, i) =>
        '<button type="button" class="map-spot-btn" data-spot="' + i + '">' +
        '<span class="map-spot-no">' + s.no + "</span>" +
        '<span class="map-spot-name">' + s.name + "</span>" +
        "</button>"
    ).join("");
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
      '<p class="map-desc-text">' + s.desc + "</p>" +
      '<a class="map-desc-link" href="https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(s.gquery) +
      '" target="_blank" rel="noopener">Googleマップで開く →</a>';

    // 地図をその場所へなめらかにズームし、地図＋説明文が見える位置までスライド
    initToyamaMap();
    if (toyamaMap) {
      toyamaMap.invalidateSize();
      toyamaMap.flyTo([s.lat, s.lng], s.zoom, { duration: 2 });
    }
    $("#toyama-map").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- food ----------
  function renderFood() {
    const box = $("#food-list");
    box.innerHTML = "";
    MENU_FOOD.forEach((c) => {
      const row = document.createElement("div");
      row.className = "course-row-flat";
      row.innerHTML =
        '<p class="course-en">' + c.en + "</p>" +
        '<p class="course-jp">' + c.jp + "</p>" +
        (c.desc ? '<p class="course-desc">' + c.desc + "</p>" : "");
      box.appendChild(row);
    });
  }

  function closeAnyModal() {
    const el = $("#guest-modal");
    if (el && !el.hidden) el.hidden = true;
    document.body.classList.remove("modal-open");
  }

  // ---------- global event delegation ----------
  document.addEventListener("click", (e) => {
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
    const spotBtn = e.target.closest(".map-spot-btn");
    if (spotBtn) {
      selectMapSpot(Number(spotBtn.dataset.spot));
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
    setupGuestFinder();
    renderFullChart();
    renderMapSpots();
    renderFood();
    render();
    renderSplashMedia();
    startSlideshow();
    startSplashTimer();
  });
})();
