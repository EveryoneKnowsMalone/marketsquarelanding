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

    waitlistForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Show loading state
        buttonText.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';
        waitlistForm.querySelector('button').disabled = true;

        // Get form data
        const formData = new FormData(waitlistForm);
        const data = {
            businessName: formData.get('businessName'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            // Replace with your actual API endpoint
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Show success message
            formMessage.textContent = 'Thank you for joining our waitlist! We\'ll be in touch soon.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            waitlistForm.reset();

        } catch (error) {
            // Show error message
            formMessage.textContent = 'Sorry, something went wrong. Please try again later.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        } finally {
            // Reset button state
            buttonText.style.display = 'inline-block';
            loadingSpinner.style.display = 'none';
            waitlistForm.querySelector('button').disabled = false;
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu')) {
            navLinks.classList.remove('active');
        }
    });
}); 