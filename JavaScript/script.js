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
    let currentSection = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href && href.includes("#" + currentSection)) {
            link.classList.add("active");
        }
    });
});

///////////////////////////////////////////////////
/// Effet machine à écrire page de présentation ///
///////////////////////////////////////////////////

const texte = "Je suis élève ingénieure, en informatique";
const element = document.getElementById("machine");

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

///////////////////////////////////////////////////
//////////// Questionnaire de contact /////////////
///////////////////////////////////////////////////

// Validation simple côté client
document.getElementById('contactForm').addEventListener('submit', function(e) {
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