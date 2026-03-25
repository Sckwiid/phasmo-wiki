(function () {
  const data = window.PHASMO_DATA;
  const util = window.PHASMO_UTIL;
  if (!data || !util) return;

  const cardsContainer = document.querySelector("#evidence-cards");
  const matrixBody = document.querySelector("#evidence-matrix-body");
  const knownItems = [
    ...data.equipment.starter.map((item) => item.name),
    ...data.equipment.optional.map((item) => item.name),
    ...data.equipment.truck
  ];
  const itemBySlug = new Map(knownItems.map((item) => [util.slugify(item), item]));
  const itemAliases = new Map([
    ["emf", "Lecteur EMF"],
    ["lecteur-emf", "Lecteur EMF"],
    ["dots", "Projecteur D.O.T.S."],
    ["projecteur-dots", "Projecteur D.O.T.S."],
    ["projecteur-d-o-t-s", "Projecteur D.O.T.S."],
    ["uv", "Lampe UV"],
    ["camera", "Camera video"],
    ["camera-video", "Camera video"],
    ["headgear", "Head Gear"],
    ["head-gear", "Head Gear"],
    ["thermometre", "Thermometre"],
    ["livre-ecriture", "Livre d'ecriture"],
    ["livre-d-ecriture", "Livre d'ecriture"]
  ]);

  function ghostLink(name) {
    return `<a href="../phantomes/${util.slugify(name)}/">${util.escapeHtml(name)}</a>`;
  }

  function resolveItem(cleaned) {
    const slug = util.slugify(cleaned);
    if (!slug) return null;

    if (itemBySlug.has(slug)) {
      return itemBySlug.get(slug);
    }

    if (itemAliases.has(slug)) {
      return itemAliases.get(slug);
    }

    for (const [itemSlug, itemName] of itemBySlug.entries()) {
      if (slug.includes(itemSlug) || itemSlug.includes(slug)) {
        return itemName;
      }
    }

    return null;
  }

  function linkToolPart(part) {
    const cleaned = (part || "").trim();
    if (!cleaned) return "";

    const target = resolveItem(cleaned);

    if (!target) return util.escapeHtml(cleaned);
    return `<a class="tool-link" href="../equipements/items/${util.slugify(target)}/">${util.escapeHtml(cleaned)}</a>`;
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
