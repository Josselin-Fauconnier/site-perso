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

    window.getSystemTheme = getSystemTheme;
})();
