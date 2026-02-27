(function () {
  const data = window.PHASMO_DATA;
  const util = window.PHASMO_UTIL;
  if (!data || !util) return;

  function renderList(selector, values) {
    const node = document.querySelector(selector);
    if (!node) return;
    node.innerHTML = values.map((value) => `<li>${util.escapeHtml(value)}</li>`).join("");
  }

  const passiveBody = document.querySelector("#passive-loss-body");
  if (passiveBody) {
    passiveBody.innerHTML = data.mechanics.sanity.passiveLossPerSecond
      .map(
        (entry) => `
          <tr>
            <th scope="row">${util.escapeHtml(entry.mapSize)}</th>
            <td>${util.escapeHtml(entry.prepPhase.toString().replace(".", ","))}</td>
            <td>${util.escapeHtml(entry.normal.toString().replace(".", ","))}</td>
          </tr>
        `
      )
      .join("");
  }

  renderList("#ghost-core-notes", data.mechanics.ghostCore.notes);
  renderList("#ghost-core-states", data.mechanics.ghostCore.states);
  renderList("#roaming-by-difficulty", data.mechanics.ghostCore.roamingByDifficulty);
  renderList("#visibility-rules", data.mechanics.ghostCore.visibility);
  renderList("#electronics-rules", data.mechanics.ghostCore.electronics);
  renderList("#sound-rules", data.mechanics.ghostCore.sounds);

  renderList("#sanity-multipliers", data.mechanics.sanity.passiveLossMultipliers);
  renderList("#sanity-modifiers", data.mechanics.sanity.passiveLossModifiers);
  renderList("#ghost-linked-losses", data.mechanics.sanity.ghostLinkedLosses);
  renderList("#item-linked-changes", data.mechanics.sanity.itemLinkedChanges);
  renderList("#sanity-protections", data.mechanics.sanity.protections);
  renderList("#sanity-objectives", data.mechanics.sanity.objectives);
  renderList("#difficulty-params", data.mechanics.sanity.difficultyParameters);
})();
