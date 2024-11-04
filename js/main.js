// 1. Klick-händelse för logotypen som navigerar till startsidan
const logo = document.getElementById('logo');
if (logo) {
    logo.addEventListener('click', function (event) {
        event.preventDefault(); // Förhindrar standardlänkbeteende
        window.location.href = 'index.html'; // Navigerar till startsidan
    });
}

// 2. Skapa en knapp "Tillbaka till Toppen" och lägg till i menyn
const backToTopButton = document.getElementById('backToTop');

// Kontrollera om "Tillbaka till Toppen"-knappen finns innan du lägger till händelser
if (backToTopButton) {
    // Gör knappen synlig när användaren scrollar ner
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            backToTopButton.style.display = 'block'; // Visa knappen om scrollen är mer än 200px
        } else {
            backToTopButton.style.display = 'none'; // Döljer knappen annars
        }
    });

    // Scrollar tillbaka till toppen vid klick på knappen
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0, // Rullar till toppen av sidan
            behavior: 'smooth' // Lägger till en smidig rullning
        });
    });
} else {
    console.warn('Tillbaka till Toppen-knappen saknas på denna sida.'); // Loggar varning om knappen saknas
}

// 3. Kontaktformulär: Spara namn och e-post i localStorage
const contactForm = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

if (contactForm && nameInput && emailInput) {
    // Laddar sparade uppgifter när sidan laddas
    window.addEventListener('load', function () {
        if (localStorage.getItem('name')) {
            nameInput.value = localStorage.getItem('name'); // Sätter namn i inputfältet
        }
        if (localStorage.getItem('email')) {
            emailInput.value = localStorage.getItem('email'); // Sätter e-post i inputfältet
        }
    });

    // Hanterar formulärets inskickning
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Förhindrar standardformulärs inskickning
        const nameValue = nameInput.value.trim(); // Tar bort extra mellanslag
        const emailValue = emailInput.value.trim(); // Tar bort extra mellanslag
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // RegEx för att validera e-post

        const existingError = contactForm.querySelector('.error-message');
        if (existingError) {
            existingError.remove(); // Tar bort tidigare felmeddelande
        }

        // Validerar namn och e-post
        if (nameValue === '') {
            showError('Namn måste anges.'); // Visar felmeddelande om namn saknas
        } else if (!emailPattern.test(emailValue)) {
            showError('Ange en giltig e-postadress.'); // Visar felmeddelande om e-post inte är giltig
        } else {
            // Sparar namn och e-post i localStorage om valideringen lyckas
            localStorage.setItem('name', nameValue);
            localStorage.setItem('email', emailValue);
            showSuccess('Dina uppgifter har sparats och meddelandet har skickats!'); // Visar framgångsmeddelande
        }
    });

    // Funktion för att visa felmeddelande
    function showError(message) {
        const errorMessage = document.createElement('p'); // Skapar ett nytt paragraf-element för felmeddelandet
        errorMessage.innerText = message; // Sätter meddelandet som text
        errorMessage.style.color = 'red'; // Sätter textfärgen till röd
        errorMessage.classList.add('error-message'); // Lägger till klass för stil
        contactForm.appendChild(errorMessage); // Lägger till felmeddelandet i formuläret
    }

    // Funktion för att visa framgångsmeddelande
    function showSuccess(message) {
        const successMessage = document.createElement('p'); // Skapar ett nytt paragraf-element för framgångsmeddelandet
        successMessage.innerText = message; // Sätter meddelandet som text
        successMessage.style.color = 'green'; // Sätter textfärgen till grön
        successMessage.classList.add('success-message'); // Lägger till klass för stil
        contactForm.appendChild(successMessage); // Lägger till framgångsmeddelandet i formuläret

        // Tar bort framgångsmeddelandet efter 3 sekunder
        setTimeout(() => {
            successMessage.remove(); // Tar bort meddelandet
        }, 3000);
    }
}

// 4. Temalagring med Local Storage
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light'; // Hämta nuvarande tema eller sätt som 'light' om inget är sparat
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'; // Byter tema
    document.body.className = `${newTheme}-theme`; // Sätter bodyns klass till det nya temat
    localStorage.setItem('theme', newTheme); // Sparar det nya temat i localStorage
}

// Sätt tidigare sparat tema vid sidladdning
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Hämta sparat tema eller sätt som 'light'
    document.body.className = `${savedTheme}-theme`; // Sätter bodyns klass till det sparade temat
});

// Hanterar tema-bytarknappen
const themeToggleButton = document.getElementById('themeToggle');
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme); // Byter tema vid klick
}

// 5. Lightbox för portfolio-bilder, tjänstebilder och om-oss-bilden
function setupLightbox() {
    const images = document.querySelectorAll('.portfolio-grid img, .service img, .about-content img'); // Väljer bilder för lightbox

    images.forEach(image => {
        image.setAttribute('loading', 'lazy'); // Lägger till latladdning för bilder

        // Hanterar klickhändelse för att öppna lightbox
        image.addEventListener('click', () => {
            const lightboxOverlay = document.createElement('div'); // Skapar overlay för lightbox
            lightboxOverlay.classList.add('lightbox-overlay'); // Lägger till klass för styling
            document.body.appendChild(lightboxOverlay); // Lägger till overlay i body

            const lightboxImage = document.createElement('img'); // Skapar bild för lightbox
            lightboxImage.src = image.src; // Sätter källan till klickad bild
            lightboxImage.classList.add('lightbox-image'); // Lägger till klass för styling
            lightboxOverlay.appendChild(lightboxImage); // Lägger till bilden i overlay

            // Stänger lightbox vid klick på overlay
            lightboxOverlay.addEventListener('click', () => {
                lightboxOverlay.remove(); // Tar bort overlay
            });
        });
    });
}

window.addEventListener('load', setupLightbox); // Initierar lightbox när sidan laddas

// 6. Markera aktivt menyalternativ
function setActiveNav() {
    const currentPath = window.location.pathname; // Hämta nuvarande sökväg
    const navLinks = document.querySelectorAll('nav ul li a'); // Väljer navigeringslänkar

    navLinks.forEach(link => {
        if (link.href.includes(currentPath)) {
            link.classList.add('active'); // Lägger till aktiv klass om länken matchar sökvägen
        } else {
            link.classList.remove('active'); // Tar bort aktiv klass annars
        }
    });
}

window.addEventListener('load', setActiveNav); // Initierar aktiv länkmarkering när sidan laddas

// 7. Inställningsikon med meny för "Byt Tema" och "Tillbaka till Toppen"
const menuToggle = document.getElementById("menuToggle");
const menuOptions = document.getElementById("menuOptions");

if (menuToggle && menuOptions) {
    menuToggle.addEventListener("click", function () {
        menuOptions.style.display = menuOptions.style.display === 'flex' ? 'none' : 'flex'; // Växlar visning av menyn
    });

    // Klicka utanför menyn för att stänga den
    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !menuOptions.contains(event.target)) {
            menuOptions.style.display = "none"; // Döljer menyn om klickad utanför
        }
    });
}








