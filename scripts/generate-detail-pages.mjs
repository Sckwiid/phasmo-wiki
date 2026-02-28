import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const SITE_BASE = "https://julien.github.io/phasmo-wiki";
const root = process.cwd();
const PAGE_IMAGES = {
  ghosts: {
    Banshee: [
      { src: "assets/images/ghosts/banshee.png", alt: "Banshee en manifestation" }
    ],
    Cauchemar: [
      { src: "assets/images/ghosts/cauchemar.jpg", alt: "Cauchemar en manifestation" }
    ],
    Demon: [
      { src: "assets/images/ghosts/demon.jpg", alt: "Demon en manifestation" }
    ],
    Deogen: [
      { src: "assets/images/ghosts/deogen.png", alt: "Deogen en manifestation" }
    ],
    Djinn: [
      { src: "assets/images/ghosts/djinn.png", alt: "Djinn en manifestation" }
    ],
    Esprit: [
      { src: "assets/images/ghosts/esprit.png", alt: "Esprit en manifestation" }
    ],
    Fantome: [
      { src: "assets/images/ghosts/fantome.jpg", alt: "Fantome en manifestation (capture 1)" },
      { src: "assets/images/ghosts/fantome-alt.jpg", alt: "Fantome en manifestation (capture 2)" }
    ],
    Goryo: [
      { src: "assets/images/ghosts/goryo.png", alt: "Goryo en manifestation" }
    ],
    Hantu: [
      { src: "assets/images/ghosts/hantu.jpg", alt: "Hantu en manifestation" }
    ],
    "Le Mimic": [
      { src: "assets/images/ghosts/le-mimic.png", alt: "Le Mimic en manifestation" }
    ],
    "Les Jumeaux": [
      { src: "assets/images/ghosts/les-jumeaux.png", alt: "Les Jumeaux en manifestation" }
    ],
    Moroi: [
      { src: "assets/images/ghosts/moroi.png", alt: "Moroi en manifestation" }
    ],
    Myling: [
      { src: "assets/images/ghosts/myling.png", alt: "Myling en manifestation" }
    ],
    Obake: [
      { src: "assets/images/ghosts/obake.png", alt: "Obake en manifestation" }
    ],
    Ombre: [
      { src: "assets/images/ghosts/ombre.jpg", alt: "Ombre en manifestation" }
    ],
    Oni: [
      { src: "assets/images/ghosts/oni.jpg", alt: "Oni en manifestation" }
    ],
    Onryo: [
      { src: "assets/images/ghosts/onryo.png", alt: "Onryo en manifestation" }
    ],
    Poltergeist: [
      { src: "assets/images/ghosts/poltergeist.jpg", alt: "Poltergeist en manifestation" }
    ],
    Raiju: [
      { src: "assets/images/ghosts/raiju.png", alt: "Raiju en manifestation" }
    ],
    Revenant: [
      { src: "assets/images/ghosts/revenant.jpg", alt: "Revenant en manifestation" }
    ],
    Spectre: [
      { src: "assets/images/ghosts/spectre.png", alt: "Spectre en manifestation" }
    ],
    Thaye: [
      { src: "assets/images/ghosts/thaye.png", alt: "Thaye en manifestation" }
    ],
    Yokai: [
      { src: "assets/images/ghosts/yokai.jpg", alt: "Yokai en manifestation" }
    ],
    Yurei: [
      { src: "assets/images/ghosts/yurei.png", alt: "Yurei en manifestation" }
    ]
  },
  maps: {
    "10 Ridgeview Court": [
      { src: "assets/images/maps/FR_Parent_Ridgeview.png", alt: "Plan de 10 Ridgeview Court" }
    ],
    "13 Willow Street": [
      { src: "assets/images/maps/FR_Parent_Willow.png", alt: "Plan de 13 Willow Street" }
    ],
    "42 Edgefield Road": [
      { src: "assets/images/maps/FR_Parent_Edgefield-1.png", alt: "Plan de 42 Edgefield Road" }
    ],
    "6 Tanglewood Drive": [
      { src: "assets/images/maps/tanglewood.png", alt: "Plan de 6 Tanglewood Drive" },
      { src: "assets/images/maps/tanglewood-alt.png", alt: "Plan alternatif de 6 Tanglewood Drive" }
    ],
    "Bleasdale Farmhouse": [
      { src: "assets/images/maps/bleasdale_newMapFR.png", alt: "Plan de Bleasdale Farmhouse" }
    ],
    "Brownstone High School": [
      { src: "assets/images/maps/FR_Parent_Brownstone_High_School-scaled.png", alt: "Plan de Brownstone High School" }
    ],
    "Camp Woodwind": [
      { src: "assets/images/maps/Woodwind_PhasmoFR.png", alt: "Plan de Camp Woodwind" }
    ],
    "Grafton Farmhouse": [
      { src: "assets/images/maps/Map_grafton_new_fr.png", alt: "Plan de Grafton Farmhouse" }
    ],
    "Maple Lodge Campsite": [
      { src: "assets/images/maps/FR_Parent_Maple_Lodge.png", alt: "Plan de Maple Lodge Campsite" }
    ],
    "Nell's Diner": [
      { src: "assets/images/maps/FR_Parent_Nells_DinerPhasmo.png", alt: "Plan de Nell's Diner" }
    ],
    "Point Hope": [
      { src: "assets/images/maps/FR_Parent_Point_Hope.png", alt: "Plan de Point Hope" }
    ],
    Prison: [
      { src: "assets/images/maps/FR_Parent_Prison.png", alt: "Plan de Prison" },
      { src: "assets/images/maps/FR_Parent_Prison-scaled.png", alt: "Plan de Prison (scaled)" }
    ],
    "Sunny Meadows": [
      { src: "assets/images/maps/sunnymeadows-scaled.png", alt: "Plan de Sunny Meadows Mental Institution" }
    ],
    "Sunny Meadows Restricted": [
      { src: "assets/images/maps/FR_Parent_Restricted_SM_Courtyard.png", alt: "Plan Sunny Meadows Restricted - Courtyard" },
      { src: "assets/images/maps/FR_Parent_Restricted_SM_Female.png", alt: "Plan Sunny Meadows Restricted - Female Wing" },
      { src: "assets/images/maps/FR_Parent_Restricted_SM_Hospital.png", alt: "Plan Sunny Meadows Restricted - Hospital Wing" },
      { src: "assets/images/maps/FR_Parent_Restricted_SM_Male.png", alt: "Plan Sunny Meadows Restricted - Male Wing" },
      { src: "assets/images/maps/FR_Parent_Restricted_SM_Restricted.png", alt: "Plan Sunny Meadows Restricted - Full View" }
    ]
  },
  equipment: {
    "Projecteur D.O.T.S.": [
      { src: "assets/images/equipment/dots-t1.jpeg", alt: "Projecteur D.O.T.S. Tier I" },
      { src: "assets/images/equipment/dots-t2.jpeg", alt: "Projecteur D.O.T.S. Tier II" },
      { src: "assets/images/equipment/dots-t3.jpeg", alt: "Projecteur D.O.T.S. Tier III" }
    ],
    "Lecteur EMF": [
      { src: "assets/images/equipment/emf-t1.jpeg", alt: "Lecteur EMF Tier I" },
      { src: "assets/images/equipment/emf-t2.jpeg", alt: "Lecteur EMF Tier II" },
      { src: "assets/images/equipment/EMF-Tier-3-By-Phasmo-FR.jpeg", alt: "Lecteur EMF Tier III" }
    ]
  },
  cursed: {}
};

