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
