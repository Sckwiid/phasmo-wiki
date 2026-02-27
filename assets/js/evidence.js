(function () {
  const data = window.PHASMO_DATA;
  const util = window.PHASMO_UTIL;
  if (!data || !util) return;

  const cardsContainer = document.querySelector("#evidence-cards");
  const matrixBody = document.querySelector("#evidence-matrix-body");

  function renderCards() {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = data.evidences
      .map(
        (evidence) => `
          <article class="card">
            <h3>${util.escapeHtml(evidence.name)}</h3>
            <p><span class="badge">Outil cle: ${util.escapeHtml(evidence.outil)}</span></p>
            <p>${util.escapeHtml(evidence.description)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderMatrix() {
    if (!matrixBody) return;
    matrixBody.innerHTML = data.evidences
      .map((evidence) => {
        const ghostNames = data.ghosts
          .filter((ghost) => ghost.evidences.includes(evidence.name))
          .map((ghost) => ghost.name)
          .join(", ");

        return `
          <tr>
            <th scope="row">${util.escapeHtml(evidence.name)}</th>
            <td>${util.escapeHtml(evidence.outil)}</td>
            <td>${util.escapeHtml(ghostNames)}</td>
          </tr>
        `;
      })
      .join("");
  }

  renderCards();
  renderMatrix();
})();
