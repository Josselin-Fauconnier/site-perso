(function() {

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    const savedTheme = localStorage.getItem('portfolio-theme');
    const savedLanguage = localStorage.getItem('portfolio-language') || 'fr';
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    document.documentElement.lang = savedLanguage;
    
  
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', (e) => {
       
        if (!localStorage.getItem('portfolio-theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            
           
            const themeBtn = document.getElementById('theme-toggle');
            if (themeBtn && typeof updateThemeButton === 'function') {
                updateThemeButton(newTheme);
            }
        }
    });
    
    
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof trad !== 'undefined') {
            initializeButtons();
        } else {
            setTimeout(initializeButtons, 10);
        }
    });
    
    function initializeButtons() {
        const currentTheme = localStorage.getItem('portfolio-theme') || getSystemTheme();
        
        
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.textContent = currentTheme === 'Dark' ? 'Light' : 'Dark';
            
            const titleKey = currentTheme === 'Dark' ? 'switch-to-dark' : 'switch-to-light';
            const title = trad[savedLanguage]?.[titleKey] || 
                         (currentTheme === 'Dark' ? 'Passer en mode sombre' : 'Passer en mode clair');
            themeBtn.title = title;
        }
        
        
        const langBtn = document.getElementById('language-toggle');
        if (langBtn) {
            langBtn.textContent = savedLanguage === 'fr' ? 'En' : 'Fr';
            
            const titleKey = savedLanguage === 'fr' ? 'switch-to-english' : 'switch-to-french';
            const title = trad[savedLanguage]?.[titleKey] || 
                         (savedLanguage === 'fr' ? 'Passer en anglais' : 'Switch to French');
            langBtn.title = title;
        }
    }
    
    
    window.getSystemTheme = getSystemTheme;
})();
