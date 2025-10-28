class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('portfolio-language') || 'fr';
        this.button = document.getElementById('language-toggle');
        this.init();
    }

    init() {
        this.applyTranslations();
        this.updateButton();
        this.button.addEventListener('click', () => this.toggleLanguage());
    }

    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'fr' ? 'en' : 'fr';
        this.setLanguage(newLanguage);
    }

    setLanguage(language) {
        this.currentLanguage = language;
        document.documentElement.lang = language;

        this.applyTranslations();
        this.updateButton();
        
        localStorage.setItem('portfolio-language', language);
        
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language } 
        }));
    }
    
    resetToDefault() {
        localStorage.removeItem('portfolio-language');
        this.setLanguage('fr');
    }

    applyTranslations() {
        document.querySelectorAll('[data-translation]').forEach(element => {
            const key = element.getAttribute('data-translation');
            const translation = trad[this.currentLanguage]?.[key];

            if (translation) {
                element.textContent = translation;
            }
        });
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
        
      
        document.addEventListener('languageChanged', () => {
            this.updateButton();
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
        const currentLanguage = localStorage.getItem('portfolio-language') || 'fr';
        
        
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


function updateThemeButton(theme) {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const currentLanguage = localStorage.getItem('portfolio-language') || 'fr';
        const themeText = theme === 'dark' ? 
            (currentLanguage === 'fr' ? 'Sombre' : 'Dark') : 
            (currentLanguage === 'fr' ? 'Clair' : 'Light');
        themeBtn.textContent = themeText;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const langManager = new LanguageManager();
    const themeManager = new ThemeManager();
    
    window.resetThemeToSystem = () => themeManager.resetToSystem();
    window.resetLanguageToDefault = () => langManager.resetToDefault();
});