function readData() {
  const source = fs.readFileSync(path.join(root, "assets/js/data.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  return sandbox.window.PHASMO_DATA;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function evidenceClass(name) {
  const n = String(name || "").toLowerCase();
  if (n.includes("emf")) return "ev-emf";
  if (n.includes("d.o.t.s") || n.includes("dots")) return "ev-dots";
  if (n.includes("ultraviolet")) return "ev-uv";
  if (n.includes("glaciales") || n.includes("freezing")) return "ev-freezing";
  if (n.includes("orbe") || n.includes("orb")) return "ev-orbs";
  if (n.includes("ecriture") || n.includes("writing")) return "ev-writing";
  if (n.includes("spirit box")) return "ev-spiritbox";
  return "";
}

function extractUpgradePrice(text) {
  const value = String(text || "");
  const match = value.match(/\+\s*([0-9 ]+)\$/);
  if (!match) return "Inclus";
  return `${match[1].replace(/\s+/g, " ").trim()} $`;
}

function tierDescription(data, itemName, tierKey) {
  const notes = data.equipmentTierNotes || {};
  const itemNotes = notes[itemName];
  if (!itemNotes || !itemNotes[tierKey]) {
    return "Description d'amelioration non detaillee dans la source locale.";
  }
  return itemNotes[tierKey];
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(relPath, content) {
  const abs = path.join(root, relPath);
  ensureDir(path.dirname(abs));
  fs.writeFileSync(abs, content, "utf8");
}

function nav(prefix, currentSection) {
  const items = [
    ["home", "Accueil", `${prefix}`],
    ["ghosts", "Fantomes", `${prefix}phantomes/`],
    ["evidence", "Preuves", `${prefix}preuves/`],
    ["gear", "Equipements", `${prefix}equipements/`],
    ["cursed", "Objets maudits", `${prefix}objets-maudits/`],
    ["maps", "Cartes", `${prefix}cartes/`],
    ["mechanics", "Mecaniques", `${prefix}mecaniques/`],
    ["guide", "Guide avance", `${prefix}guide-avance/`]
  ];

  return items
    .map(([key, label, href]) => {
      const current = key === currentSection ? ' aria-current="page"' : "";
      return `<a${current} href="${href}">${label}</a>`;
    })
    .join("\n        ");
}

function pageTemplate({
  title,
  description,
  canonicalPath,
  theme,
  prefix,
  currentSection,
  brandSub,
  breadcrumb,
  content,
  schema
}) {
  const canonical = `${SITE_BASE}${canonicalPath}`;

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow">
  <meta name="theme-color" content="#090a0c">
  <link rel="canonical" href="${escapeHtml(canonical)}">

  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&amp;family=Work+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${prefix}assets/css/style.css">

  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body class="${theme}">
  <a class="skip-link" href="#main-content">Aller au contenu</a>

  <header class="site-header">
    <div class="container nav-wrap">
      <a class="brand" href="${prefix}" aria-label="Accueil Wiki Phasmophobia FR">
        <p class="brand-title">Wiki Phasmophobia FR</p>
        <span class="brand-sub">${escapeHtml(brandSub)}</span>
      </a>
      <nav class="main-nav" aria-label="Navigation principale">
        ${nav(prefix, currentSection)}
      </nav>
    </div>
  </header>

  <main id="main-content" class="page container">
    <p class="breadcrumb">${breadcrumb}</p>
    ${content}
  </main>

  <footer class="page-footer">
    <div class="container footer-grid">
      <div>
        <strong>Wiki Phasmophobia FR</strong>
        <p>Fiche detaillee optimisee pour GitHub Pages.</p>
      </div>
      <div>
        <strong>Navigation rapide</strong>
        <p><a href="${prefix}phantomes/">Fantomes</a> · <a href="${prefix}equipements/">Equipements</a> · <a href="${prefix}objets-maudits/">Objets maudits</a> · <a href="${prefix}cartes/">Cartes</a></p>
      </div>
      <div>
        <p>© <span data-year></span> - Wiki Phasmophobia FR</p>
      </div>
    </div>
  </footer>

  <script src="${prefix}assets/js/data.js"></script>
  <script src="${prefix}assets/js/site.js"></script>
</body>
</html>
`;
}

function imageSourceCredit() {
  return '<p class="image-credit">Source image: <a href="https://www.phasmophobia-fr.com/wiki-phasmophobia-fr/" rel="noopener noreferrer">https://www.phasmophobia-fr.com/wiki-phasmophobia-fr/</a></p>';
}

function imageSet(category, key) {
  const bucket = PAGE_IMAGES[category] || {};
  return bucket[key] || [];
}

function renderImageSlot({ images, prefix, fallbackTitle, fallbackHint }) {
  if (!images || images.length === 0) {
    return `<div class="image-slot">${escapeHtml(fallbackTitle)}<br>(${escapeHtml(fallbackHint)})</div>`;
  }

  const gallery = images
    .map(
      (image) =>
        `<figure class="image-figure"><img src="${prefix}${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" decoding="async"></figure>`
    )
    .join("");

  const multi = images.length > 1 ? " image-slot-multi" : "";
  return `<div class="image-slot image-slot-filled${multi}">${gallery}</div>`;
}

function mergeItemData(data) {
  const items = new Map();

  function getOrCreate(name) {
    if (!items.has(name)) {
      items.set(name, {
        name,
        categories: new Set(),
        price: null,
        max: null,
        role: "",
        upgrade: null
      });
    }
    return items.get(name);
  }

  data.equipment.starter.forEach((item) => {
    const target = getOrCreate(item.name);
    target.categories.add("Starter");
    target.price = item.price;
    target.max = item.max;
    target.role = item.role;
  });

  data.equipment.optional.forEach((item) => {
    const target = getOrCreate(item.name);
    target.categories.add("Optionnel");
    target.price = item.price;
    target.max = item.max;
    target.role = item.role;
  });

  data.equipment.upgrades.forEach((up) => {
    const target = getOrCreate(up.name);
    target.categories.add("Upgradeable");
    target.max = target.max ?? up.max;
    target.price = target.price ?? up.cost;
    target.upgrade = up;
  });

  data.equipment.truck.forEach((name) => {
    const target = getOrCreate(name);
    target.categories.add("Camion");
    if (!target.role) target.role = "Element fixe du camion de surveillance.";
  });

  return Array.from(items.values()).sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

function buildEvidenceItemMap() {
  return {
    "EMF niveau 5": ["Lecteur EMF"],
    "Projecteur D.O.T.S.": ["Projecteur D.O.T.S."],
    "Ultraviolet": ["Lampe UV"],
    "Temperatures glaciales": ["Thermometre"],
    "Orbe fantomatique": ["Camera video", "Head Gear"],
    "Ecriture fantomatique": ["Livre d'ecriture"],
    "Spirit Box": ["Spirit Box"]
  };
}

function buildGhostPages(data) {
  const evidenceToItems = buildEvidenceItemMap();

  data.ghosts.forEach((ghost) => {
    const slug = slugify(ghost.name);
    const stats = data.ghostStats[ghost.name] || {
      hunt: "Variable",
      speed: "Variable",
      los: "Variable",
      interfere: "10 m",
      nerd: "Profil en cours de consolidation."
    };

    const evidenceChips = ghost.evidences
      .map(
        (ev) => `<span class="evidence-chip ${evidenceClass(ev)}">${escapeHtml(ev)}</span>`
      )
      .join("");

    const evidenceLinks = ghost.evidences
      .map((ev) => `<li><a href="../../preuves/">${escapeHtml(ev)}</a></li>`)
      .join("");

    const relatedItems = Array.from(
      new Set(ghost.evidences.flatMap((ev) => evidenceToItems[ev] || []))
    );

    const relatedItemLinks = relatedItems
      .map(
        (item) =>
          `<a class="badge" href="../../equipements/items/${slugify(item)}/">${escapeHtml(item)}</a>`
      )
      .join("");

    const tests = (ghost.tests || [])
      .map((test) => `<li>${escapeHtml(test)}</li>`)
      .join("");
    const ghostImages = imageSet("ghosts", ghost.name);

    const content = `
    <section class="detail-page">
      <article class="detail-head">
        <span class="badge">Fiche fantome</span>
        <h1 class="detail-title">${escapeHtml(ghost.name)}</h1>
        <p class="detail-sub">Synthese recoupee des preuves, stats de chasse et tests de verification terrain.</p>
        <div class="detail-badges">${evidenceChips}</div>
      </article>

      <section class="detail-grid">
        <article class="card">
          <h2>Visuel du fantome</h2>
          ${renderImageSlot({
            images: ghostImages,
            prefix: "../../",
            fallbackTitle: `Zone image prevue pour ${ghost.name}`,
            fallbackHint: "illustration / modele en jeu"
          })}
          ${imageSourceCredit()}
          <p class="detail-note">Ajoute ici une capture en manifestation ou une image de modele pour reconnaissance rapide.</p>
        </article>

        <article class="card">
          <h2>Stats de chasse</h2>
          <div class="nerd-row">
            <div class="stat-pill">
              <span class="stat-label">
                <span class="stat-icon">🧠</span>Seuil chasse
                <span class="info-tip" tabindex="0" data-tip="Pourcentage de sanite permettant le depart de chasse selon les conditions du fantome.">?</span>
              </span>
              <span class="stat-value">${escapeHtml(stats.hunt)}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-label">
                <span class="stat-icon">👣</span>Vitesse
                <span class="info-tip" tabindex="0" data-tip="Vitesse de deplacement pendant la chasse, avec ou sans boost conditionnel.">?</span>
              </span>
              <span class="stat-value">${escapeHtml(stats.speed)}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-label">
                <span class="stat-icon">👁</span>LOS
                <span class="info-tip" tabindex="0" data-tip="LOS = line of sight: impact de la vision continue du joueur sur la vitesse en chasse.">?</span>
              </span>
              <span class="stat-value">${escapeHtml(stats.los)}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-label">
                <span class="stat-icon">📡</span>Interference
                <span class="info-tip" tabindex="0" data-tip="Distance d'interference electronique (radio/lampe/equipements) autour du fantome.">?</span>
              </span>
              <span class="stat-value">${escapeHtml(stats.interfere)}</span>
            </div>
          </div>
          <p class="ghost-desc"><strong>Pro tip:</strong> ${escapeHtml(stats.nerd)}</p>
        </article>
      </section>

      <section class="grid grid-2">
        <article class="card">
          <h2>Tells et comportement</h2>
          <ul class="list-clean">
            <li><strong>Force:</strong> ${escapeHtml(ghost.strengths)}</li>
            <li><strong>Faiblesse:</strong> ${escapeHtml(ghost.weaknesses)}</li>
          </ul>
          <p><strong>Tests 0 preuve / verification</strong></p>
          <ul class="list-clean">${tests}</ul>
        </article>

        <article class="card">
          <h2>Liens d'enquete</h2>
          <p><strong>Preuves associees:</strong></p>
          <ul class="list-clean">${evidenceLinks}</ul>
          <p><strong>Equipements utiles:</strong></p>
          <div class="detail-badges">${relatedItemLinks || '<span class="badge">Aucun equipement specifique</span>'}</div>
          <p class="detail-note">Valide toujours avec la page <a href="../">Fantomes</a> pour recouper preuves + comportement en chasse.</p>
        </article>
      </section>
    </section>`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${ghost.name} - Wiki Phasmophobia FR`,
      inLanguage: "fr",
      mainEntityOfPage: `${SITE_BASE}/phantomes/${slug}/`,
      about: "Phasmophobia",
      description: `${ghost.name}: preuves, comportement, stats de chasse et tests 0 preuve.`
    };

    const html = pageTemplate({
      title: `${ghost.name} | Fiche fantome Phasmophobia FR`,
      description: `${ghost.name}: preuves, seuil de chasse, vitesse, LOS, interference et tests 0 preuve en francais.`,
      canonicalPath: `/phantomes/${slug}/`,
      theme: "theme-ghosts",
      prefix: "../../",
      currentSection: "ghosts",
      brandSub: "Fiche fantome",
      breadcrumb: `<a href="../../">Accueil</a> / <a href="../">Fantomes</a> / ${escapeHtml(ghost.name)}`,
      content,
      schema
    });

    writeFile(path.join("phantomes", slug, "index.html"), html);
  });
}

