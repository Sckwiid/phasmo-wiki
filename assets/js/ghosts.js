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

  function createEvidenceFilter() {
    if (!evidenceFilter) return;

    data.evidences.forEach((evidence) => {
      const button = document.createElement("button");
      button.className = "pill";
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
    clearBtn.textContent = "Reinitialiser les filtres";
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
    const query = state.query.trim().toLowerCase();
    const matchesQuery =
      !query ||
      ghost.name.toLowerCase().includes(query) ||
      ghost.strengths.toLowerCase().includes(query) ||
      ghost.weaknesses.toLowerCase().includes(query);

    const matchesEvidence = Array.from(state.selectedEvidence).every((evidence) =>
      ghost.evidences.includes(evidence)
    );

    return matchesQuery && matchesEvidence;
  }

  function renderGhosts() {
    if (!ghostContainer || !countLabel) return;

    const filtered = data.ghosts.filter(ghostMatches);
    countLabel.textContent = `${filtered.length} fantome(s) correspondant(s)`;

    if (filtered.length === 0) {
      ghostContainer.innerHTML =
        '<div class="card"><p>Aucun fantome ne correspond a ce filtre. Retire une preuve ou ajuste la recherche.</p></div>';
      return;
    }

    ghostContainer.innerHTML = filtered
      .map((ghost) => {
        const evidenceTags = ghost.evidences
          .map((ev) => `<span>${util.escapeHtml(ev)}</span>`)
          .join("");
        const tests = (ghost.tests || [])
          .map((test) => `<li>${util.escapeHtml(test)}</li>`)
          .join("");

        return `
          <article class="card">
            <div class="ghost-header">
              <h3 class="ghost-title">${util.escapeHtml(ghost.name)}</h3>
              <span class="badge">3 preuves</span>
            </div>
            <div class="evidence-badges">${evidenceTags}</div>
            <div class="data-row">
              <div>
                <div class="data-label">Point fort</div>
                <p>${util.escapeHtml(ghost.strengths)}</p>
              </div>
              <div>
                <div class="data-label">Point faible / angle de verification</div>
                <p>${util.escapeHtml(ghost.weaknesses)}</p>
              </div>
            </div>
            <div class="tip">
              <strong>Tests terrain conseilles:</strong>
              <ul class="list-clean">${tests}</ul>
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
            <td>${util.escapeHtml(ghost.evidences[0])}</td>
            <td>${util.escapeHtml(ghost.evidences[1])}</td>
            <td>${util.escapeHtml(ghost.evidences[2])}</td>
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
