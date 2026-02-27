(function () {
  const data = window.PHASMO_DATA;
  const util = window.PHASMO_UTIL;
  if (!data || !util) return;

  const sourceList = document.querySelector("#source-files");
  if (sourceList) {
    sourceList.innerHTML = data.sources
      .map((src) => `<li>${util.escapeHtml(src)}</li>`)
      .join("");
  }

  const sourceCount = document.querySelector("#source-count");
  if (sourceCount) {
    sourceCount.textContent = data.sources.length;
  }
})();
