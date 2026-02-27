(function () {
  const data = window.PHASMO_DATA;
  const util = window.PHASMO_UTIL;
  if (!data || !util) return;

  function renderList(selector, values) {
    const node = document.querySelector(selector);
    if (!node) return;
    node.innerHTML = values.map((value) => `<li>${util.escapeHtml(value)}</li>`).join("");
  }

  renderList("#cheatsheet-concepts", data.guide.cheatSheetConcepts);
  renderList("#recommended-flow", data.guide.recommendedFlow);

  const topGhostsByTest = document.querySelector("#top-ghost-tests");
  if (topGhostsByTest) {
    const picks = data.ghosts
      .filter((ghost) =>
        ["Deogen", "Moroi", "Raiju", "Obake", "Goryo", "Yokai", "Poltergeist"].includes(ghost.name)
      )
      .map(
        (ghost) => `
          <tr>
            <th scope="row"><a href="../phantomes/${util.slugify(ghost.name)}/">${util.escapeHtml(ghost.name)}</a></th>
            <td>${util.escapeHtml(ghost.tests.join(" | "))}</td>
          </tr>
        `
      )
      .join("");

    topGhostsByTest.innerHTML = picks;
  }
})();
