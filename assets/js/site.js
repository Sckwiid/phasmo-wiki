(function () {
  const data = window.PHASMO_DATA || {};

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatMoney(value) {
    return `${Number(value).toLocaleString("fr-FR")} $`;
  }

  function setText(selector, value) {
    const node = document.querySelector(selector);
    if (node && value !== undefined && value !== null) {
      node.textContent = value;
    }
  }

  function initKpis() {
    const meta = data.metadata || {};
    document.querySelectorAll("[data-kpi]").forEach((node) => {
      const key = node.getAttribute("data-kpi");
      if (key === "ghosts") node.textContent = meta.ghostCount || "-";
      if (key === "evidences") node.textContent = meta.evidenceCount || "-";
      if (key === "maps") node.textContent = meta.mapCount || "-";
      if (key === "updated") node.textContent = meta.generatedAt || "-";
    });
  }

  function initFooter() {
    setText("[data-year]", new Date().getFullYear());
  }

  function initCanonical() {
    const canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) return;
    try {
      const url = new URL(window.location.href);
      canonical.href = url.origin + url.pathname;
    } catch (_) {
      // No-op if running from local filesystem.
    }
  }

  function createAmbientBlobs() {
    if (document.querySelector(".ambient-blob")) return;
    ["a", "b", "c"].forEach((name) => {
      const blob = document.createElement("div");
      blob.className = `ambient-blob ambient-blob-${name}`;
      document.body.appendChild(blob);
    });
  }

  function initAmbientCanvas() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let canvas = document.getElementById("ambient-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "ambient-canvas";
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const particles = [];
    const count = Math.min(40, Math.max(18, Math.floor(window.innerWidth / 55)));
    let rafId = null;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particles.length === 0) {
        for (let i = 0; i < count; i += 1) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 1 + Math.random() * 3.4,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            alpha: 0.06 + Math.random() * 0.2,
            hue: [5, 28, 160, 215, 265][Math.floor(Math.random() * 5)]
          });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 88%, 65%, ${p.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${p.hue}, 88%, 65%, ${Math.min(0.35, p.alpha + 0.08)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      rafId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("beforeunload", () => {
      if (rafId) cancelAnimationFrame(rafId);
    });
  }

  function evidenceClass(name) {
    const n = (name || "").toLowerCase();
    if (n.includes("emf")) return "ev-emf";
    if (n.includes("d.o.t.s") || n.includes("dots")) return "ev-dots";
    if (n.includes("ultraviolet")) return "ev-uv";
    if (n.includes("glaciales") || n.includes("freezing")) return "ev-freezing";
    if (n.includes("orbe") || n.includes("orb")) return "ev-orbs";
    if (n.includes("ecriture") || n.includes("writing")) return "ev-writing";
    if (n.includes("spirit box")) return "ev-spiritbox";
    return "";
  }

  window.PHASMO_UTIL = {
    escapeHtml,
    formatMoney,
    evidenceClass
  };

  initKpis();
  initFooter();
  initCanonical();
  createAmbientBlobs();
  initAmbientCanvas();
})();
