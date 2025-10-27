//Initialisation avec français par défaut et détection thème système

(function() {
    // Fonctions utilitaires
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Récupérer les préférences - SEULEMENT si elles existent explicitement
    const savedTheme = localStorage.getItem('portfolio-theme');
    const savedLanguage = localStorage.getItem('portfolio-language') || 'fr';
    
    // Appliquer SEULEMENT si sauvegardé explicitement
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    document.documentElement.lang = savedLanguage;
    
    // Écouter les changements de préférences système pour le thème
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', (e) => {
        // Seulement si l'utilisateur n'a pas de préférence explicite
        if (!localStorage.getItem('portfolio-theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Mettre à jour le bouton si il existe
            const themeBtn = document.getElementById('theme-toggle');
            if (themeBtn && typeof updateThemeButton === 'function') {
                updateThemeButton(newTheme);
            }
        }
    });
    
    // Initialiser les boutons avec le bon texte dès le chargement du DOM
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof trad !== 'undefined') {
            initializeButtons();
        } else {
            setTimeout(initializeButtons, 10);
        }
    });
    
    function initializeButtons() {
        const currentTheme = localStorage.getItem('portfolio-theme') || getSystemTheme();
        
        // Bouton de thème
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.textContent = currentTheme === 'light' ? 'Dark' : 'Light';
            
            const titleKey = currentTheme === 'light' ? 'switch-to-dark' : 'switch-to-light';
            const title = trad[savedLanguage]?.[titleKey] || 
                         (currentTheme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair');
            themeBtn.title = title;
        }
        
        // Bouton de langue
        const langBtn = document.getElementById('language-toggle');
        if (langBtn) {
            langBtn.textContent = savedLanguage === 'fr' ? 'En' : 'Fr';
            
            const titleKey = savedLanguage === 'fr' ? 'switch-to-english' : 'switch-to-french';
            const title = trad[savedLanguage]?.[titleKey] || 
                         (savedLanguage === 'fr' ? 'Passer en anglais' : 'Switch to French');
            langBtn.title = title;
        }
    }
    
    // Exposer les fonctions pour les classes
    window.getSystemTheme = getSystemTheme;
})();