/* =========================================================
   Abeer Alkhmese — Portfolio
   Vanilla JS: no dependencies, no build step.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Sticky nav ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  function closeMenu() {
    if (!links) return;
    links.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (e) {
      if (!links.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        setTimeout(function () { el.classList.add("is-visible"); }, i * 70);
        revealObserver.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navAnchors.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- Typing effect ---------- */
  var typedEl = document.getElementById("typed");
  var phrases = [
    "AI Engineer",
    "Software Engineer",
    "Business Analyst"
  ];

  if (typedEl) {
    if (reduceMotion) {
      typedEl.textContent = phrases[0];
    } else {
      var pIndex = 0;
      var cIndex = 0;
      var deleting = false;

      (function type() {
        var current = phrases[pIndex];
        typedEl.textContent = current.slice(0, cIndex);

        var delay = deleting ? 45 : 85;

        if (!deleting && cIndex === current.length) {
          deleting = true;
          delay = 1800;
        } else if (deleting && cIndex === 0) {
          deleting = false;
          pIndex = (pIndex + 1) % phrases.length;
          delay = 350;
        } else {
          cIndex += deleting ? -1 : 1;
        }

        setTimeout(type, delay);
      })();
    }
  }

  /* ---------- Animated stat counters ---------- */
  var statNums = document.querySelectorAll(".stat__num");

  if (statNums.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      statNums.forEach(function (el) { el.textContent = el.dataset.count; });
    } else {
      var statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.dataset.count, 10) || 0;
          var start = null;
          var duration = 1100;

          function step(ts) {
            if (start === null) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = String(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(step);
          }

          requestAnimationFrame(step);
          statObserver.unobserve(el);
        });
      }, { threshold: 0.5 });

      statNums.forEach(function (el) { statObserver.observe(el); });
    }
  }

  /* ---------- Project filters ---------- */
  var filterBtns = document.querySelectorAll(".filter");
  var projects = document.querySelectorAll(".project");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.dataset.filter;

      filterBtns.forEach(function (b) { b.classList.toggle("is-active", b === btn); });

      projects.forEach(function (card) {
        var match = cat === "all" || card.dataset.cat === cat;
        card.classList.toggle("is-hidden", !match);
        if (match) card.classList.add("is-visible");
      });
    });
  });
})();
