class LanguageManager {
    constructor() {
        this.currentLanguage = document.documentElement.lang || 'fr';
        this.button = document.getElementById('language-toggle');
        this.init();
    }

    init() {
        this.updateButton();
        this.button.addEventListener('click', () => this.goToOtherLanguage());
    }

    goToOtherLanguage() {
        const target = this.button.dataset.target;
        if (target) {
            window.location.href = target;
        }
    }

    updateButton() {
        const nextLanguage = this.currentLanguage === 'fr' ? 'En' : 'Fr';
        this.button.textContent = nextLanguage;

        const titleKey = this.currentLanguage === 'fr' ? 'switch-to-english' : 'switch-to-french';
        const title = trad[this.currentLanguage]?.[titleKey] ||
            (this.currentLanguage === 'fr' ? 'Passer en anglais' : 'Switch to French');
        this.button.title = title;
    }
}

class ThemeManager {
    constructor() {

        this.currentTheme = localStorage.getItem('portfolio-theme') ||
            (typeof getSystemTheme === 'function' ? getSystemTheme() : 'dark');
        this.button = document.getElementById('theme-toggle');
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.init();
    }

    init() {
        this.updateButton();
        this.button.addEventListener('click', () => this.toggleTheme());

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);

        this.updateButton();

        localStorage.setItem('portfolio-theme', theme);
    }

    resetToSystem() {
        localStorage.removeItem('portfolio-theme');
        const systemTheme = typeof getSystemTheme === 'function' ? getSystemTheme() : 'dark';
        this.setTheme(systemTheme);
    }

    updateButton() {
        const currentLanguage = document.documentElement.lang || 'fr';

        const nextTheme = this.currentTheme === 'light' ?
            (currentLanguage === 'fr' ? 'Sombre' : 'Dark') :
            (currentLanguage === 'fr' ? 'Clair' : 'Light');
        this.button.textContent = nextTheme;

        const titleKey = this.currentTheme === 'light' ? 'switch-to-dark' : 'switch-to-light';
        const title = trad[currentLanguage]?.[titleKey] ||
            (this.currentTheme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair');
        this.button.title = title;
    }
}



document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    const themeManager = new ThemeManager();

    window.resetThemeToSystem = () => themeManager.resetToSystem();
});