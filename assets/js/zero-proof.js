(function () {
  const data = window.PHASMO_DATA;
  const util = window.PHASMO_UTIL;
  if (!data || !util) return;

  const state = {
    hunt: "",
    speed: "",
    los: "",
    interfere: "",
    query: ""
  };

  const controlsForm = document.querySelector("#zp-form");
  const huntSelect = document.querySelector("#zp-hunt");
  const speedSelect = document.querySelector("#zp-speed");
  const losSelect = document.querySelector("#zp-los");
  const interfereSelect = document.querySelector("#zp-interfere");
  const queryInput = document.querySelector("#zp-query");
  const countNode = document.querySelector("#zp-count");
  const finalNode = document.querySelector("#zp-final");
  const listNode = document.querySelector("#zp-list");
  const tagsNode = document.querySelector("#zp-tags");

  const quickTags = [
    "bougie",
    "disjoncteur",
    "encens",
    "sel",
    "teleport",
    "parabolique",
    "lumiere",
    "vitesse"
  ];

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function parsePercentages(text) {
    const values = [];
    const source = String(text || "");
    const regex = /(\d+)\s*%/g;
    let match = regex.exec(source);
    while (match) {
      values.push(Number(match[1]));
      match = regex.exec(source);
    }
    return values;
  }

  function parseSpeeds(text) {
    const values = [];
    const source = String(text || "");
    const regex = /(\d+(?:\.\d+)?)\s*m\/s/g;
    let match = regex.exec(source);
    while (match) {
      values.push(Number(match[1]));
      match = regex.exec(source);
    }
    return values;
  }

  function statFor(ghostName) {
    return (data.ghostStats && data.ghostStats[ghostName]) || {
      hunt: "Variable",
      speed: "Variable",
      los: "Variable",
      interfere: "10 m",
      nerd: ""
    };
  }

  function losProfile(losText) {
    const text = normalize(losText);
    if (text.includes("pas de boost")) return "no-boost";
    if (text.includes("lock")) return "lock";
    if (text.includes("variable") || text.includes("boost") || text.includes("conditionnel")) {
      return "boost";
    }
    return "standard";
  }

  function buildProfile(ghost) {
    const stats = statFor(ghost.name);
    const huntValues = parsePercentages(stats.hunt);
    const speedValues = parseSpeeds(stats.speed);
    const speedText = normalize(stats.speed);

    const minHunt = huntValues.length ? Math.min(...huntValues) : null;
    const maxHunt = huntValues.length ? Math.max(...huntValues) : null;

    const minSpeed = speedValues.length ? Math.min(...speedValues) : null;
    const maxSpeed = speedValues.length ? Math.max(...speedValues) : null;

    const slow = minSpeed !== null ? minSpeed <= 1.2 : speedText.includes("lent");
    const fast = maxSpeed !== null ? maxSpeed >= 2.3 : speedText.includes("rapide") || speedText.includes("boost");
    const variable = speedValues.length > 1
      ? maxSpeed - minSpeed >= 0.8
      : speedText.includes("variable") || speedText.includes("selon");
    const normal = speedValues.length
      ? minSpeed >= 1.4 && maxSpeed <= 1.9
      : speedText.includes("1.7");

    const haystack = normalize(
      [
        ghost.name,
        ghost.strengths,
        ghost.weaknesses,
        ...(ghost.tests || []),
        stats.hunt,
        stats.speed,
        stats.los,
        stats.interfere,
        stats.nerd
      ].join(" ")
    );

    return {
      stats,
      huntLow: minHunt !== null ? minHunt <= 40 : false,
      huntStandard: huntValues.includes(50),
      huntHigh: maxHunt !== null ? maxHunt >= 60 : false,
      slow,
      fast,
      normal,
      variable,
      los: losProfile(stats.los),
      interfere: String(stats.interfere || "").includes("15") ? "15" : "10",
      haystack
    };
  }

  function matches(profile) {
    if (state.hunt === "low" && !profile.huntLow) return false;
    if (state.hunt === "standard" && !profile.huntStandard) return false;
    if (state.hunt === "high" && !profile.huntHigh) return false;

    if (state.speed === "slow" && !profile.slow) return false;
    if (state.speed === "normal" && !profile.normal) return false;
    if (state.speed === "fast" && !profile.fast) return false;
    if (state.speed === "variable" && !profile.variable) return false;

    if (state.los && profile.los !== state.los) return false;
    if (state.interfere && profile.interfere !== state.interfere) return false;

    if (state.query && !profile.haystack.includes(normalize(state.query))) return false;

    return true;
  }

  function candidateCard(ghost, profile) {
    const firstTest = ghost.tests && ghost.tests.length ? ghost.tests[0] : "Verifier un test comportemental en chasse.";
    return `
      <article class="card">
        <h3><a href="../phantomes/${util.slugify(ghost.name)}/">${util.escapeHtml(ghost.name)}</a></h3>
        <p class="zp-mini"><strong>Seuil chasse:</strong> ${util.escapeHtml(profile.stats.hunt)}</p>
        <p class="zp-mini"><strong>Vitesse:</strong> ${util.escapeHtml(profile.stats.speed)}</p>
        <p class="zp-mini"><strong>LOS:</strong> ${util.escapeHtml(profile.stats.los)}</p>
        <p class="zp-mini"><strong>Interferences:</strong> ${util.escapeHtml(profile.stats.interfere)}</p>
        <p class="zp-mini"><strong>Test rapide:</strong> ${util.escapeHtml(firstTest)}</p>
      </article>
    `;
  }

  function render() {
    if (!countNode || !listNode || !finalNode) return;

    const filtered = data.ghosts
      .map((ghost) => ({ ghost, profile: buildProfile(ghost) }))
      .filter(({ profile }) => matches(profile));

    countNode.textContent = `${filtered.length} entite(s) possible(s)`;

    if (filtered.length === 0) {
      finalNode.innerHTML = "";
      listNode.innerHTML =
        '<article class="card"><p>Aucun resultat avec ces criteres. Elargis un filtre ou supprime un mot-cle.</p></article>';
      return;
    }

    if (filtered.length === 1) {
      const { ghost, profile } = filtered[0];
      const tests = (ghost.tests || [])
        .map((test) => `<li>${util.escapeHtml(test)}</li>`)
        .join("");

      finalNode.innerHTML = `
        <div class="zp-final">
          <p class="badge">Entite finale probable</p>
          <h3><a href="../phantomes/${util.slugify(ghost.name)}/">${util.escapeHtml(ghost.name)}</a></h3>
          <p class="zp-mini"><strong>Seuil chasse:</strong> ${util.escapeHtml(profile.stats.hunt)} · <strong>Vitesse:</strong> ${util.escapeHtml(profile.stats.speed)}</p>
          <ul class="list-clean">${tests}</ul>
        </div>
      `;
    } else {
      finalNode.innerHTML = "";
    }

    listNode.innerHTML = filtered
      .map(({ ghost, profile }) => candidateCard(ghost, profile))
      .join("");
  }

  function renderQuickTags() {
    if (!tagsNode) return;
    tagsNode.innerHTML = quickTags
      .map(
        (tag) =>
          `<button type="button" class="pill" data-zp-tag="${util.escapeHtml(tag)}">${util.escapeHtml(tag)}</button>`
      )
      .join("");

    tagsNode.querySelectorAll("[data-zp-tag]").forEach((button) => {
      button.addEventListener("click", () => {
        const tag = button.getAttribute("data-zp-tag") || "";
        state.query = tag;
        if (queryInput) queryInput.value = tag;
        render();
      });
    });
  }

  function syncStateFromInputs() {
    state.hunt = huntSelect ? huntSelect.value : "";
    state.speed = speedSelect ? speedSelect.value : "";
    state.los = losSelect ? losSelect.value : "";
    state.interfere = interfereSelect ? interfereSelect.value : "";
    state.query = queryInput ? queryInput.value.trim() : "";
  }

  if (controlsForm) {
    controlsForm.addEventListener("change", () => {
      syncStateFromInputs();
      render();
    });

    controlsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      syncStateFromInputs();
      render();
    });
  }

  if (queryInput) {
    queryInput.addEventListener("input", () => {
      syncStateFromInputs();
      render();
    });
  }

  const resetButton = document.querySelector("#zp-reset");
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      if (controlsForm) controlsForm.reset();
      state.hunt = "";
      state.speed = "";
      state.los = "";
      state.interfere = "";
      state.query = "";
      render();
    });
  }

  renderQuickTags();
  render();
})();
