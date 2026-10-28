/* SCRIPT.JS — rendu, formulaire adaptatif, pop-ups */
(function () {
  "use strict";

  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);

  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));

  const waLink = (text) =>
    `https://wa.me/${S.whatsappNumber}` +
    (text ? `?text=${encodeURIComponent(text)}` : "");

  const HELLO =
    "Bonjour Bambaa ! 👋🏾 Je visite ton site et j'aimerais discuter d'un projet.";

  const gmail =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(S.email)}`;

  /* Thème clair / sombre */
  const root = document.documentElement;
  const themeBtn = $("#theme");
  const meta = document.querySelector('meta[name="theme-color"]');

  function setTheme(t) {
    root.dataset.theme = t;
    themeBtn.textContent = t === "dark" ? "☀" : "☾";

    if (meta) {
      meta.content = t === "dark" ? "#0e1124" : "#f7f8fc";
    }
  }

  let saved = null;

  try {
    saved = localStorage.getItem("theme");
  } catch (e) {}

  setTheme(
    saved ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  themeBtn.onclick = () => {
    const t = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(t);

    try {
      localStorage.setItem("theme", t);
    } catch (e) {}
  };

  /* Liens communs */
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = waLink(HELLO);
  });

  $("#year").textContent = new Date().getFullYear();

  const ext = 'target="_blank" rel="noopener noreferrer"';

  $("#foot-links").innerHTML = [
    '<a href="#accueil">Accueil</a>',
    '<a href="#services">Services</a>',
    '<a href="#demande">Faire une demande</a>',
    '<a href="#contact">Contact</a>'
  ].join("");

  /* Services */
  const reqById = Object.fromEntries(S.requests.map((r) => [r.id, r]));

  $("#services-grid").innerHTML = S.services.map((s, i) => `
    <article class="card">
      <div class="ico" aria-hidden="true">${s.emoji}</div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>
      <div class="acts">
        <button class="btn ghost" data-service="${i}" type="button">Détails</button>
        <button class="btn primary" data-pick="${s.type}" type="button">Faire une demande</button>
      </div>
    </article>
  `).join("");

  /* Contact */
  function validProfile(url, hostname) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:" && parsed.hostname === hostname;
    } catch (e) {
      return false;
    }
  }

  function contactButton(iconId, label, url, style = "ghost") {
    return `
      <a class="btn ${style} contact-action" href="${esc(url)}" ${ext}>
        <svg class="i" aria-hidden="true">
          <use href="#${iconId}"></use>
        </svg>
        <span>${label}</span>
      </a>
    `;
  }

  const contactButtons = [
    contactButton("wa", "Me contacter sur WhatsApp", waLink(HELLO), "wa"),
    contactButton("gmail", "M'envoyer un e-mail", gmail, "primary"),
    validProfile(S.tiktok, "www.tiktok.com")
      ? contactButton("tiktok", "Me retrouver sur TikTok", S.tiktok)
      : "",
    validProfile(S.github, "github.com")
      ? contactButton("github", "Voir GitHub", S.github)
      : ""
  ].filter(Boolean);

  $("#contact-grid").innerHTML =
    `<div class="contact-actions">${contactButtons.join("")}</div>`;

  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = waLink(HELLO);
  });

  /* Fenêtres pop-up */
  const openDlg = (d) => {
    if (!d.open) d.showModal();
    requestAnimationFrame(() => d.focus({ preventScroll: true }));
  };

  const closeDlg = (d) => {
    if (!d.open) return;

    d.classList.add("closing");

    setTimeout(() => {
      d.classList.remove("closing");
      d.close();
    }, 180);
  };

  document.querySelectorAll("dialog").forEach((d) => {
    d.addEventListener("click", (e) => {
      if (e.target === d || e.target.closest("[data-close]")) {
        closeDlg(d);
      }
    });

    d.addEventListener("cancel", (e) => {
      e.preventDefault();
      closeDlg(d);
    });
  });

  const dl = $("#detail");

  document.addEventListener("click", (e) => {
    const sv = e.target.closest("[data-service]");
    const pk = e.target.closest("[data-pick]");

    if (sv) {
      e.preventDefault();
      e.stopPropagation();

      const s = S.services[Number(sv.dataset.service)];

      $("#d-badge").textContent = s.emoji;
      $("#d-title").textContent = s.title;
      $("#d-text").textContent = s.text;

      $("#d-list").innerHTML =
        s.items.map((x) => `<li>${esc(x)}</li>`).join("");

      $("#d-cta").onclick = () => {
        closeDlg(dl);
        pick(s.type);
      };

      openDlg(dl);
    }

    if (pk) {
      pick(pk.dataset.pick);
    }
  });

  /* Menu mobile */
  const menu = $("#menu");
  const burger = $("#burger");

  const closeMenu = () => {
    menu.classList.remove("open");
    burger.textContent = "☰";
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
  };

  burger.addEventListener("click", () => {
    const opened = menu.classList.toggle("open");

    burger.textContent = opened ? "✕" : "☰";
    burger.setAttribute("aria-expanded", String(opened));
    burger.setAttribute(
      "aria-label",
      opened ? "Fermer le menu" : "Ouvrir le menu"
    );
  });

  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  addEventListener("resize", () => {
    if (matchMedia("(min-width: 861px)").matches) closeMenu();
  });

  const links = [...menu.querySelectorAll("a")];

  const io = new IntersectionObserver((en) => {
    en.forEach((x) => {
      if (x.isIntersecting) {
        links.forEach((l) => {
          l.classList.toggle("on", l.hash === "#" + x.target.id);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  document.querySelectorAll("main section").forEach((s) => io.observe(s));

  addEventListener("scroll", () => {
    $("#nav").classList.toggle("scrolled", scrollY > 10);
  }, { passive: true });

  /* Bouton WhatsApp flottant */
  const fab = $("#fab");
  const hidden = new Set();

  const fio = new IntersectionObserver((en) => {
    en.forEach((x) => {
      if (x.isIntersecting) {
        hidden.add(x.target.id);
      } else {
        hidden.delete(x.target.id);
      }

      fab.classList.toggle("show", !hidden.size);
    });
  }, { threshold: 0.15 });

  ["accueil", "demande", "contact"].forEach((id) => {
    fio.observe($("#" + id));
  });

  /* Formulaire adaptatif */
  const f = $("#form");
  const step2 = $("#step2");
  const spec = $("#specific");
  const toast = $("#toast");

  const moyen = $("#moyen");
  const contact = $("#contact-info");
  const besoin = $("#besoin");

  const formFields = {
    nom: $("#nom"),
    moyen,
    contact,
    besoin,
    budget: $("#budget"),
    delai: $("#delai"),
    ref: $("#ref")
  };

  const common = [
    "nom", "moyen", "contact", "besoin", "budget", "delai", "ref"
  ];

  let current = null;
  let data = {};

  try {
    data = JSON.parse(sessionStorage.getItem("bambaa-draft") || "{}");
  } catch (e) {}

  const persist = () => {
    try {
      sessionStorage.setItem("bambaa-draft", JSON.stringify(data));
    } catch (e) {}
  };

  let tt;

  const say = (m) => {
    toast.textContent = m;
    toast.classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(() => toast.classList.remove("show"), 3200);
  };

  $("#choices").innerHTML = S.requests.map((r) => `
    <label class="choice">
      <input type="radio" name="service" value="${r.id}">
      <span><em aria-hidden="true">${r.emoji}</em>${esc(r.label)}</span>
    </label>
  `).join("");

  $("#choices").addEventListener("change", (e) => {
    if (e.target.name === "service") {
      pick(e.target.value, true);
    }
  });

  function renderSpecific() {
    const r = reqById[current];

    $("#besoin-label").innerHTML =
      esc(r.descLabel || "Description du besoin") + " <b>*</b>";

    besoin.placeholder =
      r.descPh ||
      "Explique ce que tu veux, même si tu ne sais pas comment le réaliser.";

    spec.innerHTML = r.fields.map((k) => {
      const d = S.fieldDefs[k];
      const id = "f_" + k;
      let val = data[k] || "";

      if (d.kind === "select") {
        const opts = (k === "domaine" ? r.domaine : d.options) || [];

        if (!opts.includes(val)) {
          data[k] = val = opts[0];
        }

        return `
          <div class="field">
            <label for="${id}">${esc(d.label)}</label>
            <select id="${id}" data-k="${k}">
              ${opts.map((o) => `
                <option${o === val ? " selected" : ""}>${esc(o)}</option>
              `).join("")}
            </select>
          </div>
        `;
      }

      const tag = d.kind === "area"
        ? `<textarea id="${id}" data-k="${k}" rows="3" maxlength="800" placeholder="${esc(d.ph || "")}">${esc(val)}</textarea>`
        : `<input id="${id}" data-k="${k}" type="text" maxlength="200" placeholder="${esc(d.ph || "")}" value="${esc(val)}">`;

      return `
        <div class="field">
          <label for="${id}">${esc(d.label)} <i>(facultatif)</i></label>
          ${tag}
        </div>
      `;
    }).join("");

    $("#chosen").textContent = r.label;
  }

  /* Choisir un service */
  function pick(id, fromRadio) {
    if (!reqById[id]) return;

    current = id;
    data.service = id;

    const radio = f.querySelector(
      `input[name=service][value="${id}"]`
    );

    radio.checked = true;

    setErr("service", "");

    const wasHidden = step2.hidden;
    step2.hidden = false;

    renderSpecific();
    persist();

    if (!fromRadio) {
      $("#demande").scrollIntoView({ behavior: "smooth" });
    } else if (wasHidden) {
      setTimeout(() => {
        step2.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }

    if (!fromRadio) {
      setTimeout(() => {
        if (!$("#nom").value) {
          $("#nom").focus({ preventScroll: true });
        }
      }, 700);
    }
  }

  /* Mémoriser les saisies */
  f.addEventListener("input", (e) => {
    const t = e.target;

    if (t.dataset.k) {
      data[t.dataset.k] = t.value;
    } else if (t === contact) {
      data.contact = t.value;
    } else if (common.includes(t.id)) {
      data[t.id] = t.value;
    }

    persist();
  });

  common.forEach((k) => {
    if (data[k] != null && formFields[k]) {
      formFields[k].value = data[k];
    }
  });

  besoin.dispatchEvent(new Event("input"));
  $("#count").textContent = besoin.value.length;

  function updateContactField() {
    const m = moyen.value;

    $("#contact-label").textContent =
      m === "E-mail"
        ? "Adresse e-mail"
        : m === "Téléphone"
          ? "Numéro de téléphone"
          : "Numéro WhatsApp";

    contact.type = m === "E-mail" ? "email" : "tel";
    contact.placeholder = m === "E-mail" ? "toi@exemple.com" : "+221 …";
    contact.autocomplete = m === "E-mail" ? "email" : "tel";
  }

  moyen.onchange = updateContactField;
  updateContactField();

  besoin.addEventListener("input", () => {
    $("#count").textContent = besoin.value.length;
  });

  const setErr = (id, msg) => {
    const el = $("#" + id);
    const er = $("#err-" + id);

    if (el) {
      el.classList.toggle("invalid", !!msg);
      el.setAttribute("aria-invalid", !!msg);
    }

    if (er) er.textContent = msg || "";

    return !msg;
  };

  ["nom", "besoin", "budget", "delai"].forEach((id) => {
    formFields[id].addEventListener("input", () => setErr(id, ""));
  });

  contact.addEventListener("input", () => setErr("contact", ""));

  const v = (id) => (formFields[id] || $("#" + id)).value.trim();

  /* Validation : budget et délai obligatoires */
  function validate() {
    let ok = setErr(
      "service",
      current ? "" : "Choisis d'abord un service."
    );

    if (!current) return false;

    ok = setErr(
      "nom",
      v("nom").length < 2 ? "Indique ton nom ou ton pseudo." : ""
    ) && ok;

    ok = setErr(
      "besoin",
      v("besoin").length < 10
        ? "Décris ton besoin en quelques mots (10 caractères minimum)."
        : ""
    ) && ok;

    ok = setErr(
      "budget",
      !v("budget")
        ? "Indique ton budget estimé (tu peux préciser une fourchette)."
        : ""
    ) && ok;

    ok = setErr(
      "delai",
      !v("delai")
        ? "Indique le délai dans lequel tu souhaites réaliser le projet."
        : ""
    ) && ok;

    const c = v("contact");
    let ce = "";

    if (c) {
      if (
        moyen.value === "E-mail" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c)
      ) {
        ce = "Cette adresse e-mail semble incorrecte.";
      }

      if (
        moyen.value !== "E-mail" &&
        !/^\+?[\d\s().-]{6,20}$/.test(c)
      ) {
        ce = "Ce numéro semble incorrect (ex : +221 77 000 00 00).";
      }
    } else if (moyen.value !== "WhatsApp") {
      ce = moyen.value === "E-mail"
        ? "Indique ton adresse e-mail."
        : "Indique ton numéro de téléphone.";
    }

    return setErr("contact", ce) && ok;
  }

  function buildMessage() {
    const r = reqById[current];

    const L = [
      "Bonjour Bambaa ! 👋🏾",
      "",
      "Je souhaite faire une demande.",
      "",
      `Service : ${r.label}`,
      `Nom : ${v("nom")}`,
      `${r.descLabel || "Description"} : ${v("besoin")}`
    ];

    const det = r.fields.map((k) => {
      const val = (data[k] || "").trim();
      return val ? `- ${S.fieldDefs[k].label} : ${val}` : "";
    }).filter(Boolean);

    if (det.length) L.push("Détails :", ...det);

    if (v("budget")) L.push(`Budget : ${v("budget")}`);
    if (v("delai")) L.push(`Délai : ${v("delai")}`);

    L.push(
      `Contact : ${moyen.value}` +
      (v("contact") ? ` (${v("contact")})` : "")
    );

    if (v("ref")) L.push(`Référence : ${v("ref")}`);

    L.push("", "Merci !");

    return L.join("\n");
  }

  f.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) {
      f.classList.remove("shake");
      void f.offsetWidth;
      f.classList.add("shake");

      say("Complète les champs signalés pour continuer.");

      const first = f.querySelector(".invalid");

      if (first) {
        first.focus();
      } else if (!current) {
        $("#choices").scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }

      return;
    }

    const msg = buildMessage();

    $("#c-preview").textContent = msg;
    $("#c-go").href = waLink(msg);

    openDlg($("#confirm"));
  });

  $("#c-go").addEventListener("click", () => {
    setTimeout(() => {
      closeDlg($("#confirm"));
      say("WhatsApp s'ouvre : vérifie le message puis appuie sur Envoyer.");
    }, 300);
  });

  $("#c-edit").addEventListener("click", () => {
    closeDlg($("#confirm"));

    setTimeout(() => {
      step2.scrollIntoView({ behavior: "smooth", block: "start" });
      $("#nom").focus({ preventScroll: true });
    }, 220);
  });

  /* Restaurer le brouillon après rechargement */
  if (data.service && reqById[data.service]) {
    current = data.service;

    f.querySelector(
      `input[name=service][value="${current}"]`
    ).checked = true;

    step2.hidden = false;
    renderSpecific();
  }
})();