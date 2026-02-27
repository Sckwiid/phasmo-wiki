window.PHASMO_DATA = {
  metadata: {
    title: "Wiki Phasmophobia FR",
    subtitle: "Mecaniques avancees, preuves, equipements, cartes et strategie",
    ghostCount: 27,
    evidenceCount: 7,
    mapCount: 14,
    sourceNote: "Synthese francisee et recroisee a partir des pages Fandom FR/EN, du Cheat Sheet non officiel et de la page Pro Wiki fournis localement.",
    generatedAt: "2026-02-27"
  },
  evidences: [
    {
      id: "emf",
      name: "EMF niveau 5",
      outil: "Lecteur EMF",
      description: "Obtenir un pic EMF 5 en restant proche des interactions fortes du fantome."
    },
    {
      id: "dots",
      name: "Projecteur D.O.T.S.",
      outil: "Projecteur D.O.T.S.",
      description: "Observer une silhouette traverser la grille lumineuse, en direct ou via camera."
    },
    {
      id: "uv",
      name: "Ultraviolet",
      outil: "Lampe UV",
      description: "Reveler empreintes de doigts, de main ou traces de pas apres interaction."
    },
    {
      id: "freezing",
      name: "Temperatures glaciales",
      outil: "Thermometre",
      description: "Mesurer une temperature sous 0°C / 32°F dans la zone hantee."
    },
    {
      id: "orbs",
      name: "Orbe fantomatique",
      outil: "Camera video / flux camion / Head Gear",
      description: "Voir des particules flottantes sur un retour video positionne dans la bonne piece."
    },
    {
      id: "writing",
      name: "Ecriture fantomatique",
      outil: "Livre d'ecriture",
      description: "Faire ecrire l'entite dans un livre depose dans sa zone d'activite."
    },
    {
      id: "spiritbox",
      name: "Spirit Box",
      outil: "Spirit Box",
      description: "Poser des questions dans les bonnes conditions et obtenir une reponse vocale."
    }
  ],
  ghosts: [
    {
      name: "Banshee",
      evidences: ["Projecteur D.O.T.S.", "Orbe fantomatique", "Ultraviolet"],
      strengths: "Se focalise sur une cible precise et declenche plus souvent des evenements de type chant.",
      weaknesses: "Ses cris sur micro parabolique et enregistreur son sont tres distinctifs.",
      tests: ["Verifier les sons specifiques au parabolique", "Observer la priorite de cible en chasse"]
    },
    {
      name: "Cauchemar",
      evidences: ["Ecriture fantomatique", "Orbe fantomatique", "Spirit Box"],
      strengths: "Plus dangereux dans l'obscurite avec un seuil de chasse plus agressif.",
      weaknesses: "Devient moins offensif sous lumiere, coupe souvent les interrupteurs et n'allume jamais lui-meme.",
      tests: ["Comparer son agressivite piece eclairee vs sombre", "Surveiller les coupures juste apres allumage"]
    },
    {
      name: "Dayan",
      evidences: ["EMF niveau 5", "Orbe fantomatique", "Spirit Box"],
      strengths: "Accelere quand un joueur bouge pres d'elle.",
      weaknesses: "Ralentit si la cible reste immobile a proximite.",
      tests: ["Tester mouvement puis arret dans la meme ligne", "Comparer le rythme des pas en poursuite"]
    },
    {
      name: "Demon",
      evidences: ["Ecriture fantomatique", "Ultraviolet", "Temperatures glaciales"],
      strengths: "Peut lancer des chasses tres tot, meme a des niveaux de sanite inhabituels.",
      weaknesses: "Le crucifix couvre une zone etendue contre lui.",
      tests: ["Verifier les tentatives de chasse tres precoces", "Positionner deux crucifix pour valider la portee"]
    },
    {
      name: "Deogen",
      evidences: ["Projecteur D.O.T.S.", "Ecriture fantomatique", "Spirit Box"],
      strengths: "Connait en permanence la position du joueur pendant une chasse.",
      weaknesses: "Devient extremement lent au contact proche de sa cible.",
      tests: ["Le laisser approcher pour confirmer le ralentissement", "Verifier qu'il ne perd jamais votre trace"]
    },
    {
      name: "Djinn",
      evidences: ["EMF niveau 5", "Ultraviolet", "Temperatures glaciales"],
      strengths: "Peut booster sa vitesse avec disjoncteur actif et cible lointaine; peut aussi drainer fortement la sanite.",
      weaknesses: "Perd sa competence si le disjoncteur est coupe et n'eteint pas directement ce dernier.",
      tests: ["Comparer vitesse disjoncteur ON/OFF", "Surveiller les pertes de sanite soudaines a proximite"]
    },
    {
      name: "Esprit",
      evidences: ["Ecriture fantomatique", "EMF niveau 5", "Spirit Box"],
      strengths: "Profil neutre sans avantage marque en dehors des regles generales.",
      weaknesses: "L'encens bloque ses chasses plus longtemps que la moyenne.",
      tests: ["Mesurer la duree de blocage apres encens", "Eliminer les profils specialises"]
    },
    {
      name: "Fantome",
      evidences: ["Projecteur D.O.T.S.", "Ultraviolet", "Spirit Box"],
      strengths: "Le contact visuel en pseudo ligne de mire peut drainer la sanite et il peut se rapprocher d'un joueur aleatoire.",
      weaknesses: "Une photo le force a disparaitre pendant une manifestation; visibilite plus faible en chasse.",
      tests: ["Prendre une photo en event", "Observer le drain de sanite a moins de 10 m"]
    },
    {
      name: "Gallu",
      evidences: ["EMF niveau 5", "Ultraviolet", "Spirit Box"],
      strengths: "Monte en agressivite quand certains equipements defensifs sont utilises.",
      weaknesses: "Redescend apres une chasse.",
      tests: ["Comparer activite avant/apres chasse", "Surveiller la reaction aux outils defensifs"]
    },
    {
      name: "Goryo",
      evidences: ["Projecteur D.O.T.S.", "EMF niveau 5", "Ultraviolet"],
      strengths: "Le D.O.T.S. est surtout observable via camera et hors presence directe du joueur dans la piece.",
      weaknesses: "Se deplace peu loin de sa piece favorite.",
      tests: ["Observer DOTS depuis le camion", "Verifier faible capacite de roaming"]
    },
    {
      name: "Hantu",
      evidences: ["Orbe fantomatique", "Ultraviolet", "Temperatures glaciales"],
      strengths: "Gagne en vitesse dans le froid.",
      weaknesses: "Ralentit en zone chaude, souffle froid possible en chasse si disjoncteur coupe, et n'allume pas le disjoncteur.",
      tests: ["Comparer la vitesse selon temperature", "Verifier comportement autour du disjoncteur"]
    },
    {
      name: "Le Mimic",
      evidences: ["Ultraviolet", "Temperatures glaciales", "Spirit Box"],
      strengths: "Peut reproduire les comportements d'autres entites.",
      weaknesses: "Affiche de faux orbes comme indice secondaire, ce qui trahit souvent son identite.",
      tests: ["Chercher faux orbes + trio d'evidences", "Comparer les changements de style de chasse"]
    },
    {
      name: "Les Jumeaux",
      evidences: ["EMF niveau 5", "Temperatures glaciales", "Spirit Box"],
      strengths: "Deux profils de vitesse et deux points possibles de depart de chasse.",
      weaknesses: "Interactions souvent doubles ou spatialement separees, ce qui les rend plus lisibles.",
      tests: ["Traquer doubles interactions", "Comparer chasses lentes/rapides sur plusieurs essais"]
    },
    {
      name: "Moroi",
      evidences: ["Ecriture fantomatique", "Temperatures glaciales", "Spirit Box"],
      strengths: "Accelere fortement a basse sanite d'equipe et peut maudire les joueurs via Spirit Box/parabolique.",
      weaknesses: "L'encens l'aveugle plus longtemps pendant la chasse.",
      tests: ["Verifier acceleration avec chute de sanite", "Tester duree d'aveuglement a l'encens"]
    },
    {
      name: "Myling",
      evidences: ["Ecriture fantomatique", "EMF niveau 5", "Ultraviolet"],
      strengths: "Se fait entendre tardivement en chasse (portee audio reduite).",
      weaknesses: "Produit davantage de sons paranormaux detectables au parabolique.",
      tests: ["Mesurer distance d'audibilite des pas", "Utiliser parabolique en boucle"]
    },
    {
      name: "Obake",
      evidences: ["EMF niveau 5", "Orbe fantomatique", "Ultraviolet"],
      strengths: "Peut masquer ou effacer plus vite des empreintes UV.",
      weaknesses: "Peut aussi laisser des empreintes speciales et changer brièvement de modele en chasse.",
      tests: ["Chercher empreintes atypiques", "Observer metamorphose furtive en chasse"]
    },
    {
      name: "Obambo",
      evidences: ["Ecriture fantomatique", "Ultraviolet", "Projecteur D.O.T.S."],
      strengths: "En etat agressif, chasse plus tot et plus vite.",
      weaknesses: "En etat calme, ralentit et decale son seuil de chasse; chasse agressive plus courte.",
      tests: ["Comparer fenetres de chasse sur plusieurs cycles", "Mesurer duree des chasses rapides"]
    },
    {
      name: "Ombre",
      evidences: ["Ecriture fantomatique", "EMF niveau 5", "Temperatures glaciales"],
      strengths: "Profil discret avec moins d'interactions visibles.",
      weaknesses: "Ne lance pas de chasse si des joueurs restent tres proches.",
      tests: ["Verifier baisse d'activite en groupe", "S'ecarter pour declencher une chasse test"]
    },
    {
      name: "Oni",
      evidences: ["Projecteur D.O.T.S.", "EMF niveau 5", "Temperatures glaciales"],
      strengths: "Tres actif en presence des joueurs.",
      weaknesses: "Plus visible en chasse et incapable de faire l'evenement de boule d'air.",
      tests: ["Regarder la frequence d'evenements", "Verifier absence de boule d'air"]
    },
    {
      name: "Onryo",
      evidences: ["Orbe fantomatique", "Temperatures glaciales", "Spirit Box"],
      strengths: "Peut tenter une chasse apres extinction de plusieurs flammes.",
      weaknesses: "Une flamme proche agit comme une protection temporaire, similaire a un mini-crucifix.",
      tests: ["Compter les extinctions de bougies", "Tester blocage de chasse avec flammes actives"]
    },
    {
      name: "Poltergeist",
      evidences: ["Ecriture fantomatique", "Ultraviolet", "Spirit Box"],
      strengths: "Peut projeter plusieurs objets tres vite et provoquer un fort chaos materiel.",
      weaknesses: "Perd beaucoup d'impact dans une zone presque vide d'objets.",
      tests: ["Empiler des objets dans la piece", "Mesurer les pertes de sanite apres multi-jet"]
    },
    {
      name: "Raiju",
      evidences: ["Projecteur D.O.T.S.", "EMF niveau 5", "Orbe fantomatique"],
      strengths: "Accelere pres des equipements electroniques actifs.",
      weaknesses: "Etend son rayon d'interference electronique pendant les chasses.",
      tests: ["Laisser du materiel allume sur son trajet", "Verifier interferences jusqu'a longue distance"]
    },
    {
      name: "Revenant",
      evidences: ["Ecriture fantomatique", "Orbe fantomatique", "Temperatures glaciales"],
      strengths: "Explose en vitesse lorsqu'il detecte une cible.",
      weaknesses: "Devient tres lent sans information sur un joueur.",
      tests: ["Casser la ligne de vue pour observer la chute de vitesse", "Tester appat sonore vs silence"]
    },
    {
      name: "Spectre",
      evidences: ["Projecteur D.O.T.S.", "EMF niveau 5", "Spirit Box"],
      strengths: "Peut se teleporteur vers un joueur et n'offre pas de suivi de pas standard.",
      weaknesses: "N'interagit pas avec le sel de la meme maniere qu'un fantome classique.",
      tests: ["Tracer la zone au sel", "Surveiller teleports sans marqueurs de pas"]
    },
    {
      name: "Thaye",
      evidences: ["Projecteur D.O.T.S.", "Ecriture fantomatique", "Orbe fantomatique"],
      strengths: "Commence la partie tres actif et rapide.",
      weaknesses: "Vieillit au fil du contrat quand des joueurs restent proches et se calme progressivement.",
      tests: ["Comparer debut et fin de partie", "Maintenir presence dans la zone pour accelerer son vieillissement"]
    },
    {
      name: "Yokai",
      evidences: ["Projecteur D.O.T.S.", "Orbe fantomatique", "Spirit Box"],
      strengths: "La voix des joueurs dans sa piece peut augmenter temporairement son seuil de chasse.",
      weaknesses: "En chasse, sa capacite auditive reste limitee a courte distance.",
      tests: ["Tester declenchements en parlant", "Verifier qu'il perd facilement la cible a distance"]
    },
    {
      name: "Yurei",
      evidences: ["Projecteur D.O.T.S.", "Orbe fantomatique", "Temperatures glaciales"],
      strengths: "Peut infliger des drains de sanite rapides autour de lui.",
      weaknesses: "Encens le bloque temporairement dans sa zone et son pouvoir implique souvent des claquements de porte.",
      tests: ["Observer portes qui claquent sans autre cause", "Utiliser encens pour limiter son roaming"]
    }
  ],
  equipment: {
    starter: [
      { name: "Projecteur D.O.T.S.", price: 65, max: 2, role: "Detection visuelle des silhouettes DOTS." },
      { name: "Lecteur EMF", price: 45, max: 2, role: "Mesure l'activite electromagnetique et valide EMF 5." },
      { name: "Lampe torche", price: 30, max: 4, role: "Eclairage de base pour exploration." },
      { name: "Livre d'ecriture", price: 40, max: 2, role: "Recupere l'ecriture fantomatique." },
      { name: "Spirit Box", price: 50, max: 2, role: "Dialogue conditionnel avec l'entite." },
      { name: "Thermometre", price: 30, max: 2, role: "Lecture de temperature et detection du gel." },
      { name: "Lampe UV", price: 35, max: 2, role: "Revelation des empreintes et traces de pas." },
      { name: "Camera video", price: 50, max: 4, role: "Detection des orbes et enregistrements bonus." }
    ],
    optional: [
      { name: "Crucifix", price: 30, max: 2, role: "Bloque un depart de chasse dans un rayon limite." },
      { name: "Lumiere a feu", price: 15, max: 4, role: "Source lumineuse et objectifs secondaires." },
      { name: "Head Gear", price: 60, max: 4, role: "Tier 1 camera, Tier 2 LED, Tier 3 vision nocturne." },
      { name: "Allumeur", price: 10, max: 4, role: "Active bougies, encens et feux de camp." },
      { name: "Encens", price: 15, max: 4, role: "Repousse temporairement le fantome et l'aveugle en chasse." },
      { name: "Capteur de mouvement", price: 100, max: 4, role: "Signale passages joueur/fantome vers le camion." },
      { name: "Micro parabolique", price: 50, max: 2, role: "Ecoute des sons paranormaux a distance." },
      { name: "Appareil photo", price: 40, max: 3, role: "Photos de preuves et bonus de recompense." },
      { name: "Sel", price: 15, max: 3, role: "Declenche traces et tests comportementaux." },
      { name: "Medicaments de sanite", price: 20, max: 4, role: "Restaure la sanite selon la difficulte." },
      { name: "Enregistreur de son", price: 30, max: 2, role: "Capture sons paranormaux pour bonus." },
      { name: "Capteur sonore", price: 80, max: 4, role: "Mesure les sons d'une zone depuis le camion." },
      { name: "Trepied", price: 25, max: 4, role: "Stabilise la camera video et limite les lancers." }
    ],
    truck: [
      "Ordinateur de surveillance",
      "Moniteur de sanite",
      "Moniteur d'activite du site",
      "Carte du site",
      "Moniteur sonore",
      "Tableau d'objectifs",
      "Presse-papiers de taches"
    ],
    upgrades: [
      { name: "Crucifix", cost: 30, max: 2, defaultItem: false, tier1: "Niveau 7", tier2: "Niveau 34 + 4 000$", tier3: "Niveau 80 + 20 000$" },
      { name: "Projecteur D.O.T.S.", cost: 65, max: 2, defaultItem: true, tier1: "Objet de base", tier2: "Niveau 27 + 3 000$", tier3: "Niveau 49 + 3 000$" },
      { name: "Lecteur EMF", cost: 45, max: 2, defaultItem: true, tier1: "Objet de base", tier2: "Niveau 18 + 3 000$", tier3: "Niveau 46 + 4 500$" },
      { name: "Lumiere a feu", cost: 15, max: 4, defaultItem: false, tier1: "Niveau 12", tier2: "Niveau 37 + 3 000$", tier3: "Niveau 75 + 10 000$" },
      { name: "Lampe torche", cost: 30, max: 4, defaultItem: true, tier1: "Objet de base", tier2: "Niveau 18 + 3 000$", tier3: "Niveau 34 + 3 000$" },
      { name: "Livre d'ecriture", cost: 40, max: 2, defaultItem: true, tier1: "Objet de base", tier2: "Niveau 23 + 3 000$", tier3: "Niveau 55 + 3 000$" },
      { name: "Head Gear", cost: 60, max: 4, defaultItem: false, tier1: "Niveau 13", tier2: "Niveau 42 + 10 000$", tier3: "Niveau 80 + 10 000$" },
      { name: "Allumeur", cost: 10, max: 4, defaultItem: false, tier1: "Niveau 12", tier2: "Niveau 37 + 500$", tier3: "Niveau 52 + 750$" },
      { name: "Encens", cost: 15, max: 4, defaultItem: false, tier1: "Niveau 14", tier2: "Niveau 37 + 3 500$", tier3: "Niveau 80 + 15 000$" },
      { name: "Capteur de mouvement", cost: 100, max: 4, defaultItem: false, tier1: "Niveau 3", tier2: "Niveau 42 + 2 500$", tier3: "Niveau 70 + 8 000$" },
      { name: "Micro parabolique", cost: 50, max: 2, defaultItem: false, tier1: "Niveau 5", tier2: "Niveau 32 + 3 000$", tier3: "Niveau 70 + 5 000$" },
      { name: "Appareil photo", cost: 40, max: 3, defaultItem: false, tier1: "Niveau 2", tier2: "Niveau 23 + 3 000$", tier3: "Niveau 55 + 5 000$" },
      { name: "Sel", cost: 15, max: 3, defaultItem: false, tier1: "Niveau 8", tier2: "Niveau 39 + 2 500$", tier3: "Niveau 65 + 5 000$" },
      { name: "Medicaments de sanite", cost: 20, max: 4, defaultItem: false, tier1: "Niveau 14", tier2: "Niveau 39 + 2 000$", tier3: "Niveau 75 + 5 000$" },
      { name: "Enregistreur de son", cost: 30, max: 2, defaultItem: false, tier1: "Niveau 4", tier2: "Niveau 39 + 3 000$", tier3: "Niveau 60 + 5 000$" },
      { name: "Capteur sonore", cost: 80, max: 4, defaultItem: false, tier1: "Niveau 10", tier2: "Niveau 32 + 3 000$", tier3: "Niveau 52 + 1 500$" },
      { name: "Spirit Box", cost: 50, max: 2, defaultItem: true, tier1: "Objet de base", tier2: "Niveau 23 + 3 000$", tier3: "Niveau 46 + 3 000$" },
      { name: "Thermometre", cost: 30, max: 2, defaultItem: true, tier1: "Objet de base", tier2: "Niveau 27 + 3 000$", tier3: "Niveau 65 + 3 000$" },
      { name: "Trepied", cost: 25, max: 4, defaultItem: false, tier1: "Niveau 9", tier2: "Niveau 34 + 5 000$", tier3: "Niveau 60 + 3 000$" },
      { name: "Lampe UV", cost: 35, max: 2, defaultItem: true, tier1: "Objet de base", tier2: "Niveau 18 + 3 000$", tier3: "Niveau 46 + 2 000$" },
      { name: "Camera video", cost: 50, max: 4, defaultItem: true, tier1: "Objet de base", tier2: "Niveau 27 + 3 000$", tier3: "Niveau 49 + 3 000$" }
    ]
  },
  maps: {
    small: [
      "6 Tanglewood Drive",
      "42 Edgefield Road",
      "10 Ridgeview Court",
      "Nell's Diner",
      "Grafton Farmhouse",
      "13 Willow Street",
      "Camp Woodwind"
    ],
    medium: [
      "Point Hope",
      "Bleasdale Farmhouse",
      "Sunny Meadows Restricted",
      "Prison",
      "Maple Lodge Campsite"
    ],
    large: [
      "Brownstone High School",
      "Sunny Meadows"
    ],
    removed: ["Asylum"],
    lightLimits: [
      { size: "Petite", maxOn: 9 },
      { size: "Moyenne", maxOn: 8 },
      { size: "Grande", maxOn: 7 }
    ],
    investigationZones: [
      "Maple Lodge Campsite et Camp Woodwind: les zones exterieures delimitees comptent comme lieu d'enquete.",
      "Sunny Meadows (normal et restricted): la cour carree fait partie de la zone active.",
      "Point Hope: le balcon est une zone a part entiere.",
      "Bleasdale Farmhouse: Garden Porch, Garden et Side Path sont traites comme zones identifiees."
    ],
    segmentation: [
      "A Brownstone High School, chaque couloir d'etage est segmente en trois sections (gauche, milieu, droite).",
      "A 10 Ridgeview Court, le hall d'entree apparent couvre en realite plusieurs pieces distinctes.",
      "A Maple Lodge Campsite, sentiers et zones de tentes sont fragmentes en plusieurs pieces logiques.",
      "Certaines petites salles attenantes sont fusionnees dans la grande piece voisine pour la logique de jeu.",
      "A Edgefield, la zone Basement inclut couloir + stockage attenant.",
      "A Prison, l'Infirmary de l'etage combine deux espaces de lits en une seule piece de logique."
    ]
  },
  mechanics: {
    ghostCore: {
      activation: "L'entite est vraiment active apres ouverture de la porte de sortie principale.",
      notes: [
        "Avant activation, certaines preuves passives (ex: orbes) restent possibles.",
        "Les objets maudits peuvent forcer une chasse maudite meme dans des cas limites.",
        "L'entite ne peut pas sortir du lieu d'enquete via la porte exterieure."
      ],
      states: [
        "Repos: immobilite courte (environ 2 a 6 secondes).",
        "Errance courte/longue: deplacement interne avec rayon maximal ~3 m / ~12 m.",
        "Retour piece favorite.",
        "Interaction objets / portes / disjoncteur.",
        "Evenement paranormal.",
        "Usage de competence propre au type.",
        "Chasse.",
        "Etat DOTS pour les entites concernees."
      ],
      roamingByDifficulty: [
        "Frequence faible: 90% errance courte, 10% longue.",
        "Frequence moyenne: 80% errance courte, 20% longue.",
        "Frequence elevee: 70% errance courte, 30% longue."
      ],
      visibility: [
        "Hors evenement/chasse, l'entite reste invisible.",
        "En chasse, elle clignote avec une visibilite variable selon le type.",
        "Goryo: DOTS principalement visible via camera."
      ],
      electronics: [
        "Interferences electroniques dans ~10 m pendant manifestation/chasse.",
        "Raiju peut etendre ce rayon autour de ~15 m.",
        "Les battements de coeur du joueur apparaissent quand la pseudo ligne de mire est proche (~10 m)."
      ],
      sounds: [
        "Sons de chasse reutilises sur tout le contrat une fois tires.",
        "Sons paranormaux reguliers via parabolique/enregistreur: environ 80 a 127 s.",
        "Exception Myling: intervalle plus frequent possible (a partir de ~64 s)."
      ]
    },
    sanity: {
      passiveLossPerSecond: [
        { mapSize: "Petite", prepPhase: 0.09, normal: 0.12 },
        { mapSize: "Moyenne", prepPhase: 0.05, normal: 0.08 },
        { mapSize: "Grande", prepPhase: 0.03, normal: 0.05 }
      ],
      passiveLossMultipliers: [
        "Amateur: x1",
        "Intermediaire: x1.5",
        "Professionnel / Cauchemar / Demence: x2",
        "Personnalisee: x0 a x2"
      ],
      passiveLossModifiers: [
        "Meteo Lune de sang: +1 sur le multiplicateur global.",
        "Solo: reduction supplementaire du taux (environ moitie)."
      ],
      ghostLinkedLosses: [
        "Mort d'un joueur: -15% pour chaque survivant.",
        "Collision avec l'entite lors d'evenement: -10% (Banshee chant cible: -15%, Oni collision: -20%).",
        "Djinn: competence de drain autour de -25% (disjoncteur ON requis).",
        "Yurei: fermeture de porte + drain autour de -15%.",
        "Moroi (malediction Spirit Box/parabolique): perte passive doublee et moins protegee par la lumiere.",
        "Fantome manifeste en pseudo LOS proche: drain supplementaire (~0.5%/s).",
        "Poltergeist multi-lancer: -2% par objet projete a proximite."
      ],
      itemLinkedChanges: [
        "Medicaments de sanite: restauration variable selon difficulte.",
        "Boite a musique active a moins de 2,5 m: -2,5%/s.",
        "Tarot: The Sun remet a 100%, The Moon descend a 0%, Wheel of Fortune +/-25%.",
        "Cercle d'invocation: -16% par bougie allumee.",
        "Miroir hante: cout de 20% ou 7,5%/s selon usage.",
        "Patte de singe: voeux pouvant fixer la sanite a 50% ou infliger -25% selon cas.",
        "Planche Ouija: cout variable selon question.",
        "Poupee vaudou: -5% par epingle, -10% pour le coeur."
      ],
      protections: [
        "Pendant la phase de preparation, la sanite ne descend pas en dessous de 50% quelle que soit la source."
      ],
      objectives: [
        "Objectif: atteindre une sanite moyenne sous 25%.",
        "Tache journaliere possible: atteindre 0% de sanite."
      ],
      difficultyParameters: [
        "Sanite initiale",
        "Sanite recuperee via pilules",
        "Taux de perte de sanite"
      ]
    }
  },
  guide: {
    cheatSheetConcepts: [
      "Filtrer rapidement par preuves trouvees / exclues.",
      "Classer les chasses en vitesses lente, normale, rapide.",
      "Verifier l'acceleration en ligne de vue (LOS speed-up).",
      "Recouper les seuils de chasse avec la sanite moyenne.",
      "Conserver une logique de map active pour suivre les zones de test."
    ],
    recommendedFlow: [
      "1) Localiser piece hantee (temperature, interactions, sons).",
      "2) Poser evidences primaires (EMF, UV, ecriture, Spirit Box, DOTS, camera).",
      "3) Capturer le profil de chasse (vitesse, audio, reaction a l'encens, line-of-sight).",
      "4) Recouper comportement special + trio de preuves.",
      "5) Valider via un test exclusif avant verrouillage dans le journal."
    ]
  },
  sources: [
    "Phasmophobia Pro Wiki - Advanced Ghost Mechanics.html",
    "Entite _ Wiki Phasmophobia _ Fandom.html",
    "Phasmophobia Wiki _ Fandom.html",
    "Equipment _ Phasmophobia Wiki _ Fandom.html",
    "Preuve _ Wiki Phasmophobia _ Fandom.html",
    "Carte _ Wiki Phasmophobia _ Fandom.html",
    "Sante mentale _ Wiki Phasmophobia _ Fandom.html",
    "Unofficial Phasmophobia Cheat Sheet.html"
  ]
};
