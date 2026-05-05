   const btn = document.getElementById('layoutBtn');
    const header = document.querySelector('header');
    btn.onclick = function() {
        header.classList.toggle('active');
    };