
//Initialisation avec français par défaut et détection thème systèm

(function() {
    
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    
    const savedTheme = localStorage.getItem('portfolio-theme') || getSystemTheme();
    const savedLanguage = localStorage.getItem('portfolio-language') || 'fr';
    
    // Appliquer le thème et la langue immédiatement
    document.documentElement.setAttribute('data-theme', savedTheme);
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
        // Bouton de thème
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.textContent = savedTheme === 'light' ? 'Dark' : 'Light';
            
            const titleKey = savedTheme === 'light' ? 'switch-to-dark' : 'switch-to-light';
            const title = trad[savedLanguage]?.[titleKey] || 
                         (savedTheme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair');
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