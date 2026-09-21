///////////////////////////////////////////////////
//////////// Navigation active scroll ////////////
///////////////////////////////////////////////////

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(lnk => lnk.classList.remove('active'));

        link.classList.add('active');
    });
});

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    // Page sans sections (ex: projets.html) : on ne touche pas à la nav,
    // l'état "active" défini dans le HTML reste tel quel.
    if (sections.length === 0) return;

    // On prend la dernière section dont le haut a déjà été dépassé.
    // Plus robuste qu'une fourchette haut/bas : pas de risque de trou
    // ou de chevauchement entre deux sections.
    let currentSection = sections[0].getAttribute("id");
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (currentSection && href && href.includes("#" + currentSection)) {
            link.classList.add("active");
        }
    });
});

///////////////////////////////////////////////////
////////////////// Projet.html ////////////////////
///////////////////////////////////////////////////

const projectBoxes = document.querySelectorAll('.dynamic .project-box');
const nameFilters = document.querySelectorAll('.static [data-name]');
const tagFilters = document.querySelectorAll('.static [data-tag]');

// Clique sur le nom d'un projet → affiche seulement ce projet
nameFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const name = filter.dataset.name;

        // Toggle active
        const isActive = filter.classList.contains('active');
        nameFilters.forEach(f => f.classList.remove('active'));

        // On désactive les filtres de tags : les deux familles de filtres
        // sont mutuellement exclusives
        tagFilters.forEach(f => f.classList.remove('active'));

        if(!isActive) filter.classList.add('active');

        // Filtre les projets
        projectBoxes.forEach(box => {
            if(!isActive && box.dataset.name !== name) {
                box.style.display = 'none';
            } else {
                box.style.display = 'block';
            }
        });
    });
});

// Clique sur un tag → filtre tous les projets ayant ce tag
tagFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const tag = filter.dataset.tag;

        const isActive = filter.classList.contains('active');
        filter.classList.toggle('active');

        if (!isActive) {
            tagFilters.forEach(filter2 => {
                if (filter2!=filter) {
                    filter2.classList.remove('active');
                }
            });
        }

        // On désactive les filtres de nom : les deux familles de filtres
        // sont mutuellement exclusives
        nameFilters.forEach(f => f.classList.remove('active'));

        projectBoxes.forEach(box => {
            const tags = box.dataset.tags.split(',');
            if(isActive) {
                // Si on désélectionne, montre tous
                box.style.display = 'block';
            } else {
                // Sinon masque si le tag n'est pas présent
                if(!tags.includes(tag)) {
                    box.style.display = 'none';
                } else {
                    box.style.display = 'block';
                }
            }
        });
    });
});

///////////////////////////////////////////////////
///////////// Thème sombre et clair ///////////////
///////////////////////////////////////////////////

(function applyStoredTheme() {
  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {
    /* localStorage indisponible (mode privé strict, etc.) : on ignore */
  }
 
  var theme = stored;
  if (!theme) {
    var prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    theme = prefersLight ? "light" : "dark";
  }
 
  document.documentElement.setAttribute("data-theme", theme);
})();
 
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
 
  btn.addEventListener("click", function () {
    var root = document.documentElement;
    var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    var next = current === "light" ? "dark" : "light";
 
    root.setAttribute("data-theme", next);
 
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* stockage indisponible : le choix ne sera pas mémorisé, pas bloquant */
    }
  });
});

///////////////////////////////////////////////////
//////////// Langue anglais/Français //////////////
///////////////////////////////////////////////////

// Principe : chaque texte traduisible porte un attribut data-i18n="cle" (ou
// data-i18n-placeholder / data-i18n-aria pour les placeholders et aria-label).
// On stocke ici les deux versions de chaque texte, et on les applique au chargement
// de la page + à chaque clic sur le bouton drapeau. Comme ce fichier est partagé par
// toutes les pages, chaque page n'utilise que les clés qui existent réellement dans
// son HTML : les autres sont simplement ignorées.

