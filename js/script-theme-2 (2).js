
const savedTheme = localStorage.getItem('theme');
const body = document.body;

// الجزء ده هيشتغل في كل الصفحات عادي
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
}

const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function updateIcon() {
   
    if (!themeIcon) return; 

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
        
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
}
