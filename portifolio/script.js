function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
    });
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

// Função para rolar os projetos
function scrollProjects(direction) {
    const container = document.querySelector('.project-cards');
    const scrollAmount = direction === 'right' ? 200 : -450;
    container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
    });
}

// Função para atualizar a exibição dos cartões de projetos
function updateCards() {
    const cards = document.querySelectorAll('.project-cards .card');
    const cardsToShow = 2;
    let currentCardIndex = 0;

    function showCards() {
        cards.forEach((card, index) => {
            if (
                index >= currentCardIndex &&
                index < currentCardIndex + cardsToShow
            ) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    showCards();

    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    prevButton.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex -= cardsToShow;
            showCards();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentCardIndex + cardsToShow < cards.length) {
            currentCardIndex += cardsToShow;
            showCards();
        }
    });
}

updateCards();

// Função para alternar o menu de navegação
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// Função para alternar o tema entre claro e escuro
function toggleTheme() {
    const root = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');

    if (root.classList.toggle('light-theme')) {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

// Função para carregar traduções
async function loadTranslations(lang) {
    const response = await fetch(`${lang}.json`);
    const translations = await response.json();
    return translations;
}

// Função para aplicar traduções
function applyTranslations(translations) {
    document.title = translations.title;
    document.getElementById('projects-title').textContent = translations.projects;
    document.getElementById('about-title').textContent = translations.about;
    document.getElementById('contact-title').textContent = translations.contact;
}

// Função para detectar o idioma do navegador
function getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('pt') ? 'pt' : 'en';
}

// Carregar e aplicar traduções ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
    const lang = getBrowserLanguage();
    const translations = await loadTranslations(lang);
    applyTranslations(translations);
});