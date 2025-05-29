document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll event listener to handle navbar background
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.backgroundColor = '#fff';
        }
    });

    // Waitlist form handling
    const waitlistForm = document.getElementById('waitlistForm');
    const formMessage = document.getElementById('formMessage');
    const buttonText = document.querySelector('.button-text');
    const loadingSpinner = document.querySelector('.loading-spinner');

    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show coming soon message
        formMessage.textContent = 'Waitlist Coming Soon! Stay tuned for updates.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        waitlistForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu')) {
            navLinks.classList.remove('active');
        }
    });
}); 