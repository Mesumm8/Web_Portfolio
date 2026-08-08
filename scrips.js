function toggleMenu() {
    const menu = document.querySelector(".menu-links")
    const icon = document.querySelector(".hamburger-icon")
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 20) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const carouselTrack = document.querySelector('.project-carousel-track');
const prevArrow = document.getElementById('carousel-prev');
const nextArrow = document.getElementById('carousel-next');

let currentPage = 0;
let visibleCardsPerPage = 3;

function updateVisibleCount() {
    const width = window.innerWidth;
    if (width <= 650) {
        visibleCardsPerPage = 1;
    } else if (width <= 900) {
        visibleCardsPerPage = 2;
    } else {
        visibleCardsPerPage = 3;
    }
}

function getFilteredCards() {
    return Array.from(projectCards).filter((card) => !card.classList.contains('is-hidden'));
}

function updateCarousel() {
    const cards = getFilteredCards();
    const pageCount = Math.max(1, Math.ceil(cards.length / visibleCardsPerPage));
    if (currentPage >= pageCount) currentPage = pageCount - 1;

    const slideWidth = carouselTrack.clientWidth / pageCount;
    const shift = currentPage * slideWidth;
    carouselTrack.style.transform = `translateX(-${shift}px)`;
    prevArrow.disabled = currentPage === 0;
    nextArrow.disabled = currentPage >= pageCount - 1;
}

function refreshCarousel() {
    currentPage = 0;
    updateVisibleCount();
    updateCarousel();
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        projectCards.forEach((card) => {
            const matches = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('is-hidden', !matches);
        });

        refreshCarousel();
    });
});

nextArrow.addEventListener('click', () => {
    const cards = getFilteredCards();
    const pageCount = Math.max(1, Math.ceil(cards.length / visibleCardsPerPage));
    if (currentPage < pageCount - 1) {
        currentPage += 1;
        updateCarousel();
    }
});

prevArrow.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage -= 1;
        updateCarousel();
    }
});

window.addEventListener('resize', () => {
    updateVisibleCount();
    updateCarousel();
});

window.addEventListener('load', () => {
    refreshCarousel();
});