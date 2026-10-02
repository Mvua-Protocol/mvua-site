/* ============================================================================
   Mvua Protocol site: shared behavior
   No dependencies. Progressive: the pages work without this file, it only
   adds the theme toggle, the mobile menu, active link marking, scroll reveal,
   and the footer watermark sizing.
   ============================================================================ */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;

  /* -------------------------------------------------------------------------
     Theme. The initial class is set by an inline script in <head> so there is
     no flash; this just wires the button and persists the choice.
     ------------------------------------------------------------------------- */
  function currentTheme() {
    return root.classList.contains("dark") ? "dark" : "light";
  }

  function setTheme(theme) {
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try { localStorage.setItem("mvua-theme", theme); } catch (e) {}
    syncThemeButtons(theme);
  }

  function syncThemeButtons(theme) {
    var buttons = doc.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  doc.addEventListener("click", function (event) {
    var toggle = event.target.closest("[data-theme-toggle]");
    if (!toggle) return;
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  });

  /* -------------------------------------------------------------------------
     Header: add a shadow once the page has scrolled, and drive the mobile menu.
     ------------------------------------------------------------------------- */
  var header = doc.querySelector(".site-header");
  var menu = doc.querySelector(".mobile-menu");
  var navToggle = doc.querySelector("[data-nav-toggle]");

  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && menu) {
    navToggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        menu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* -------------------------------------------------------------------------
     Active nav link. The server can't know the path in a static build until
     runtime, so mark the link whose href matches the current file.
     ------------------------------------------------------------------------- */
  (function markActive() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    var links = doc.querySelectorAll(".nav-links a, .mobile-menu a, .docs-side a");
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href") || "";
      var file = href.split("/").pop().split("#")[0];
      if (file && file === path) links[i].classList.add("active");
    }
  })();

  /* -------------------------------------------------------------------------
     Scroll reveal. One orchestrated entrance per element as it enters view,
     respecting reduced motion (the CSS disables it there).
     ------------------------------------------------------------------------- */
  (function reveal() {
    var items = doc.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      for (var j = 0; j < items.length; j++) items[j].classList.add("in");
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    for (var k = 0; k < items.length; k++) io.observe(items[k]);
  })();

  /* -------------------------------------------------------------------------
     Footer watermark. Size the giant wordmark so it spans the container width
     exactly, like the reference treatment. Recompute on resize.
     ------------------------------------------------------------------------- */
  (function watermark() {
    var span = doc.querySelector(".footer-watermark span");
    var wrap = doc.querySelector(".footer-watermark");
    if (!span || !wrap) return;

    function fit() {
      span.style.fontSize = "200px";
      var textWidth = span.offsetWidth;
      var wrapWidth = wrap.offsetWidth;
      if (!textWidth) return;
      span.style.fontSize = (200 * (wrapWidth / textWidth) * 0.92) + "px";
    }
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(fit);
    else fit();
    window.addEventListener("resize", fit);
    setTimeout(fit, 400);
  })();

  /* -------------------------------------------------------------------------
     Copy-to-clipboard for any [data-copy] element (contract IDs, addresses).
     ------------------------------------------------------------------------- */
  doc.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-copy]");
    if (!trigger) return;
    var value = trigger.getAttribute("data-copy");
    if (!value || !navigator.clipboard) return;
    navigator.clipboard.writeText(value).then(function () {
      var original = trigger.textContent;
      trigger.textContent = "Copied";
      setTimeout(function () { trigger.textContent = original; }, 1400);
    });
  });
})();