(function () {
  const data = window.PHASMO_DATA;
  const util = window.PHASMO_UTIL;
  if (!data || !util) return;

  function mapPath(name) {
    return `${util.slugify(name)}/`;
  }

  function renderList(selector, values, isMapList = false) {
    const node = document.querySelector(selector);
    if (!node) return;
    node.innerHTML = values
      .map((value) => {
        if (!isMapList) return `<li>${util.escapeHtml(value)}</li>`;
        return `<li><a href="${mapPath(value)}">${util.escapeHtml(value)}</a></li>`;
      })
      .join("");
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

  renderList("#maps-small", data.maps.small, true);
  renderList("#maps-medium", data.maps.medium, true);
  renderList("#maps-large", data.maps.large, true);
  renderList("#maps-removed", data.maps.removed, true);
  renderList("#maps-zones", data.maps.investigationZones);
  renderList("#maps-segmentation", data.maps.segmentation);
})();
