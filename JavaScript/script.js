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
/// Effet machine à écrire page de présentation ///
///////////////////////////////////////////////////

const element = document.getElementById("machine");

if (element) {
    const texte = "Je suis élève ingénieure, en informatique";
    let index = 0;

    function machineAEcrire() {
        if (index < texte.length) {
            element.innerHTML += texte.charAt(index);
            index++;
            setTimeout(machineAEcrire, 50); // vitesse (ms)
        }
    }

    element.innerHTML = "";
    machineAEcrire();
}

///////////////////////////////////////////////////
//////////// Questionnaire de contact /////////////
///////////////////////////////////////////////////

// Validation simple côté client
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche l'envoi pour validation
        let valid = true;

        // Réinitialiser les messages d'erreur
        document.querySelectorAll('.error').forEach(el => el.textContent = '');

        // Vérification du nom
        const name = document.getElementById('name').value.trim();
        if (name.length < 2) {
            document.getElementById('nameError').textContent = "Veuillez entrer un nom valide.";
            valid = false;
        }

        // Vérification de l'email
        const email = document.getElementById('email').value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            document.getElementById('emailError').textContent = "Veuillez entrer un email valide.";
            valid = false;
        }

        // Vérification du message
        const message = document.getElementById('message').value.trim();
        if (message.length < 10) {
            document.getElementById('messageError').textContent = "Votre message doit contenir au moins 10 caractères.";
            valid = false;
        }

        // Si tout est valide, on peut envoyer (ici on simule)
        if (valid) {
            alert("Message envoyé avec succès !");
            this.reset(); // à modifier pour envoyer au bon endroit
        }
    });
}

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
//////////// Navigation mobile compacte ///////////
///////////////////////////////////////////////////
const mobileNav = document.querySelector('nav.style_nav');
if (mobileNav) {
    const navList = mobileNav.querySelector('ul');
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-nav-toggle';
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span>';
    mobileNav.insertBefore(toggle, navList);

    const closeMenu = () => {
        mobileNav.classList.remove('nav-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
    };

    toggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('nav-open');
        toggle.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    navList.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}
