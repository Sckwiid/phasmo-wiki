(function () {
  const data = window.PHASMO_DATA;
  const util = window.PHASMO_UTIL;
  if (!data || !util) return;

  const objects = data.cursedObjects || [];
  const searchInput = document.querySelector("#cursed-search");
  const grid = document.querySelector("#cursed-grid");
  const count = document.querySelector("#cursed-count");
  const tableBody = document.querySelector("#cursed-table-body");

  const state = { query: "" };

  function objectPath(name) {
    return `${util.slugify(name)}/`;
  }

  function matches(item) {
    const q = state.query.trim().toLowerCase();
    if (!q) return true;

    const haystack = [
      item.name,
      item.summary,
      item.difficulty,
      item.sanityCost,
      item.huntRisk,
      item.usageLimit,
      ...(item.usage || []),
      ...(item.risks || []),
      ...(item.tips || [])
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  }

  function renderCards() {
    if (!grid || !count) return;

    const filtered = objects.filter(matches);
    count.textContent = `${filtered.length} objet(s) maudit(s)`;

    if (!filtered.length) {
      grid.innerHTML = '<article class="card"><p>Aucun resultat. Elargis la recherche (ex: sanite, chasse, resurrection).</p></article>';
      return;
    }

    grid.innerHTML = filtered
      .map((item) => {
        const tip = (item.tips && item.tips[0]) || "Toujours prevoir une sortie et un encens avant l'activation.";

        return `
          <article class="card cursed-card">
            <h3 class="cursed-title"><a href="${objectPath(item.name)}">${util.escapeHtml(item.name)}</a></h3>
            <p>${util.escapeHtml(item.summary || "Objet maudit a fort impact sur l'enquete.")}</p>
            <div class="detail-badges">
              <span class="badge">Difficulte: ${util.escapeHtml(item.difficulty || "Variable")}</span>
              <span class="badge">Cout: ${util.escapeHtml(item.sanityCost || "Variable")}</span>
              <span class="badge">Risque: ${util.escapeHtml(item.huntRisk || "Variable")}</span>
            </div>
            <p class="ghost-desc"><strong>Pro tip:</strong> ${util.escapeHtml(tip)}</p>
            <p><a class="button button-ghost" href="${objectPath(item.name)}">Ouvrir la fiche detaillee</a></p>
          </article>
        `;
      })
      .join("");
  }

  function renderTable() {
    if (!tableBody) return;

    tableBody.innerHTML = objects
      .map(
        (item) => `
          <tr>
            <th scope="row"><a href="${objectPath(item.name)}">${util.escapeHtml(item.name)}</a></th>
            <td>${util.escapeHtml(item.sanityCost || "Variable")}</td>
            <td>${util.escapeHtml(item.huntRisk || "Variable")}</td>
            <td>${util.escapeHtml(item.usageLimit || "Variable")}</td>
          </tr>
        `
      )
      .join("");
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.query = searchInput.value;
      renderCards();
    });
  }

  renderCards();
  renderTable();
})();
