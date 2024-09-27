let currentIndex = { carousel1: 0, carousel2: 0, carousel3: 0 };

function showSlide(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    const inner = carousel.querySelector('.carousel-inner');

    if (index >= totalSlides) {
        currentIndex[carouselId] = 0;
    } else if (index < 0) {
        currentIndex[carouselId] = totalSlides - 1;
    } else {
        currentIndex[carouselId] = index;
    }

    const offset = -currentIndex[carouselId] * 100;
    inner.style.transform = `translateX(${offset}%)`;
}

function nextSlide(carouselId) {
    showSlide(carouselId, currentIndex[carouselId] + 1);
}

function prevSlide(carouselId) {
    showSlide(carouselId, currentIndex[carouselId] - 1);
}

function toggleCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    const overlay = document.getElementById('overlay');
    const overlayCarousel = document.getElementById('overlay-carousel');
    const isExpanded = carousel.classList.contains('expanded');

    // Fechar qualquer carrossel expandido
    closeOverlay();

    if (!isExpanded) {
        carousel.classList.add('expanded');
        carousel.style.visibility = 'hidden'; // Ocultar o carrossel original
        overlay.style.display = 'flex';

        // Atualiza o carrossel na sobreposição
        overlayCarousel.innerHTML = carousel.innerHTML;
        overlayCarousel.querySelectorAll('.carousel-control').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.classList.contains('prev')) {
                    prevSlide('overlay-carousel');
                } else {
                    nextSlide('overlay-carousel');
                }
                e.stopPropagation(); // Impede que o clique nos controles feche a sobreposição
            });
        });
        showSlide('overlay-carousel', currentIndex[carouselId]);
    } else {
        closeOverlay();
    }
}

function closeOverlay() {
    const carousel = document.querySelector('.carousel.expanded');
    if (carousel) {
        carousel.classList.remove('expanded');
        carousel.style.visibility = 'visible'; // Mostrar novamente o carrossel original
    }
    document.getElementById('overlay').style.display = 'none';
}

document.getElementById('overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeOverlay();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    showSlide('carousel1', currentIndex['carousel1']);
    showSlide('carousel2', currentIndex['carousel2']);
    showSlide('carousel3', currentIndex['carousel3']);
});


// Função do scroll Suave
function initScrollSuave() {
    const linksInternos = document.querySelectorAll('.js-menu a[href^="#"]');
    const navbarMenu = document.querySelector('.navbar-menu'); // Corrigido: adicionado ponto

    function scrollToSection(event) {
        event.preventDefault();
        const href = event.currentTarget.getAttribute("href");
        const section = document.querySelector(href);

        section.scrollIntoView({ // Corrigido: alterado para scrollIntoView
            behavior: "smooth",
            block: "start",
        });

        navbarMenu.classList.remove('active');
    }

    linksInternos.forEach((link) => {
        link.addEventListener("click", scrollToSection);
    });
}
initScrollSuave();


//Função para o botão menu

function buttonToggle() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    navbarToggle.addEventListener('click', function () {
        navbarMenu.classList.toggle('active');
    });
}

document.addEventListener('DOMContentLoaded', buttonToggle);



// Função para enviar a mensagem para o WhatsApp
function sendToWhatsApp(message) {
    const phoneNumber = "5519999606402"; 
    const whatsappMessage = encodeURIComponent(message); 
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${whatsappMessage}`); 
}

// Função para lidar com o envio do formulário
function handleFormSubmit(event) {
    event.preventDefault(); 

    // Obtém os valores dos campos do formulário
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Constrói a mensagem a ser enviada
    const whatsappMessage = `Nome: ${name} E-mail: ${email} Telefone: ${phone} Mensagem: ${message}`;

    // Envia a mensagem para o WhatsApp
    sendToWhatsApp(whatsappMessage);
}

// Adiciona o ouvinte de evento ao formulário quando a página é carregada
window.onload = function() {
    const form = document.getElementById("contatoForm"); 
    form.addEventListener("submit", handleFormSubmit); 
};
