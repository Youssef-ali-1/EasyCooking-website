const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const userData = {
            userName: name,
            userEmail: email,
            userPassword: password
        };
        localStorage.setItem('projectUser', JSON.stringify(userData));
        alert('Account created successfully! Redirecting to login page...');
        window.location.href = 'login.html'; 
    });
}