(function () {
  "use strict";

  // Mark that JS is running. CSS keys the hidden/animated state off `html.js`,
  // so with JS OFF (or if this file fails to load) EVERYTHING stays visible.
  // This is the first line of defence against the "ghost" bug: no element is
  // ever hidden unless JS is present to reveal it again.
  document.documentElement.classList.add("js");

  var brand = window.__BRAND__ || {};
  var reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // -------------------------------------------------------------------------
  // i18n dictionaries — INLINED here (not a separate file) so the translator
  // can never break because a second file was missed on deploy or cached out.
  // Catalan is the HTML default; only the Castilian strings live here. Real
  // customer review quotes and names are intentionally NOT translated — they
  // stay verbatim as written on Google, in both language views.
  // -------------------------------------------------------------------------
  window.__I18N__ = {
    es: {
      "skip": "Ir al contenido",
      "nav.serveis": "Servicios", "nav.perque": "Por qué MAP", "nav.ressenyes": "Reseñas",
      "nav.contacte": "Contacto", "nav.callMobile": "Llama ahora · 670 85 80 99",
      "hero.eyebrow": "Fontanero en Lleida",
      "hero.h1": "Tu fontanero de <em>confianza</em> en Lleida",
      "hero.sub": "Reparación de averías, instalaciones, desatascos y cambio de grifos y sanitarios. Trabajo limpio, rápido y con presupuesto claro antes de empezar.",
      "hero.btnCall": "Llama ahora", "hero.btnWa": "Escríbenos por WhatsApp",
      "hero.badgeRating": "5,0 · 15 reseñas en Google",
      "hero.stat1": "Valoración perfecta", "hero.stat2": "Reseñas en Google", "hero.stat3": "Servicio local",
      "common.photoSoon": "Foto próximamente",
      "serveis.eyebrow": "Servicios",
      "serveis.h2": "Todo lo que necesita <em>tu hogar</em>",
      "serveis.sub": "Del pequeño goteo a la instalación completa. Si tiene que ver con el agua, nos ocupamos.",
      "serveis.s1.t": "Reparación de averías y fugas",
      "serveis.s1.d": "Localizamos y solucionamos fugas, goteos y averías con rapidez, evitando daños mayores.",
      "serveis.s2.t": "Instalaciones de fontanería",
      "serveis.s2.d": "Nuevas instalaciones y reformas de tuberías de agua para viviendas y locales.",
      "serveis.s3.t": "Desatascos",
      "serveis.s3.d": "Desatascamos desagües, tuberías y bajantes con los medios adecuados para cada caso.",
      "serveis.s4.t": "Grifos, sanitarios y tuberías",
      "serveis.s4.d": "Sustitución y montaje de grifos, inodoros, lavabos, duchas y tramos de tubería.",
      "serveis.s5.t": "Instalación de electrodomésticos",
      "serveis.s5.d": "Conexión de lavadoras, lavavajillas y otros electrodomésticos a la red de agua.",
      "serveis.s6.t": "Presupuesto sin compromiso",
      "serveis.s6.d": "Te explicamos el precio antes de empezar. Sin sorpresas en la factura final.",
      "why.eyebrow": "Por qué MAP", "why.h2": "Motivos para confiar",
      "why.figure": "Fontanería<br>Instalaciones <strong>MAP</strong>",
      "why.1.t": "Valoración perfecta 5,0 en Google",
      "why.1.d": "15 clientes, 15 valoraciones de 5 estrellas. Una reputación que se gana trabajo a trabajo.",
      "why.2.t": "Presupuesto claro antes de empezar",
      "why.2.d": "Sabes lo que pagarás desde el primer momento, sin sorpresas en la factura.",
      "why.3.t": "Trabajo rápido y limpio",
      "why.3.d": "Resolvemos la avería con agilidad y dejamos el espacio tal como estaba.",
      "why.4.t": "Trato directo con el profesional",
      "why.4.d": "Hablas con quien hace el trabajo. Sin intermediarios ni centralitas.",
      "reviews.eyebrow": "Reseñas",
      "reviews.h2": "15 valoraciones, <em>todas de 5 estrellas</em>",
      "reviews.sub": "Opiniones reales de clientes en Google. Incluso empresas de Lleida confían.",
      "reviews.note": "Un negocio de Lleida que también confía.",
      "reviews.more": "Y 3 valoraciones más de 5 estrellas:",
      "pill.prof": "Profesionalidad", "pill.preu": "Buen precio", "pill.rapid": "Rapidez",
      "pill.punt": "Puntualidad", "pill.qual": "Calidad",
      "gallery.eyebrow": "Galería", "gallery.h2": "El trabajo, <em>bien hecho</em>",
      "gallery.sub": "Pronto añadiremos fotografías reales de trabajos de MAP.",
      "contact.eyebrow": "Contacto",
      "contact.h2": "Hablemos de tu <em>problema de agua</em>",
      "contact.sub": "Llama, escribe por WhatsApp o rellena el formulario. Te respondemos enseguida.",
      "contact.phoneLabel": "Teléfono y WhatsApp", "contact.addrLabel": "Dirección",
      "schedule.title": "Horario", "schedule.closed": "Cerrado",
      "day.1": "Lunes", "day.2": "Martes", "day.3": "Miércoles", "day.4": "Jueves",
      "day.5": "Viernes", "day.6": "Sábado", "day.0": "Domingo",
      "form.name": "Nombre", "form.namePh": "Tu nombre",
      "form.phone": "Teléfono", "form.phonePh": "Tu teléfono",
      "form.type": "Tipo de avería o servicio", "form.typePh": "Ej: fuga en la cocina, cambio de grifo…",
      "form.msg": "Mensaje <span class=\"opt\">(opcional)</span>", "form.msgPh": "Explícanos brevemente qué necesitas",
      "form.submit": "Enviar por WhatsApp",
      "form.note": "Al enviar se abrirá WhatsApp con tu mensaje preparado hacia el 670 85 80 99.",
      "footer.brand": "Fontanero de confianza en Lleida. Reparaciones, instalaciones y desatascos con valoración perfecta en Google.",
      "footer.contact": "Contacto", "footer.hours": "Horario",
      "footer.weekdays": "Lunes a viernes<br>8:00 – 19:00", "footer.weekend": "Sábado y domingo: cerrado",
      "float.call": "Llama ahora al 670 85 80 99", "float.wa": "Escríbenos por WhatsApp",
      "meta.title": "Fontanería Instalaciones MAP — Fontanero de confianza en Lleida",
      "meta.desc": "Fontanero en Lleida. Reparación de averías y fugas, instalaciones, desatascos y cambio de grifos y sanitarios. 5,0★ con 15 reseñas en Google. Presupuesto sin compromiso.",
      "status.open": "Abierto ahora", "status.opensToday": "Abre hoy a las {h}",
      "status.closedNext": "Cerrado · Abre {d} a las {h}", "status.closed": "Cerrado"
    }
  };
  window.__I18N_CA__ = {
    "status.open": "Obert ara", "status.opensToday": "Obre avui a les {h}",
    "status.closedNext": "Tancat · Obre {d} a les {h}", "status.closed": "Tancat",
    "day.1": "dilluns", "day.2": "dimarts", "day.3": "dimecres", "day.4": "dijous",
    "day.5": "divendres", "day.6": "dissabte", "day.0": "diumenge"
  };
  window.__I18N_ES_DAYS__ = {
    "day.1": "lunes", "day.2": "martes", "day.3": "miércoles", "day.4": "jueves",
    "day.5": "viernes", "day.6": "sábado", "day.0": "domingo"
  };

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  // ---- Mobile nav ----
  function initNav() {
    var toggle = $("#navToggle"), panel = $("#navMobilePanel"), nav = $("#mainNav");
    if (toggle && panel) {
      toggle.addEventListener("click", function () {
        var open = panel.classList.toggle("open");
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
      });
      $$("a", panel).forEach(function (a) {
        a.addEventListener("click", function () {
          panel.classList.remove("open"); toggle.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
    if (nav) {
      var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 12); };
      window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    }
  }

  // ---- Reveals: bulletproof anti-ghost entrance system ----
  // Contract: an element is only ever hidden if it's BELOW the fold at load
  // (safe to animate in). Everything on-screen stays visible. Once hidden, FOUR
  // independent triggers can reveal it — IntersectionObserver, scroll, tab
  // becoming visible, and a 3.5s sweep — so no single stalled mechanism (e.g. a
  // backgrounded tab where the observer is paused) can leave content ghosted.
  function initReveals() {
    var reveals = $$(".reveal");
    var vh0 = window.innerHeight;

    // Reduced motion: never hide anything, no animation.
    if (reducedMotion) return;

    // Hide only the below-the-fold elements; leave on-screen ones fully visible.
    reveals.forEach(function (el) {
      if (el.getBoundingClientRect().top > vh0 * 0.92) el.classList.add("pre");
    });

    function reveal(el) { el.classList.remove("pre"); }

    function sweep() {
      var vh = window.innerHeight;
      reveals.forEach(function (el) {
        if (el.classList.contains("pre") && el.getBoundingClientRect().top < vh * 0.97) reveal(el);
      });
    }

    // Primary: smooth per-element reveal via observer (when the page is live).
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.01, rootMargin: "0px 0px -3% 0px" });
      reveals.forEach(function (el) { if (el.classList.contains("pre")) io.observe(el); });
    }

    // Backups: scroll (time-throttled, NOT rAF — rAF is paused in background
    // tabs, so a time throttle keeps the scroll reveal working everywhere),
    // tab-visible, resize, and a final timed sweep.
    var last = 0;
    window.addEventListener("scroll", function () {
      var t = Date.now();
      if (t - last < 120) return; last = t; sweep();
    }, { passive: true });
    window.addEventListener("resize", sweep);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) sweep(); });
    setTimeout(sweep, 3500);
    sweep();
  }

  // ---- Count-up stats (micro effect; runs unless reduced-motion) ----
  function animateCount(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.decimals || "0", 10);
    var suffix = el.dataset.suffix || "";
    var start = performance.now(), dur = 1300;
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var v = (target * eased).toFixed(decimals).replace(".", ",");
      el.textContent = v + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals).replace(".", ",") + suffix;
    }
    requestAnimationFrame(tick);
  }
  function finalCount(el) {
    return parseFloat(el.dataset.count).toFixed(parseInt(el.dataset.decimals || "0", 10)).replace(".", ",") + (el.dataset.suffix || "");
  }
  function initCounters() {
    var els = $$(".stat-num[data-count]");
    if (!els.length) return;

    // Correct value by default — never leave a "0" showing if the animation
    // can't run (reduced motion, backgrounded tab, observer stalled).
    els.forEach(function (el) { el.textContent = finalCount(el); });
    if (reducedMotion) return;

    function run(el) {
      if (el.dataset.counted) return;
      el.dataset.counted = "1";
      animateCount(el); // counts from 0 up to the real value
    }
    var vh = window.innerHeight;
    var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 }) : null;

    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh) run(el);        // visible now → animate
      else if (io) io.observe(el);                             // below fold → on enter
      else run(el);
    });
    // Safety: anything visible but not yet animated after 2.5s just settles.
    setTimeout(function () {
      els.forEach(function (el) {
        if (!el.dataset.counted && el.getBoundingClientRect().top < window.innerHeight) { el.dataset.counted = "1"; el.textContent = finalCount(el); }
      });
    }, 2500);
  }

  // ---- Live open/closed status from real per-day hours (language-aware) ----
  // Computed once; rendered in whatever language is active. renderSchedule() is
  // re-called by the i18n layer whenever the user switches language.
  var scheduleState = null;
  function computeSchedule() {
    var sched = brand.schedule || {};
    var now = new Date(), day = now.getDay(), hour = now.getHours() + now.getMinutes() / 60;
    var today = sched[day];
    var open = !!today && hour >= today.opens && hour < today.closes;
    function fmt(h) { var hh = Math.floor(h), mm = Math.round((h - hh) * 60); return hh + ":" + (mm < 10 ? "0" : "") + mm; }
    var kind, nextDay = null, atHour = null;
    if (open) { kind = "open"; }
    else if (today && hour < today.opens) { kind = "opensToday"; atHour = fmt(today.opens); }
    else {
      var d = day, hops = 0;
      do { d = (d + 1) % 7; hops++; if (sched[d]) { nextDay = d; atHour = fmt(sched[d].opens); break; } } while (hops < 7);
      kind = nextDay === null ? "closed" : "closedNext";
    }
    scheduleState = { day: day, open: open, kind: kind, nextDay: nextDay, atHour: atHour };
    var li = $('.schedule-list li[data-day="' + day + '"]');
    if (li) li.classList.add("is-today");
  }
  function renderSchedule(lang) {
    if (!scheduleState) return;
    var s = scheduleState;
    var days = (lang === "es") ? window.__I18N_ES_DAYS__ : window.__I18N_CA__;
    var msg;
    if (s.kind === "open") msg = t("status.open", lang);
    else if (s.kind === "opensToday") msg = t("status.opensToday", lang).replace("{h}", s.atHour);
    else if (s.kind === "closedNext") msg = t("status.closedNext", lang).replace("{d}", (days["day." + s.nextDay] || "")).replace("{h}", s.atHour);
    else msg = t("status.closed", lang);
    [["#scheduleStatus", "#scheduleStatusText"], ["#heroStatusBadge", "#heroStatusText"]].forEach(function (pair) {
      var badge = $(pair[0]), text = $(pair[1]);
      if (!badge || !text) return;
      badge.classList.toggle("is-open", s.open);
      text.textContent = msg;
    });
  }
  // Small string lookup: ES from dict, CA from the CA status map, else key.
  function t(key, lang) {
    if (lang === "es") { var es = (window.__I18N__ && window.__I18N__.es) || {}; return es[key] != null ? es[key] : key; }
    var ca = window.__I18N_CA__ || {}; return ca[key] != null ? ca[key] : key;
  }
  function initSchedule() { computeSchedule(); renderSchedule(getLang()); }

  // ---- i18n: Catalan is the HTML default; ES swaps in from lib/i18n.js ----
  var LANG_KEY = "map-lang";
  function getLang() { try { return localStorage.getItem(LANG_KEY) === "es" ? "es" : "ca"; } catch (e) { return "ca"; } }
  function initI18n() {
    var dict = (window.__I18N__ && window.__I18N__.es) || {};
    var nodes = $$("[data-i18n]");
    // Capture Catalan originals (innerHTML, or the target attribute value).
    nodes.forEach(function (el) {
      var attr = el.getAttribute("data-i18n-attr");
      el.__ca = attr ? el.getAttribute(attr) : el.innerHTML;
    });

    function apply(lang) {
      nodes.forEach(function (el) {
        var key = el.getAttribute("data-i18n");
        var attr = el.getAttribute("data-i18n-attr");
        var val = (lang === "es" && dict[key] != null) ? dict[key] : el.__ca;
        if (attr) el.setAttribute(attr, val);
        else el.innerHTML = val;
      });
      // Head + document language.
      document.documentElement.setAttribute("lang", lang);
      if (lang === "es" && dict["meta.title"]) document.title = dict["meta.title"];
      else document.title = "Fontaneria Instalaciones MAP — Fontaner de confiança a Lleida";
      var md = $('meta[name="description"]');
      if (md) md.setAttribute("content", lang === "es" ? (dict["meta.desc"] || md.getAttribute("content")) : "Fontaner a Lleida. Reparació d'averies i fuites, instal·lacions, desembussos i canvi d'aixetes i sanitaris. 5,0★ amb 15 ressenyes a Google. Pressupost sense compromís.");
      // Toggle buttons state.
      $$(".lang-btn").forEach(function (b) {
        var on = b.getAttribute("data-lang") === lang;
        b.classList.toggle("is-current", on);
        b.setAttribute("aria-pressed", String(on));
      });
      // Re-render the live schedule text in this language.
      renderSchedule(lang);
    }

    function setLang(lang) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
      apply(lang);
    }

    $$(".lang-btn").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });

    apply(getLang()); // default Catalan unless the visitor previously chose ES
  }

  // ---- Numbered "why" panel: highlight active step as it scrolls ----
  // Bidirectional & reversible. Inactive steps sit at a fixed, readable
  // opacity (never near-zero), so there is no mid-fade "ghost" state possible.
  function initWhySteps() {
    var section = $("#perque");
    var items = $$(".why-item");
    if (!section || items.length < 2) return;
    function allActive() { items.forEach(function (el) { el.classList.add("is-active"); }); }
    if (reducedMotion) { allActive(); return; }

    // The scroll-linked stepping only makes sense on the DESKTOP two-column
    // layout, where the pinned panel shows one point at a time beside the image.
    // On mobile the grid stacks (image + all four points taller than the
    // screen), so pinning + stepping created a dead-scroll zone that clipped
    // point 01 and jumped to 04. There, just show all four as a normal readable
    // list. Re-evaluated every tick so resizing across the breakpoint works.
    var isDesktop = function () { return matchMedia("(min-width: 961px)").matches; };

    var ticking = false;
    function update() {
      ticking = false;
      if (!isDesktop()) { allActive(); return; }
      var r = section.getBoundingClientRect(), vh = window.innerHeight;
      // Map the SCREEN CENTRE (not the top edge) against the section, and only
      // count the inner 20%–80% of its travel — leaving an entry/exit margin so
      // step 01 activates when the user actually sees the content and step 04
      // completes just before the section leaves.
      //   rawProgress = (viewportCentre - sectionTopAbs) / sectionHeight
      //   with getBoundingClientRect: viewportCentre - sectionTopAbs = vh/2 - r.top
      var raw = (vh * 0.5 - r.top) / r.height;
      var p = Math.min(1, Math.max(0, (raw - 0.2) / 0.6));
      var idx = Math.min(items.length - 1, Math.floor(p * items.length));
      items.forEach(function (el, i) { el.classList.toggle("is-active", i === idx); });
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // ---- Floating buttons (call + WhatsApp) appear after the hero ----
  function initFloatCall() {
    var hero = $(".hero");
    var btns = $$(".call-float, .wa-float");
    if (!hero || !btns.length) return;
    if (!("IntersectionObserver" in window)) { btns.forEach(function (b) { b.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { btns.forEach(function (b) { b.classList.toggle("is-visible", !e.isIntersecting); }); });
    }, { threshold: 0, rootMargin: "-70% 0px 0px 0px" });
    io.observe(hero);
  }

  // ---- Contact form -> opens WhatsApp with prefilled message ----
  function initForm() {
    var form = $("#reservaForm");
    if (!form) return;
    var btn = $("#formSubmit");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var name = $("#fName").value.trim();
      var phone = $("#fPhone").value.trim();
      var type = $("#fType").value.trim();
      var msg = $("#fMsg").value.trim();
      var text = "Hola MAP, soc " + name + ".";
      if (phone) text += " El meu telèfon: " + phone + ".";
      if (type) text += " Necessito: " + type + ".";
      if (msg) text += " " + msg;
      var url = "https://wa.me/" + (brand.whatsapp || "34670858099") + "?text=" + encodeURIComponent(text);
      btn.classList.add("is-success");
      setTimeout(function () { window.open(url, "_blank", "noopener"); btn.classList.remove("is-success"); }, 550);
    });
  }

  function initYear() { var y = $("#year"); if (y) y.textContent = new Date().getFullYear(); }

  // ---- Reviews marquee: duplicate the block for a seamless -50% loop ----
  // The CSS animation translates the track by -50%; that only loops without a
  // jump if the track is exactly two identical halves. We clone the single
  // authored block so both halves are guaranteed byte-identical (and equal
  // width), rather than hand-maintaining a duplicate in the HTML.
  function initReviewsMarquee() {
    var track = $("#reviewsTrack");
    if (!track) return;
    var block = $("[data-reviews-block]", track);
    if (!block || track.children.length > 1) return; // idempotent
    var clone = block.cloneNode(true);
    clone.setAttribute("aria-hidden", "true"); // duplicate is decorative for AT
    track.appendChild(clone);
  }

  // ---- Custom cursor: copper dot (instant) + ring (lerp trail) ----
  function initCursor() {
    // Fine pointer only; touch/coarse devices keep the native cursor.
    if (!matchMedia("(pointer: fine)").matches) return;

    var dot = document.createElement("div"); dot.id = "cursor-dot";
    var ring = document.createElement("div"); ring.id = "cursor-ring";
    document.body.appendChild(dot); document.body.appendChild(ring);
    var root = document.documentElement;
    root.classList.add("custom-cursor");

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var rx = mx, ry = my, ready = false;

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
      if (!ready) { ready = true; rx = mx; ry = my; root.classList.add("cursor-ready"); }
      root.classList.remove("cursor-out");
    }, { passive: true });

    document.addEventListener("mouseleave", function () { root.classList.add("cursor-out"); });
    document.addEventListener("mouseenter", function () { root.classList.remove("cursor-out"); });

    // Hover growth over interactive targets.
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest && e.target.closest("a, button, .service-card, input, textarea, .review-card")) root.classList.add("cursor-hover");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest("a, button, .service-card, input, textarea, .review-card")) root.classList.remove("cursor-hover");
    });

    var lerp = reducedMotion ? 1 : 0.12; // reduced motion → snap directly, no trail
    (function loop() {
      rx += (mx - rx) * lerp;
      ry += (my - ry) * lerp;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    })();
  }

  /* ---- Cookies (DORMANT) --------------------------------------------------
     Only wire this up if Google Analytics (or similar) is ever added AND the
     commented cookie-banner markup in index.html is enabled. Granular consent:
     Essencials (always on) / Analítiques / Comportament. Persist choice in
     localStorage("map-cookie-consent") and load analytics only after consent.
     function initCookies() { ... }
  -------------------------------------------------------------------------- */

  function boot() {
    safe(initNav, "initNav");
    safe(initReveals, "initReveals");
    safe(initCounters, "initCounters");
    safe(initSchedule, "initSchedule");
    safe(initWhySteps, "initWhySteps");
    safe(initFloatCall, "initFloatCall");
    safe(initForm, "initForm");
    safe(initYear, "initYear");
    // Clone the marquee BEFORE i18n so the duplicate half's translatable nodes
    // are captured too — otherwise switching to ES would translate only one
    // half and the two halves would differ in width (visible loop jump).
    safe(initReviewsMarquee, "initReviewsMarquee");
    safe(initI18n, "initI18n");
    safe(initCursor, "initCursor");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
