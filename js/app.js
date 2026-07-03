(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const SIDE_LABEL = { groom: "新郎", bride: "新婦", both: "新郎新婦" };
  const sideLabel = (side) => SIDE_LABEL[side] || "";

  // ---------- splash ----------
  const SPLASH_DURATION_MS = 3000;
  const SPLASH_FADE_MS = 400;
  let splashTimerId = null;

  function revealMain() {
    if (splashTimerId !== null) {
      window.clearTimeout(splashTimerId);
      splashTimerId = null;
    }
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
    splashTimerId = window.setTimeout(revealMain, SPLASH_DURATION_MS);
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

  // ---------- index (numbered anchor list) ----------
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
    $("#index-list-inline").innerHTML = items;
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

  // ---------- greeting ----------
  function renderGreeting() {
    const html = GREETING.lines
      .map((line) => (line === "" ? '<p class="greeting-gap"></p>' : "<p>" + line + "</p>"))
      .join("");
    $("#greeting-text").innerHTML = html;
    $("#greeting-names").textContent = COUPLE.groomName + "　" + COUPLE.brideName;
  }

  // ---------- profile ----------
  function renderProfilePerson(container, person) {
    const statsHtml = person.stats
      .map(
        (s) =>
          '<div class="profile-stat-row">' +
          '<span class="profile-stat-label">' + s.label + "</span>" +
          '<span class="profile-stat-value">' + s.value + "</span>" +
          "</div>"
      )
      .join("");
    container.innerHTML =
      '<p class="profile-role">' + person.role + "</p>" +
      '<h3 class="profile-name">' + person.nameRomaji + "</h3>" +
      '<div class="profile-stats">' + statsHtml + "</div>" +
      '<button type="button" class="btn-outline" data-message="' + person.role + '">MESSAGE</button>';
  }

  function renderProfile() {
    renderProfilePerson($("#profile-groom"), GROOM_PROFILE);
    renderProfilePerson($("#profile-bride"), BRIDE_PROFILE);
  }

  function openMessageModal(role) {
    const person = role === "GROOM" ? GROOM_PROFILE : BRIDE_PROFILE;
    $("#message-modal-body").innerHTML =
      '<p class="modal-eyebrow">MESSAGE FROM</p>' +
      '<h3 class="modal-name">' + person.name + "</h3>" +
      '<p class="modal-message-text">' + person.message + "</p>";
    $("#message-modal").hidden = false;
    document.body.classList.add("modal-open");
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
        '<span class="table-card-title">' + t.id + "番テーブル</span>" +
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
          '<span class="guest-table-badge">' + m.tableId + "番テーブル</span>";
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
      '<p class="modal-table">お席：' + tableId + "番テーブル</p>" +
      (guest.note
        ? '<div class="modal-note"><p class="modal-note-label">ひとこと</p><p class="modal-note-text">' + guest.note + "</p></div>"
        : "");

    $("#guest-modal").hidden = false;
    document.body.classList.add("modal-open");
  }

  // ---------- food / drink ----------
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

  function renderDrink() {
    const box = $("#drink-list");
    box.innerHTML =
      '<p class="drink-category">ALCOHOL</p>' +
      '<p class="drink-items">' + DRINK.alcohol.join(" / ") + "</p>" +
      '<p class="drink-category">NON ALCOHOL</p>' +
      '<p class="drink-items">' + DRINK.nonAlcohol.join(" / ") + "</p>";
  }

  // ---------- photo sharing ----------
  function renderPhotoShare() {
    $("#photo-message").innerHTML = PHOTO_SHARE.lines.map((l) => "<span>" + l + "</span>").join("<br>");
    const link = $("#photo-share-link");
    link.textContent = PHOTO_SHARE.buttonLabel;
    link.href = PHOTO_SHARE.url;
  }

  function closeAnyModal() {
    ["#guest-modal", "#message-modal"].forEach((sel) => {
      const el = $(sel);
      if (el && !el.hidden) el.hidden = true;
    });
    document.body.classList.remove("modal-open");
  }

  // ---------- global event delegation ----------
  document.addEventListener("click", (e) => {
    const skipBtn = e.target.closest("#splash-skip");
    if (skipBtn) {
      revealMain();
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
      return; // let the native anchor navigation handle scrolling
    }
    const closeIndexEl = e.target.closest("[data-close-index]");
    if (closeIndexEl) {
      closeIndexPanel();
      return;
    }
    const msgBtn = e.target.closest("[data-message]");
    if (msgBtn) {
      openMessageModal(msgBtn.dataset.message);
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

  window.addEventListener("DOMContentLoaded", () => {
    renderCoupleInfo();
    renderTopMessage();
    renderIndexLists();
    renderGreeting();
    renderProfile();
    renderVenue();
    renderSeats();
    renderFood();
    renderDrink();
    renderPhotoShare();
    startSplashTimer();
  });
})();