const translations = {
  fr: {
    // Navigation (toutes les pages)
    "nav-presentation": " Présentation ",
    "nav-experiences": "Expériences",
    "nav-diplomes": "Diplômes",
    "nav-competences": "Compétences",
    "nav-contact": "Contact",
    "nav-projets": "Projets ",
    "theme-toggle-aria": "Basculer le thème clair / sombre",
    "lang-toggle-aria": "Basculer la langue",

    // index.html - présentation
    "hero-tagline": "Je suis élève ingénieure, en informatique",

    // index.html - expériences
    "exp-title": "Stages / Expériences",
    "exp1-h3": "Conseillère à la vente - Easy cash - Quévert, France",
    "exp1-date": "Juin 2024",
    "exp1-d1": "Sens du contact et de l’écoute active ;",
    "exp1-d2": "Collaboration / travail avec l’équipe ;",
    "exp1-d3": "Reformatage des ordinateurs avant la remise en vente.",
    "exp2-h3": "Gérante de snack - Beauséjour - Saint Samson/Rance, France",
    "exp2-date": "Juillet - Aout 2025",
    "exp3-h3": "Stage en réseau et télécommunication - SNCF Réseau - Rennes, France",
    "exp3-date": "Juin 2026",
    "exp3-d1": "Surveiller et maintenir les systèmes d’exploitation des serveurs du périmètre régional ;",
    "exp3-d2": "Surveiller et maintenir des systèmes d’exploitation et intervenir sur des incidents utilisateurs ;",
    "exp3-d3": "Surveiller et maintenir les équipements réseau ;",
    "exp3-d4": "Configurer des commutateurs en appliquant les directives et les règles de sécurité ;",
    "exp3-d5": "Concevoir une infrastructure réseau (étude de régénération de matériel LAN) ;",
    "exp3-d6": "Analyser le trafic réseau (Wireshark) pour détecter des anomalies sur les LAN régionaux.",
    "exp4-date": "Juillet - Aout 2026",
    "snack-d1": "Utilisation de logiciels de caisse, clôture de caisse, gestion des espèces ;",
    "snack-d2": "Polyvalence / Capacité à gérer plusieurs tâches en même temps ;",
    "snack-d3": "Gérer les périodes de forte affluence avec efficacité et sang-froid ;",
    "snack-d4": "Réactivité, autonomie et sens du service.",

    // index.html - diplômes
    "dip-title": "Cursus / diplômes :",
    "dip1-h3": "Brevet",
    "dip1-d1": "Mention : Très bien",
    "dip1-d2": "Lieu : Collège Val de Rance à Plouer sur Rance",
    "dip2-h3": "Bac spécialité mathématiques et physiques",
    "dip2-d1": "Mention : Assez bien",
    "dip2-d2": "Lieu : Lycée la Fontaine des eaux à Dinan",
    "dip3-h3": "1ère année de licence de mathématiques",
    "dip3-d1": "Lieu : Université de Rennes 1",
    "dip4-h3": "Cycle universitaire préparatoire aux grandes écoles",
    "dip4-d1": "Lieu : ESIR à l'université de Rennes",

    // index.html - compétences
    "skills-title": "Langages & outils",
    "skills-cmd1": "cat maitrise.txt",
    "skills-cmd2": "cat en_apprentissage.txt",
    "skill-asm": "Assembleur",
    "skill-3d": "3D Expérience",

    // footer (toutes les pages)
    "footer-role": "Étudiante en informatique",

    // projets.html
    "proj-sommaire": "Sommaire :",
    "proj-ouvinf-name": "Ouverture Info",
    "proj-bdd-name": "Site de critique de jeux vidéos",
    "proj-langages": "Langage utilisés",
    "proj-outils": "Outils utilisés",
    "tag-lcd": "LCD tactile",
    "tag-3dprint": "Impression 3D",
    "proj-nonogram-desc": "Codage d'un Nonogram en électronique sur un écran LCD tactile + impression 3D d'un boitier.",
    "proj-esirfy-desc": "Codage d'une base de donées et d'une interface pour une application de streaming de musique.",
    "proj-fourmiliere-desc": "Codage d'une fourmilière en C++ : création, modification et destruction de différentes entitées, gestions des mouvements et des reproductions des fourmis.",
    "proj-shoot-desc": "Codage en équipe d'un shoot them up, sur deux jours, dans le cadre du projet de fin d'année d'ESIR 1.",
    "proj-ouvinf-title": "Jeu Ouverture Info",
    "date-prepa2-2025": "Prépa 2 (2025)",
    "proj-ouvinf-desc": "Dans le cadre d'un cours d'ouverture d'informatique, nous avons codé en groupe de 4 un jeu en réseau local.",
    "proj-bdd-title": "Site de critique de jeux vidéos",
    "proj-bdd-desc": "Dans le cadre d'un cours de base de données, nous avons codé un site de critiques de jeux vidéos.",
    "proj-pokedex-desc": "Dans le cadre d'un cours de base de données, nous avons codé un pokédex.",

    // Pages projets_etudes/*.html
    "git-link": "↗ Voir le dépôt Git",
    "desc-label": "Description",
    "page-nonogram-desc": "Codage d'un Nonogram en électronique sur un écran LCD tactile, associé à l'impression 3D d'un boitier fait sur-mesure pour l'accueillir. Le projet couvre à la fois la logique du jeu (grille, indices, validation) et la partie matérielle (câblage, écran tactile, boîtier).",
    "page-esirfy-desc": "Construction d'une base de données destinée à une application de streaming de musique.",
    "page-fourmiliere-desc": "Codage d'une simulation de fourmilère avec ces fourmis ... blablabla",
    "page-shoot-desc": "Codage en équipe de cinq lors du projet de fin d'année d'un Shoot Them Up, et ceci dans le temps impartit de 48h.",
    "page-pokedex-desc": "Dans le cadre d'un cours de base de données, création d'un pokédex complet : modélisation de la base de données (pokémons, types, évolutions, statistiques) et interface web permettant de consulter et de filtrer les fiches de chaque pokémon.",
    "nav-current-bdd": " Site critique ",
    "page-bdd-title": "Site de critiques de jeux vidéos",
    "page-bdd-desc": "Dans le cadre d'un cours de base de données, conception et développement d'un site de critiques de jeux vidéos : modélisation de la base de données (jeux, utilisateurs, avis, notes) et interface web permettant de consulter, ajouter et gérer les critiques.",
    "nav-current-ouvinf": " Projet d'ouverture Info ",
    "page-ouvinf-title": "Projet d'ouverture Info",
    "page-ouvinf-desc": "Blabla blabla",

    // Navigation mobile
    "mobile-menu-open": "Ouvrir le menu",
    "mobile-menu-close": "Fermer le menu",
  },

  en: {
    // Navigation (toutes les pages)
    "nav-presentation": " About ",
    "nav-experiences": "Experience",
    "nav-diplomes": "Education",
    "nav-competences": "Skills",
    "nav-contact": "Contact",
    "nav-projets": "Projects ",
    "theme-toggle-aria": "Toggle light / dark theme",
    "lang-toggle-aria": "Toggle language",

    // index.html - présentation
    "hero-tagline": "I'm an engineering student, majoring in computer science",

    // index.html - expériences
    "exp-title": "Internships / Experience",
    "exp1-h3": "Sales advisor - Easy cash - Quévert, France",
    "exp1-date": "June 2024",
    "exp1-d1": "Strong people skills and active listening;",
    "exp1-d2": "Collaboration / teamwork;",
    "exp1-d3": "Refurbishing computers before resale.",
    "exp2-h3": "Snack bar manager - Beauséjour - Saint Samson/Rance, France",
    "exp2-date": "July - August 2025",
    "exp3-h3": "Networking & telecommunications internship - SNCF Réseau - Rennes, France",
    "exp3-date": "June 2026",
    "exp3-d1": "Monitoring and maintaining server operating systems for the regional area;",
    "exp3-d2": "Monitoring and maintaining operating systems, and handling user incidents;",
    "exp3-d3": "Monitoring and maintaining network equipment;",
    "exp3-d4": "Configuring switches according to guidelines and security rules;",
    "exp3-d5": "Designing a network infrastructure (LAN hardware renewal study);",
    "exp3-d6": "Analyzing network traffic (Wireshark) to detect anomalies on regional LANs.",
    "exp4-date": "July - August 2026",
    "snack-d1": "Use of point-of-sale software, till closing, cash management;",
    "snack-d2": "Versatility / ability to handle several tasks at once;",
    "snack-d3": "Managing busy periods efficiently and calmly;",
    "snack-d4": "Responsiveness, autonomy and a strong sense of service.",

    // index.html - diplômes
    "dip-title": "Education:",
    "dip1-h3": "Brevet (lower secondary diploma)",
    "dip1-d1": "Result: With honours",
    "dip1-d2": "Location: Collège Val de Rance, Plouer-sur-Rance",
    "dip2-h3": "Baccalauréat, mathematics & physics track",
    "dip2-d1": "Result: With merit",
    "dip2-d2": "Location: Lycée la Fontaine des Eaux, Dinan",
    "dip3-h3": "1st year of a mathematics degree",
    "dip3-d1": "Location: University of Rennes 1",
    "dip4-h3": "Preparatory program for engineering schools",
    "dip4-d1": "Location: ESIR, University of Rennes",

    // index.html - compétences
    "skills-title": "Languages & tools",
    "skills-cmd1": "cat mastered.txt",
    "skills-cmd2": "cat learning.txt",
    "skill-asm": "Assembly",
    "skill-3d": "3D Experience",

    // footer (toutes les pages)
    "footer-role": "Computer science student",

    // projets.html
    "proj-sommaire": "Summary:",
    "proj-ouvinf-name": "Networking game",
    "proj-bdd-name": "Video game review website",
    "proj-langages": "Languages used",
    "proj-outils": "Tools used",
    "tag-lcd": "Touch LCD",
    "tag-3dprint": "3D printing",
    "proj-nonogram-desc": "Built an electronic Nonogram on a touch LCD screen, plus a 3D-printed case.",
    "proj-esirfy-desc": "Built a database and an interface for a music streaming application.",
    "proj-fourmiliere-desc": "Built an anthill simulation in C++: creating, updating and destroying various entities, and handling ant movement and reproduction.",
    "proj-shoot-desc": "Built a shoot 'em up as a team, in two days, as part of the ESIR 1 end-of-year project.",
    "proj-ouvinf-title": "Networking game project",
    "date-prepa2-2025": "Prep school, year 2 (2025)",
    "proj-ouvinf-desc": "As part of a computer science elective, we built a local-network game in a team of 4.",
    "proj-bdd-title": "Video game review website",
    "proj-bdd-desc": "As part of a database course, we built a video game review website.",
    "proj-pokedex-desc": "As part of a database course, we built a Pokédex.",

    // Pages projets_etudes/*.html
    "git-link": "↗ View the Git repository",
    "desc-label": "Description",
    "page-nonogram-desc": "Built an electronic Nonogram on a touch LCD screen, combined with a custom 3D-printed case to hold it. The project covers both the game logic (grid, hints, validation) and the hardware side (wiring, touch screen, case).",
    "page-esirfy-desc": "Built a database for a music streaming application.",
    "page-fourmiliere-desc": "Built an anthill simulation with its ants ... blah blah",
    "page-shoot-desc": "Built a shoot 'em up as a team of five for the end-of-year project, within the 48-hour time limit.",
    "page-pokedex-desc": "As part of a database course, built a complete Pokédex: database design (Pokémon, types, evolutions, stats) and a web interface to browse and filter each Pokémon's entry.",
    "nav-current-bdd": " Review site ",
    "page-bdd-title": "Video game review website",
    "page-bdd-desc": "As part of a database course, designed and built a video game review website: database design (games, users, reviews, ratings) and a web interface to browse, add and manage reviews.",
    "nav-current-ouvinf": " Networking game project ",
    "page-ouvinf-title": "Networking game project",
    "page-ouvinf-desc": "Blah blah blah",

    // Navigation mobile
    "mobile-menu-open": "Open menu",
    "mobile-menu-close": "Close menu",
  },
};

