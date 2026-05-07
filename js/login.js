
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password'); 
const emailError = document.getElementById('email-error'); 
const passwordError = document.getElementById('password-error'); 
if (loginForm) { loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); let isValid = true;
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email address is required.';
        emailInput.classList.add('input-error-style'); isValid = false;
    }
    else {
        emailError.textContent = ''; emailInput.classList.remove('input-error-style');
    }
    if (passwordInput.value.trim() === '') {
        passwordError.textContent = 'Password is required.'; 
        passwordInput.classList.add('input-error-style'); isValid = false;
    } 
    else {
        passwordError.textContent = '';
        passwordInput.classList.remove('input-error-style'); 
    }
    if (isValid === true) {
        const savedUserString = localStorage.getItem('projectUser');
        if (savedUserString) {
            const savedUser = JSON.parse(savedUserString); 
            if (emailInput.value === savedUser.userEmail && passwordInput.value === savedUser.userPassword) {
                alert('Welcome back, ' + savedUser.userName + '!'); 
                localStorage.setItem('isLoggedIn', 'true'); window.location.href = '../main.html';
                passwordError.textContent = 'Invalid email or password.';
                passwordInput.classList.add('input-error-style'); 
            }
        }
        else {
            alert('No account found. Please sign up first.'); 
        }
    }
});
               }
