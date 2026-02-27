(function () {
  const data = window.PHASMO_DATA;
  const util = window.PHASMO_UTIL;
  if (!data || !util) return;

  const state = {
    query: "",
    selectedEvidence: new Set()
  };

  const evidenceFilter = document.querySelector("#evidence-filter");
  const searchInput = document.querySelector("#ghost-search");
  const ghostContainer = document.querySelector("#ghost-results");
  const countLabel = document.querySelector("#ghost-count");
  const comboTableBody = document.querySelector("#combo-table-body");

  function statFor(ghostName) {
    return (data.ghostStats && data.ghostStats[ghostName]) || {
      hunt: "Variable",
      speed: "Variable",
      los: "Variable",
      interfere: "10 m",
      nerd: "Profil en cours de consolidation."
    };
  }

  function createEvidenceFilter() {
    if (!evidenceFilter) return;

    data.evidences.forEach((evidence) => {
      const button = document.createElement("button");
      button.className = `pill ${util.evidenceClass(evidence.name)}`;
      button.type = "button";
      button.textContent = evidence.name;
      button.setAttribute("data-evidence", evidence.name);
      button.addEventListener("click", () => {
        if (state.selectedEvidence.has(evidence.name)) {
          state.selectedEvidence.delete(evidence.name);
          button.classList.remove("active");
        } else {
          state.selectedEvidence.add(evidence.name);
          button.classList.add("active");
        }
        renderGhosts();
      });
      evidenceFilter.appendChild(button);
    });

    const clearBtn = document.createElement("button");
    clearBtn.className = "pill pill-clear";
    clearBtn.type = "button";
    clearBtn.textContent = "Reinitialiser";
    clearBtn.addEventListener("click", () => {
      state.selectedEvidence.clear();
      evidenceFilter.querySelectorAll(".pill").forEach((btn) => {
        btn.classList.remove("active");
      });
      if (searchInput) {
        searchInput.value = "";
        state.query = "";
      }
      renderGhosts();
    });
    evidenceFilter.appendChild(clearBtn);
  }

  function ghostMatches(ghost) {
    const stats = statFor(ghost.name);
    const query = state.query.trim().toLowerCase();

    const haystack = [
      ghost.name,
      ghost.strengths,
      ghost.weaknesses,
      ...(ghost.tests || []),
      stats.hunt,
      stats.speed,
      stats.los,
      stats.interfere,
      stats.nerd
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || haystack.includes(query);

    const matchesEvidence = Array.from(state.selectedEvidence).every((evidence) =>
      ghost.evidences.includes(evidence)
    );

    return matchesQuery && matchesEvidence;
  }

  function renderGhosts() {
    if (!ghostContainer || !countLabel) return;

    const filtered = data.ghosts.filter(ghostMatches);
    countLabel.textContent = `${filtered.length} fantome(s)`;

    if (filtered.length === 0) {
      ghostContainer.innerHTML =
        '<article class="card"><p>Aucun resultat. Retire un filtre preuve ou elargis la recherche.</p></article>';
      return;
    }

    ghostContainer.innerHTML = filtered
      .map((ghost) => {
        const stats = statFor(ghost.name);

        const evidenceTags = ghost.evidences
          .map(
            (evidence) =>
              `<span class="evidence-chip ${util.evidenceClass(evidence)}">${util.escapeHtml(evidence)}</span>`
          )
          .join("");

        const tests = (ghost.tests || [])
          .map((test) => `<li>${util.escapeHtml(test)}</li>`)
          .join("");

        return `
          <article class="ghost-card">
            <div class="ghost-card-inner">
              <div class="ghost-main">
                <div class="ghost-meta-top">
                  <h3 class="ghost-title">${util.escapeHtml(ghost.name)}</h3>
                  <span class="badge">3 preuves</span>
                </div>
                <div class="evidence-badges">${evidenceTags}</div>
                <div class="nerd-row">
                  <div class="stat-pill">
                    <span class="stat-label"><span class="stat-icon">🧠</span>Seuil chasse</span>
                    <span class="stat-value">${util.escapeHtml(stats.hunt)}</span>
                  </div>
                  <div class="stat-pill">
                    <span class="stat-label"><span class="stat-icon">👣</span>Vitesse</span>
                    <span class="stat-value">${util.escapeHtml(stats.speed)}</span>
                  </div>
                  <div class="stat-pill">
                    <span class="stat-label">
                      <span class="stat-icon">👁</span>LOS
                      <span class="info-tip" tabindex="0" data-tip="LOS = Line of Sight. Quand le fantome te voit en continu pendant la chasse, sa vitesse peut augmenter selon son type.">?</span>
                    </span>
                    <span class="stat-value">${util.escapeHtml(stats.los)}</span>
                  </div>
                  <div class="stat-pill">
                    <span class="stat-label"><span class="stat-icon">📡</span>Interference</span>
                    <span class="stat-value">${util.escapeHtml(stats.interfere)}</span>
                  </div>
                </div>
                <p class="ghost-desc"><strong>Stats nerd:</strong> ${util.escapeHtml(stats.nerd)}</p>
              </div>
              <div class="ghost-tells">
                <h4>Tells / comportement</h4>
                <ul class="tell-list">
                  <li>${util.escapeHtml(ghost.strengths)}</li>
                  <li>${util.escapeHtml(ghost.weaknesses)}</li>
                </ul>
                <div class="ghost-tests">
                  <strong>Tests 0 preuve / verification:</strong>
                  <ul class="tell-list">${tests}</ul>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderComboTable() {
    if (!comboTableBody) return;
    comboTableBody.innerHTML = data.ghosts
      .map(
        (ghost) => `
          <tr>
            <th scope="row">${util.escapeHtml(ghost.name)}</th>
            <td><span class="evidence-chip ${util.evidenceClass(ghost.evidences[0])}">${util.escapeHtml(ghost.evidences[0])}</span></td>
            <td><span class="evidence-chip ${util.evidenceClass(ghost.evidences[1])}">${util.escapeHtml(ghost.evidences[1])}</span></td>
            <td><span class="evidence-chip ${util.evidenceClass(ghost.evidences[2])}">${util.escapeHtml(ghost.evidences[2])}</span></td>
          </tr>
        `
      )
      .join("");
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.query = searchInput.value;
      renderGhosts();
    });
  }

  createEvidenceFilter();
  renderGhosts();
  renderComboTable();
})();
