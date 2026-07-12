(function () {
  "use strict";

  // Mark that JS is running. CSS keys the hidden/animated state off `html.js`,
  // so with JS OFF (or if this file fails to load) EVERYTHING stays visible.
  // This is the first line of defence against the "ghost" bug: no element is
  // ever hidden unless JS is present to reveal it again.
  document.documentElement.classList.add("js");

  var brand = window.__BRAND__ || {};
  var reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  // ---- Live open/closed status from real per-day hours ----
  function initSchedule() {
    var sched = brand.schedule || {};
    var now = new Date(), day = now.getDay(), hour = now.getHours() + now.getMinutes() / 60;
    var today = sched[day];
    var open = !!today && hour >= today.opens && hour < today.closes;

    var li = $('.schedule-list li[data-day="' + day + '"]');
    if (li) li.classList.add("is-today");

    function fmt(h) { var hh = Math.floor(h), mm = Math.round((h - hh) * 60); return hh + ":" + (mm < 10 ? "0" : "") + mm; }
    var msg;
    if (open) { msg = "Obert ara"; }
    else if (today && hour < today.opens) { msg = "Obre avui a les " + fmt(today.opens); }
    else {
      var d = day, hops = 0, next = null;
      do { d = (d + 1) % 7; hops++; if (sched[d]) { next = sched[d]; break; } } while (hops < 7);
      msg = next ? ("Tancat · Obre " + next.label.toLowerCase() + " a les " + fmt(next.opens)) : "Tancat";
    }
    [["#scheduleStatus", "#scheduleStatusText"], ["#heroStatusBadge", "#heroStatusText"]].forEach(function (pair) {
      var badge = $(pair[0]), text = $(pair[1]);
      if (!badge || !text) return;
      badge.classList.toggle("is-open", open);
      text.textContent = msg;
    });
  }

  // ---- Numbered "why" panel: highlight active step as it scrolls ----
  // Bidirectional & reversible. Inactive steps sit at a fixed, readable
  // opacity (never near-zero), so there is no mid-fade "ghost" state possible.
  function initWhySteps() {
    var section = $("#perque");
    var items = $$(".why-item");
    if (!section || items.length < 2) return;
    if (reducedMotion) { items.forEach(function (el) { el.classList.add("is-active"); }); return; }

    var ticking = false;
    function update() {
      ticking = false;
      var r = section.getBoundingClientRect(), vh = window.innerHeight;
      // progress 0..1 across the section's travel through the viewport
      var total = r.height + vh;
      var p = Math.min(Math.max((vh - r.top) / total, 0), 1);
      var idx = Math.min(items.length - 1, Math.max(0, Math.floor(p * items.length)));
      items.forEach(function (el, i) { el.classList.toggle("is-active", i === idx); });
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // ---- Floating call button appears after the hero ----
  function initFloatCall() {
    var hero = $(".hero"), btn = $(".call-float");
    if (!hero || !btn) return;
    if (!("IntersectionObserver" in window)) { btn.classList.add("is-visible"); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { btn.classList.toggle("is-visible", !e.isIntersecting); });
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
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
