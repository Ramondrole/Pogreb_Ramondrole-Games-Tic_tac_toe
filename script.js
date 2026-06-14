const translations = {
    ru: {
        about: "Обо мне",
        games: "Наши игры",
        functions: "Полезные функции",
        latestVideo: "Последнее видео:",
        version: "Версия: 3.3"
    },
    en: {
        about: "About me",
        games: "Our games",
        functions: "Useful functions",
        latestVideo: "Latest video:",
        version: "Version: 3.3"
    },
    de: {
        about: "Über mich",
        games: "Unsere Spiele",
        functions: "Nützliche Funktionen",
        latestVideo: "Letztes Video:",
        version: "Version: 3.3"
    }
};

let currentLang = localStorage.getItem('language') || 'ru';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    const flags = { ru: '🌐 RU', en: '🌐 EN', de: '🌐 DE' };
    document.getElementById('langBtn').innerHTML = flags[lang];
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        const key = link.getAttribute('data-key');
        if (key && translations[lang][key]) {
            link.textContent = translations[lang][key];
        }
    });
    
    document.getElementById('latestVideoTitle').textContent = translations[lang].latestVideo;
    document.getElementById('versionText').textContent = translations[lang].version;
    document.documentElement.lang = lang;
}

document.querySelectorAll('[data-lang]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage(item.getAttribute('data-lang'));
    });
});

setLanguage(currentLang);