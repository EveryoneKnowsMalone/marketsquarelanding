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

    // --- Demo Section Interactivity ---
    const demoProducts = [
      {
        id: 1,
        name: 'Smartphone X1',
        price: '$499',
        img: 'https://placehold.co/200x150?text=Phone',
        desc: 'A powerful smartphone with all-day battery and stunning display.',
        category: 'electronics'
      },
      {
        id: 2,
        name: 'Classic Jacket',
        price: '$89',
        img: 'https://placehold.co/200x150?text=Jacket',
        desc: 'A timeless fashion piece for all seasons.',
        category: 'fashion'
      },
      {
        id: 3,
        name: 'Modern Lamp',
        price: '$39',
        img: 'https://placehold.co/200x150?text=Lamp',
        desc: 'Brighten your home with this stylish modern lamp.',
        category: 'home'
      },
      {
        id: 4,
        name: 'Skincare Set',
        price: '$29',
        img: 'https://placehold.co/200x150?text=Skincare',
        desc: 'Complete skincare set for glowing, healthy skin.',
        category: 'beauty'
      },
      {
        id: 5,
        name: 'Laptop Pro',
        price: '$999',
        img: 'https://placehold.co/200x150?text=Laptop',
        desc: 'High-performance laptop for work and play.',
        category: 'electronics'
      }
    ];

    // Category filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.demo-product-card');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        productCards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Quick View modal
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const quickViewModal = document.getElementById('quickViewModal');
    const modalImg = document.getElementById('modalProductImg');
    const modalName = document.getElementById('modalProductName');
    const modalPrice = document.getElementById('modalProductPrice');
    const modalDesc = document.getElementById('modalProductDesc');
    const closeModalBtn = document.querySelector('.close-modal');

    quickViewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const prodId = btn.getAttribute('data-product');
        const prod = demoProducts.find(p => p.id == prodId);
        if (prod) {
          modalImg.src = prod.img;
          modalName.textContent = prod.name;
          modalPrice.textContent = prod.price;
          modalDesc.textContent = prod.desc;
          quickViewModal.style.display = 'flex';
        }
      });
    });
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        quickViewModal.style.display = 'none';
      });
    }
    window.addEventListener('click', function(e) {
      if (e.target === quickViewModal) {
        quickViewModal.style.display = 'none';
      }
    });

    // --- Dashboard Button Alert ---
    const sellerBtn = document.querySelector('.dashboard-btn.seller-btn');
    const adminBtn = document.querySelector('.dashboard-btn.admin-btn');
    if (sellerBtn) sellerBtn.addEventListener('click', e => { e.preventDefault(); alert('Coming soon'); });
    if (adminBtn) adminBtn.addEventListener('click', e => { e.preventDefault(); alert('Coming soon'); });
}); 