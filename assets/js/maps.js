(function () {
  const data = window.PHASMO_DATA;
  const util = window.PHASMO_UTIL;
  if (!data || !util) return;

  function renderList(selector, values) {
    const node = document.querySelector(selector);
    if (!node) return;
    node.innerHTML = values.map((value) => `<li>${util.escapeHtml(value)}</li>`).join("");
  }

  const limitsBody = document.querySelector("#light-limits-body");
  if (limitsBody) {
    limitsBody.innerHTML = data.maps.lightLimits
      .map(
        (item) => `
          <tr>
            <th scope="row">${util.escapeHtml(item.size)}</th>
            <td>${util.escapeHtml(item.maxOn)}</td>
          </tr>
        `
      )
      .join("");
  }

  renderList("#maps-small", data.maps.small);
  renderList("#maps-medium", data.maps.medium);
  renderList("#maps-large", data.maps.large);
  renderList("#maps-removed", data.maps.removed);
  renderList("#maps-zones", data.maps.investigationZones);
  renderList("#maps-segmentation", data.maps.segmentation);
})();
