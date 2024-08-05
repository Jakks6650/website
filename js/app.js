document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const adminForm = document.getElementById('adminForm');
    const storedBgColor = localStorage.getItem('bgColor');
    const storedTitle = localStorage.getItem('title');

    if (storedBgColor) {
        document.body.style.setProperty('--bg-color', storedBgColor);
    }

    if (storedTitle) {
        document.querySelector('header h1').innerText = storedTitle;
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;

            if (username === 'admin' && password === 'password') {
                window.location.href = '../admin/admin.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const bgColor = e.target.bgColor.value;
            const title = e.target.title.value;

            if (bgColor) {
                document.body.style.setProperty('--bg-color', bgColor);
                localStorage.setItem('bgColor', bgColor);
            }

            if (title) {
                document.querySelector('header h1').innerText = title;
                localStorage.setItem('title', title);
            }

            alert('Settings updated');
        });
    }
});
