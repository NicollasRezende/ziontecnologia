let currentSlide = 0;
let slides = [];

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

document.addEventListener('DOMContentLoaded', () => {
    slides = [
        document.getElementById('servico-camera'),
        document.getElementById('servico-dvr'),
        document.getElementById('servico-cabeamento'),
        document.getElementById('servico-alarme'),
    ];
    showSlide(currentSlide);
    setInterval(nextSlide, 5000); // Muda de slide a cada 5 segundos
});

AOS.init({
    duration: 1000, // Duração da animação em milissegundos
    once: true, // Se verdadeiro, a animação ocorre apenas uma vez
});

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// Função para adicionar animações aos elementos ao rolar a página
function handleScroll() {
    const elements = document.querySelectorAll('.animate');
    elements.forEach((el) => {
        const position = el.getBoundingClientRect().top;
        if (position < window.innerHeight) {
            el.classList.add('slide-in');
        }
    });
}

// Debounce para melhorar a performance do evento de scroll
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

window.addEventListener('scroll', debounce(handleScroll));

// Função para alternar o menu de navegação
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);
