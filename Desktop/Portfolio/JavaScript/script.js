const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(lnk => lnk.classList.remove('active'));

        link.classList.add('active');
    });
});

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
