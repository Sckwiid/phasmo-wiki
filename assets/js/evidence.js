(function () {
  const data = window.PHASMO_DATA;
  const util = window.PHASMO_UTIL;
  if (!data || !util) return;

  const cardsContainer = document.querySelector("#evidence-cards");
  const matrixBody = document.querySelector("#evidence-matrix-body");
  const knownItems = new Set([
    ...data.equipment.starter.map((item) => item.name),
    ...data.equipment.optional.map((item) => item.name),
    ...data.equipment.truck
  ]);

  function ghostLink(name) {
    return `<a href="../phantomes/${util.slugify(name)}/">${util.escapeHtml(name)}</a>`;
  }

  function linkToolPart(part) {
    const cleaned = (part || "").trim();
    if (!cleaned) return "";

    let target = null;
    knownItems.forEach((item) => {
      if (target) return;
      const left = util.slugify(cleaned);
      const right = util.slugify(item);
      if (left === right || left.includes(right) || right.includes(left)) {
        target = item;
      }
    });

    if (!target) return util.escapeHtml(cleaned);
    return `<a href="../equipements/items/${util.slugify(target)}/">${util.escapeHtml(cleaned)}</a>`;
  }

  function linkedToolText(value) {
    return String(value)
      .split("/")
      .map((part) => linkToolPart(part))
      .join(" / ");
  }

  function renderCards() {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = data.evidences
      .map(
        (evidence) => `
          <article class="card">
            <h3>${util.escapeHtml(evidence.name)}</h3>
            <p><span class="badge">Outil cle: ${linkedToolText(evidence.outil)}</span></p>
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
          .map((ghost) => ghostLink(ghost.name))
          .join(", ");

        return `
          <tr>
            <th scope="row">${util.escapeHtml(evidence.name)}</th>
            <td>${linkedToolText(evidence.outil)}</td>
            <td>${ghostNames}</td>
          </tr>
        `;
      })
      .join("");
  }

  renderCards();
  renderMatrix();
})();
