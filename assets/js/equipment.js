(function () {
  const data = window.PHASMO_DATA;
  const util = window.PHASMO_UTIL;
  if (!data || !util) return;

  const starterBody = document.querySelector("#starter-body");
  const optionalBody = document.querySelector("#optional-body");
  const upgradeBody = document.querySelector("#upgrade-body");
  const truckList = document.querySelector("#truck-list");

  function itemPath(name) {
    return `items/${util.slugify(name)}/`;
  }

  function rowFromItem(item) {
    return `
      <tr>
        <th scope="row"><a href="${itemPath(item.name)}">${util.escapeHtml(item.name)}</a></th>
        <td>${util.formatMoney(item.price)}</td>
        <td>${util.escapeHtml(item.max)}</td>
        <td>${util.escapeHtml(item.role)}</td>
      </tr>
    `;
  }

  function renderStarter() {
    if (!starterBody) return;
    starterBody.innerHTML = data.equipment.starter.map(rowFromItem).join("");
  }

  function renderOptional() {
    if (!optionalBody) return;
    optionalBody.innerHTML = data.equipment.optional.map(rowFromItem).join("");
  }

  function renderUpgrades() {
    if (!upgradeBody) return;
    upgradeBody.innerHTML = data.equipment.upgrades
      .map(
        (item) => `
          <tr>
            <th scope="row"><a href="${itemPath(item.name)}">${util.escapeHtml(item.name)}</a></th>
            <td>${util.formatMoney(item.cost)}</td>
            <td>${item.defaultItem ? "Oui" : "Non"}</td>
            <td>${util.escapeHtml(item.max)}</td>
            <td>${util.escapeHtml(item.tier1)}</td>
            <td>${util.escapeHtml(item.tier2)}</td>
            <td>${util.escapeHtml(item.tier3)}</td>
          </tr>
        `
      )
      .join("");
  }

  function renderTruck() {
    if (!truckList) return;
    truckList.innerHTML = data.equipment.truck
      .map((item) => `<li><a href="${itemPath(item)}">${util.escapeHtml(item)}</a></li>`)
      .join("");
  }

  renderStarter();
  renderOptional();
  renderUpgrades();
  renderTruck();
})();
