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

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;

        projectCards.forEach((card) => {
            const matches = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('is-hidden', !matches);
        });
    });
});