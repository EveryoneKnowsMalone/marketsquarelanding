document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Add item index for staggered animation
    navLinks.querySelectorAll('li').forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = navLinks.classList.contains('active');
        
        if (!isActive) {
            navLinks.classList.add('active');
            mobileMenuButton.classList.add('active');
            body.style.overflow = 'hidden';
        } else {
            navLinks.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuButton.classList.remove('active');
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
}); 