// Effet machine à écrire, utilisé pour le texte d'intro (#machine).
// Chaque appel possède un "jeton" : si une nouvelle animation démarre sur le
// même élément avant que la précédente soit finie (ex : changement de langue
// ou double appel au chargement), l'ancienne s'arrête au lieu de continuer à
// écrire par-dessus le texte déjà affiché — c'est ce qui causait le texte en double.
function ecrireMachine(el, texte) {
  const token = (Number(el.dataset.twToken) || 0) + 1;
  el.dataset.twToken = token;

  el.textContent = "";
  let index = 0;

  function etape() {
    if (Number(el.dataset.twToken) !== token) return; // une animation plus récente a pris le relais
    if (index < texte.length) {
      el.textContent += texte.charAt(index);
      index++;
      setTimeout(etape, 50); // vitesse (ms)
    }
  }

  etape();
}

// Applique la langue donnée à tous les éléments traduisibles présents sur la page.
function applyLanguage(lang) {
  const dict = translations[lang] || translations.fr;

  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("data-lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // Textes affichés avec l'effet "machine à écrire" (ex : #machine).
  document.querySelectorAll("[data-i18n-tw]").forEach((el) => {
    const key = el.getAttribute("data-i18n-tw");
    if (dict[key] !== undefined) ecrireMachine(el, dict[key]);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
  });
}

// Détermine la langue à utiliser au chargement : celle mémorisée dans le
// navigateur, sinon le français par défaut.
function getStoredLanguage() {
  var stored = null;
  try {
    stored = localStorage.getItem("lang");
  } catch (e) {
    /* localStorage indisponible : on ignore */
  }
  return stored === "en" ? "en" : "fr";
}

// On applique la langue dès que possible (avant même que la page soit
// entièrement chargée) pour éviter un flash de texte français->anglais.
applyLanguage(getStoredLanguage());

document.addEventListener("DOMContentLoaded", function () {
  // Ré-applique la langue une fois le DOM complet (utile si des éléments
  // n'existaient pas encore lors du premier appel ci-dessus).
  applyLanguage(getStoredLanguage());

  var langBtn = document.getElementById("lang-toggle");
  if (!langBtn) return;

  langBtn.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-lang") === "en" ? "en" : "fr";
    var next = current === "en" ? "fr" : "en";

    applyLanguage(next);

    // Le bouton de menu mobile est créé dynamiquement plus bas dans ce fichier ;
    // on met à jour son aria-label ici pour qu'il reste dans la bonne langue
    // même si on ne rouvre/referme pas le menu entre-temps.
    var mobileToggle = document.querySelector(".mobile-nav-toggle");
    if (mobileToggle) {
      var isOpen = mobileToggle.classList.contains("is-open");
      var key = isOpen ? "mobile-menu-close" : "mobile-menu-open";
      mobileToggle.setAttribute("aria-label", translations[next][key]);
    }

    try {
      localStorage.setItem("lang", next);
    } catch (e) {
      /* stockage indisponible : le choix ne sera pas mémorisé, pas bloquant */
    }
  });
});


///////////////////////////////////////////////////
//////////// Navigation mobile compacte ///////////
///////////////////////////////////////////////////
const mobileNav = document.querySelector('nav.style_nav');
if (mobileNav) {
    const navList = mobileNav.querySelector('ul');
    const navActions = mobileNav.querySelector('.nav-actions');
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span>';
    // Placé à la suite des icônes thème/langue (groupe .nav-actions), pour
    // que les trois boutons restent bien alignés ensemble à droite de la barre.
    (navActions || mobileNav).appendChild(toggle);

    // Libellé du bouton, dans la langue actuellement affichée.
    const mobileLabel = (key) => {
        const lang = document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'fr';
        return translations[lang][key];
    };

    toggle.setAttribute('aria-label', mobileLabel('mobile-menu-open'));

    const closeMenu = () => {
        mobileNav.classList.remove('nav-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', mobileLabel('mobile-menu-open'));
    };

    toggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('nav-open');
        toggle.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', mobileLabel(isOpen ? 'mobile-menu-close' : 'mobile-menu-open'));
    });

    navList.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}
