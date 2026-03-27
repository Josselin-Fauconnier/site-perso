(function() {

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    window.getSystemTheme = getSystemTheme;
})();



