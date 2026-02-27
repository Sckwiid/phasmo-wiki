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
      // No-op if running from a file without a resolvable URL.
    }
  }

  window.PHASMO_UTIL = {
    escapeHtml,
    formatMoney
  };

  initKpis();
  initFooter();
  initCanonical();
})();