function buildItemPages(data) {
  const items = mergeItemData(data);
  const evidenceToItems = buildEvidenceItemMap();

  items.forEach((item) => {
    const slug = slugify(item.name);

    const relatedEvidences = data.evidences.filter((ev) => (evidenceToItems[ev.name] || []).includes(item.name));

    const relatedGhosts = Array.from(
      new Set(
        data.ghosts
          .filter((ghost) => ghost.evidences.some((ev) => relatedEvidences.map((e) => e.name).includes(ev)))
          .map((ghost) => ghost.name)
      )
    );

    const categories = Array.from(item.categories);
    const categoryBadges = categories.map((cat) => `<span class="badge">${escapeHtml(cat)}</span>`).join("");

    const upgradeTable = item.upgrade
      ? `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Deblocage</th>
              <th>Prix amelio</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Tier I</th>
              <td>${escapeHtml(item.upgrade.tier1)}</td>
              <td>Inclus (tier de base)</td>
              <td>${escapeHtml(tierDescription(data, item.name, "tier1"))}</td>
            </tr>
            <tr>
              <th scope="row">Tier II</th>
              <td>${escapeHtml(item.upgrade.tier2)}</td>
              <td>${escapeHtml(extractUpgradePrice(item.upgrade.tier2))}</td>
              <td>${escapeHtml(tierDescription(data, item.name, "tier2"))}</td>
            </tr>
            <tr>
              <th scope="row">Tier III</th>
              <td>${escapeHtml(item.upgrade.tier3)}</td>
              <td>${escapeHtml(extractUpgradePrice(item.upgrade.tier3))}</td>
              <td>${escapeHtml(tierDescription(data, item.name, "tier3"))}</td>
            </tr>
          </tbody>
        </table>
      </div>`
      : '<p class="detail-note">Pas de palier d\'amelioration specifique reference pour cet element.</p>';

    const evidenceLinks = relatedEvidences.length
      ? relatedEvidences
          .map((ev) => `<li><a href="../../../preuves/">${escapeHtml(ev.name)}</a> (${escapeHtml(ev.description)})</li>`)
          .join("")
      : '<li>Aucune preuve directe associee.</li>';

    const ghostLinks = relatedGhosts.length
      ? relatedGhosts
          .map((name) => `<a class="badge" href="../../../phantomes/${slugify(name)}/">${escapeHtml(name)}</a>`)
          .join("")
      : '<span class="badge">Aucun lien direct fantome/preuve</span>';
    const itemImages = imageSet("equipment", item.name);

    const content = `
    <section class="detail-page">
      <article class="detail-head">
        <span class="badge">Fiche equipement</span>
        <h1 class="detail-title">${escapeHtml(item.name)}</h1>
        <p class="detail-sub">Informations de role, budget, limites et synergies avec preuves/fantomes.</p>
        <div class="detail-badges">${categoryBadges}</div>
      </article>

      <section class="detail-grid">
        <article class="card">
          <h2>Visuel de l'objet</h2>
          ${renderImageSlot({
            images: itemImages,
            prefix: "../../../",
            fallbackTitle: `Zone image prevue pour ${item.name}`,
            fallbackHint: "objet en inventaire / rendu en jeu"
          })}
          ${imageSourceCredit()}
          <p class="detail-note">Ajoute une capture de l'objet en main + pose dans la piece hantee.</p>
        </article>

        <article class="card">
          <h2>Infos rapides</h2>
          <ul class="list-clean">
            <li><strong>Prix:</strong> ${item.price !== null ? `${item.price} $` : "N/A"}</li>
            <li><strong>Limite / partie:</strong> ${item.max !== null ? escapeHtml(item.max) : "N/A"}</li>
            <li><strong>Role:</strong> ${escapeHtml(item.role || "Non precise")}</li>
          </ul>
          <p class="detail-note">La rentabilite depend du mode de difficulte, du type de carte et du plan de test choisi.</p>
        </article>
      </section>

      <section class="grid grid-2">
        <article class="card">
          <h2>Paliers d'amelioration</h2>
          ${upgradeTable}
        </article>

        <article class="card">
          <h2>Preuves et entites associees</h2>
          <p><strong>Preuves detectees via cet objet:</strong></p>
          <ul class="list-clean">${evidenceLinks}</ul>
          <p><strong>Fantomes concernes:</strong></p>
          <div class="detail-badges">${ghostLinks}</div>
        </article>
      </section>
    </section>`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${item.name} - Wiki Phasmophobia FR`,
      inLanguage: "fr",
      mainEntityOfPage: `${SITE_BASE}/equipements/items/${slug}/`,
      about: "Equipement Phasmophobia",
      description: `${item.name}: role, cout, limites, upgrades et usage en enquete.`
    };

    const html = pageTemplate({
      title: `${item.name} | Equipement Phasmophobia FR`,
      description: `${item.name}: prix, limite, role, upgrades et liens avec preuves/fantomes.`,
      canonicalPath: `/equipements/items/${slug}/`,
      theme: "theme-gear",
      prefix: "../../../",
      currentSection: "gear",
      brandSub: "Fiche equipement",
      breadcrumb: `<a href="../../../">Accueil</a> / <a href="../../">Equipements</a> / ${escapeHtml(item.name)}`,
      content,
      schema
    });

    writeFile(path.join("equipements", "items", slug, "index.html"), html);
  });
}

function buildMapPages(data) {
  const mapSizes = new Map();
  data.maps.small.forEach((name) => mapSizes.set(name, "Petite"));
  data.maps.medium.forEach((name) => mapSizes.set(name, "Moyenne"));
  data.maps.large.forEach((name) => mapSizes.set(name, "Grande"));
  data.maps.removed.forEach((name) => mapSizes.set(name, "Retiree"));

  const lightLimitBySize = new Map(data.maps.lightLimits.map((entry) => [entry.size, entry.maxOn]));

  const allMaps = Array.from(mapSizes.keys()).sort((a, b) => a.localeCompare(b, "fr"));

  allMaps.forEach((mapName) => {
    const slug = slugify(mapName);
    const mapSlug = slugify(mapName);
    const size = mapSizes.get(mapName) || "Inconnue";
    const lightLimit = lightLimitBySize.get(size) ?? "N/A";

    const mapNotes = data.maps.investigationZones.filter((note) => slugify(note).includes(mapSlug));
    const segmentationNotes = data.maps.segmentation.filter((note) => slugify(note).includes(mapSlug));

    const mapNotesHtml = mapNotes.length
      ? mapNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")
      : "<li>Aucune zone speciale referencee pour cette carte dans les sources locales.</li>";

    const segmentationHtml = segmentationNotes.length
      ? segmentationNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")
      : "<li>Pas de decoupage particulier mentionne dans la synthese locale.</li>";
    const mapImages = imageSet("maps", mapName);

    const content = `
    <section class="detail-page">
      <article class="detail-head">
        <span class="badge">Fiche carte</span>
        <h1 class="detail-title">${escapeHtml(mapName)}</h1>
        <p class="detail-sub">Repere complet pour enquete: taille, lumiere, zones specifiques et segmentation logique.</p>
        <div class="detail-badges">
          <span class="badge">Taille: ${escapeHtml(size)}</span>
          <span class="badge">Lumiere max: ${escapeHtml(lightLimit)}</span>
        </div>
      </article>

      <section class="detail-grid">
        <article class="card">
          <h2>Plan de la carte</h2>
          ${renderImageSlot({
            images: mapImages,
            prefix: "../../",
            fallbackTitle: `Zone image prevue pour ${mapName}`,
            fallbackHint: "plan complet / callouts de zones"
          })}
          ${imageSourceCredit()}
          <p class="detail-note">Ajoute un plan annote (spawn, caches, chemins de fuite, zones de test).</p>
        </article>

        <article class="card">
          <h2>Infos rapides</h2>
          <ul class="list-clean">
            <li><strong>Taille:</strong> ${escapeHtml(size)}</li>
            <li><strong>Limite d'eclairages principaux:</strong> ${escapeHtml(lightLimit)}</li>
            <li><strong>Statut:</strong> ${size === "Retiree" ? "Retiree du pool actif" : "Disponible"}</li>
          </ul>
          <p class="detail-note">Surveille les limites de lumiere pour eviter la coupure du disjoncteur et la perte de sanite acceleree.</p>
        </article>
      </section>

      <section class="grid grid-2">
        <article class="card">
          <h2>Zones speciales d'enquete</h2>
          <ul class="list-clean">${mapNotesHtml}</ul>
        </article>

        <article class="card">
          <h2>Segmentation des pieces</h2>
          <ul class="list-clean">${segmentationHtml}</ul>
        </article>
      </section>

      <section class="card">
        <h2>Liens utiles</h2>
        <p><a href="../">Retour a la liste des cartes</a> · <a href="../../mecaniques/">Voir les mecaniques</a> · <a href="../../guide-avance/">Guide avance</a></p>
      </section>
    </section>`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${mapName} - Wiki Phasmophobia FR`,
      inLanguage: "fr",
      mainEntityOfPage: `${SITE_BASE}/cartes/${slug}/`,
      about: "Carte Phasmophobia",
      description: `${mapName}: taille, limites de lumiere, zones d'enquete et segmentation.`
    };

    const html = pageTemplate({
      title: `${mapName} | Carte Phasmophobia FR`,
      description: `${mapName}: infos de carte, taille, lumiere et logique de zones pour l'enquete.`,
      canonicalPath: `/cartes/${slug}/`,
      theme: "theme-maps",
      prefix: "../../",
      currentSection: "maps",
      brandSub: "Fiche carte",
      breadcrumb: `<a href="../../">Accueil</a> / <a href="../">Cartes</a> / ${escapeHtml(mapName)}`,
      content,
      schema
    });

    writeFile(path.join("cartes", slug, "index.html"), html);
  });
}

