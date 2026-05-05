
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const savedUserString = localStorage.getItem('projectUser');
        if (savedUserString) {
            const savedUser = JSON.parse(savedUserString);
            if (email === savedUser.userEmail && password === savedUser.userPassword) {
                alert('Welcome back, ' + savedUser.userName + '!');
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = './index.html'; /* team  */
            } else {
                alert('Invalid email or password. Please try again.');
            }
        } else {
            alert('No account found. Please sign up first.');
        }
    });
}