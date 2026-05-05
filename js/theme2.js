const savedTheme = localStorage.getItem('theme');
const body = document.body;
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
}
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
function updateIcon() {
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
updateIcon();
if (themeBtn) {
themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    updateIcon();
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
}
