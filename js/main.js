document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const greetingEl = document.getElementById('dynamic-greeting');
    if (greetingEl) {
        const hour = new Date().getHours();
        let greeting = 'Halo, Selamat Datang!';

        if (hour >= 5 && hour < 12) {
            greeting = 'Selamat Pagi! 🌅';
        } else if (hour >= 12 && hour < 15) {
            greeting = 'Selamat Siang! ☀️';
        } else if (hour >= 15 && hour < 18) {
            greeting = 'Selamat Sore! 🌇';
        } else {
            greeting = 'Selamat Malam! 🌙';
        }

        greetingEl.textContent = greeting;
    }

    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('shadow-lg', 'bg-dark/90');
                navbar.classList.remove('bg-dark/70');
            } else {
                navbar.classList.remove('shadow-lg', 'bg-dark/90');
                navbar.classList.add('bg-dark/70');
            }
        });
    }
});