function buildCursedPages(data) {
  (data.cursedObjects || []).forEach((item) => {
    const slug = slugify(item.name);

    const usage = (item.usage || []).map((step) => `<li>${escapeHtml(step)}</li>`).join("");
    const risks = (item.risks || []).map((risk) => `<li>${escapeHtml(risk)}</li>`).join("");
    const tips = (item.tips || []).map((tip) => `<li>${escapeHtml(tip)}</li>`).join("");

    const referenceRows = (item.referenceRows || [])
      .map(
        (row) => `
          <tr>
            <th scope="row">${escapeHtml(row.label)}</th>
            <td>${escapeHtml(row.effect)}</td>
            <td>${escapeHtml(row.risk)}</td>
          </tr>
        `
      )
      .join("");

    const referenceTable = referenceRows
      ? `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Element</th>
              <th>Effet</th>
              <th>Risque / Cout</th>
            </tr>
          </thead>
          <tbody>
            ${referenceRows}
          </tbody>
        </table>
      </div>`
      : '<p class="detail-note">Aucun tableau avance supplementaire dans la source locale pour cet objet.</p>';
    const cursedImages = imageSet("cursed", item.name);

    const content = `
    <section class="detail-page">
      <article class="detail-head">
        <span class="badge">Fiche objet maudit</span>
        <h1 class="detail-title">${escapeHtml(item.name)}</h1>
        <p class="detail-sub">${escapeHtml(item.summary || "Objet maudit utilise pour accelerer l'enquete avec un niveau de risque eleve.")}</p>
        <div class="detail-badges">
          <span class="badge">Difficulte: ${escapeHtml(item.difficulty || "Variable")}</span>
          <span class="badge">Cout sanite: ${escapeHtml(item.sanityCost || "Variable")}</span>
          <span class="badge">Risque chasse: ${escapeHtml(item.huntRisk || "Variable")}</span>
          <span class="badge">Limite: ${escapeHtml(item.usageLimit || "Variable")}</span>
        </div>
      </article>

      <section class="detail-grid">
        <article class="card">
          <h2>Visuel de l'objet maudit</h2>
          ${renderImageSlot({
            images: cursedImages,
            prefix: "../../",
            fallbackTitle: `Zone image prevue pour ${item.name}`,
            fallbackHint: "objet maudit en jeu / vue inventaire"
          })}
          ${imageSourceCredit()}
          <p class="detail-note">Ajoute une image claire de l'objet pose + tenue en main pour reconnaissance immediate.</p>
        </article>

        <article class="card">
          <h2>Infos rapides</h2>
          <ul class="list-clean">
            <li><strong>Difficulte d'usage:</strong> ${escapeHtml(item.difficulty || "Variable")}</li>
            <li><strong>Cout principal:</strong> ${escapeHtml(item.sanityCost || "Variable")}</li>
            <li><strong>Risque de chasse:</strong> ${escapeHtml(item.huntRisk || "Variable")}</li>
            <li><strong>Limite d'utilisation:</strong> ${escapeHtml(item.usageLimit || "Variable")}</li>
          </ul>
          <p class="detail-note">Utilise ces objets uniquement avec plan defensif actif (cache valide, sortie, encens pret).</p>
        </article>
      </section>

      <section class="grid grid-2">
        <article class="card">
          <h2>Procedure d'utilisation</h2>
          <ul class="list-clean">${usage || "<li>Procedure non detaillee dans la source locale.</li>"}</ul>
        </article>

        <article class="card">
          <h2>Risques majeurs</h2>
          <ul class="list-clean">${risks || "<li>Risque non detaille dans la source locale.</li>"}</ul>
        </article>
      </section>

      <section class="grid grid-2">
        <article class="card">
          <h2>Reference avancee</h2>
          ${referenceTable}
        </article>

        <article class="card">
          <h2>Pro tips</h2>
          <ul class="list-clean">${tips || "<li>Tip non detaille dans la source locale.</li>"}</ul>
          <p class="detail-note">Croise toujours avec <a href="../../mecaniques/">Mecaniques</a> et <a href="../../guide-avance/">Guide avance</a> pour valider le timing.</p>
        </article>
      </section>
    </section>`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${item.name} - Objet maudit Phasmophobia FR`,
      inLanguage: "fr",
      mainEntityOfPage: `${SITE_BASE}/objets-maudits/${slug}/`,
      about: "Objets maudits Phasmophobia",
      description: `${item.name}: usage, couts, risques, astuces et reference avancee en francais.`
    };

    const html = pageTemplate({
      title: `${item.name} | Objet maudit Phasmophobia FR`,
      description: `${item.name}: procedure, cout de sanite, risque de chasse maudite et conseils d'utilisation.`,
      canonicalPath: `/objets-maudits/${slug}/`,
      theme: "theme-cursed",
      prefix: "../../",
      currentSection: "cursed",
      brandSub: "Fiche objet maudit",
      breadcrumb: `<a href="../../">Accueil</a> / <a href="../">Objets maudits</a> / ${escapeHtml(item.name)}`,
      content,
      schema
    });

    writeFile(path.join("objets-maudits", slug, "index.html"), html);
  });
}

function updateSitemap() {
  const pages = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach((entry) => {
      if (entry.name.startsWith(".")) return;
      const abs = path.join(dir, entry.name);
      const rel = path.relative(root, abs);
      if (entry.isDirectory()) {
        walk(abs);
        return;
      }
      if (entry.isFile() && entry.name === "index.html") {
        pages.push(rel);
      }
    });
  }

  walk(root);

  const urls = pages
    .sort((a, b) => a.localeCompare(b))
    .map((rel) => {
      const dir = path.dirname(rel).replaceAll(path.sep, "/");
      const pagePath = dir === "." ? "/" : `/${dir}/`;
      return `  <url>\n    <loc>${SITE_BASE}${pagePath}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  fs.writeFileSync(path.join(root, "sitemap.xml"), xml, "utf8");
}

function run() {
  const data = readData();
  buildGhostPages(data);
  buildItemPages(data);
  buildMapPages(data);
  buildCursedPages(data);
  updateSitemap();
}

run();
