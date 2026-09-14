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

const ACTIVITY_START_DATE = '2025-06-30';

function getActivityDuration(startDateStr) {
    const start = new Date(startDateStr);
    const now = new Date();

    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    let days = now.getDate() - start.getDate();

    if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
    }

    return { months, days };
}

function formatActivityDuration(months, days, lang) {
    if (lang === 'en') {
        const monthLabel = months === 1 ? 'month' : 'months';
        const dayLabel = days === 1 ? 'day' : 'days';
        return `${months} ${monthLabel} and ${days} ${dayLabel}`;
    }
    const dayLabel = days === 1 ? 'jour' : 'jours';
    return `${months} mois et ${days} ${dayLabel}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const activityDurationEl = document.getElementById('activity-duration');
    if (activityDurationEl) {
        const lang = document.documentElement.lang || 'fr';
        const { months, days } = getActivityDuration(ACTIVITY_START_DATE);
        activityDurationEl.textContent = formatActivityDuration(months, days, lang);
    }
});



