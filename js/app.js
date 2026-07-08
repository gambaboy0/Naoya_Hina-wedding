(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const SIDE_LABEL = { groom: "新郎", bride: "新婦", both: "新郎新婦" };
  const sideLabel = (side) => SIDE_LABEL[side] || "";

  // ---------- splash ----------
  const SPLASH_DURATION_MS = 5000;
  const SPLASH_FADE_MS = 400;
  let splashTimerId = null;
  let splashStopped = false;

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
      $("#app").hidden = false;
      $("#index-toggle").hidden = false;
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
    window.scrollTo(0, 0);
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

  // ---------- couple info (title / splash / TOP / footer / venue) ----------
  function renderCoupleInfo() {
    const names = COUPLE.groomNameRomaji + " & " + COUPLE.brideNameRomaji;
    document.getElementById("page-title").textContent = names + " ご結婚式 | デジタル席次表";
    $("#splash-names").textContent = names;
    $("#splash-date").textContent = COUPLE.dateLabel;
    $("#footer-text").textContent = names + " Wedding · " + COUPLE.dateLabel.slice(0, 4);
    if (typeof VENUE !== "undefined") {
      $("#venue-info").textContent = VENUE.name + "　" + VENUE.address;
    }
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
      if (item.replay) {
        return '<button type="button" class="nav-square" data-replay-splash>' + inner + "</button>";
      }
      return '<a href="#' + item.id + '" class="nav-square">' + inner + "</a>";
    }).join("");
  }

  function renderNavGrids() {
    const html = buildNavGridHtml();
    ["#nav-grid-top", "#nav-grid-profile", "#nav-grid-history", "#nav-grid-our-history"].forEach((sel) => {
      const el = $(sel);
      if (el) el.innerHTML = html;
    });
  }

  // ---------- index (numbered anchor list, hamburger panel) ----------
  function renderIndexLists() {
    const items = SECTIONS.map((s, i) => {
      const num = String(i + 1).padStart(2, "0");
      return (
        '<li><a href="#' + s.id + '" data-index-link>' +
        '<span class="idx-num">' + num + "</span>" +
        '<span class="idx-en">' + s.en + "</span>" +
        "</a></li>"
      );
    }).join("");
    $("#index-list-panel").innerHTML = items;
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

  // ---------- venue grid + seating list ----------
  function renderVenue() {
    const grid = $("#venue-grid");
    grid.innerHTML = "";
    TABLES.forEach((t) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "venue-table";
      btn.textContent = t.id;
      btn.addEventListener("click", () => goToTable(t.id));
      grid.appendChild(btn);
    });
  }

  function goToTable(id) {
    const card = $("#table-" + id);
    if (!card) return;
    const body = card.querySelector(".table-card-body");
    if (body) body.hidden = false;
    window.setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  }

  function renderSeats() {
    const list = $("#tables-list");
    list.innerHTML = "";

    TABLES.forEach((t) => {
      const card = document.createElement("div");
      card.className = "table-card";
      card.id = "table-" + t.id;

      const header = document.createElement("button");
      header.type = "button";
      header.className = "table-card-header";
      header.innerHTML =
        '<span class="table-card-title">' + t.id + " テーブル</span>" +
        '<span class="table-count">' + t.guests.length + "名</span>";

      const body = document.createElement("div");
      body.className = "table-card-body";
      body.hidden = true;

      header.addEventListener("click", () => {
        body.hidden = !body.hidden;
      });

      t.guests.forEach((g) => {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "guest-row";
        row.innerHTML =
          '<span class="guest-name">' + g.name + "</span>" +
          '<span class="guest-relation">' + sideLabel(g.side) + "の" + g.relation + "</span>";
        row.addEventListener("click", (e) => {
          e.stopPropagation();
          openGuestModal(g, t.id);
        });
        body.appendChild(row);
      });

      card.appendChild(header);
      card.appendChild(body);
      list.appendChild(card);
    });

    setupSearch();
  }

  function setupSearch() {
    const input = $("#guest-search");
    const resultsBox = $("#search-results");
    const tablesList = $("#tables-list");
    if (!input) return;

    input.oninput = () => {
      const q = input.value.trim();
      if (!q) {
        resultsBox.hidden = true;
        tablesList.hidden = false;
        return;
      }
      const matches = [];
      TABLES.forEach((t) => {
        t.guests.forEach((g) => {
          if (g.name.includes(q) || (g.kana && g.kana.includes(q))) {
            matches.push({ guest: g, tableId: t.id });
          }
        });
      });

      tablesList.hidden = true;
      resultsBox.hidden = false;
      resultsBox.innerHTML = "";

      if (matches.length === 0) {
        const empty = document.createElement("p");
        empty.className = "search-empty";
        empty.textContent = "該当するお名前が見つかりませんでした";
        resultsBox.appendChild(empty);
        return;
      }

      matches.forEach((m) => {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "guest-row search-result-row";
        row.innerHTML =
          '<span class="guest-name">' + m.guest.name + "</span>" +
          '<span class="guest-table-badge">' + m.tableId + " テーブル</span>";
        row.addEventListener("click", () => openGuestModal(m.guest, m.tableId));
        resultsBox.appendChild(row);
      });
    };
  }

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
        '<p class="course-desc">' + c.desc + "</p>";
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
    renderProfile();
    renderHistory();
    renderOurHistory();
    renderVenue();
    renderSeats();
    renderFood();
    render();
    startSplashTimer();
  });
})();
