// Password protection logic
const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const passwordSubmit = document.getElementById('passwordSubmit');
const passwordError = document.getElementById('passwordError');
const storeHeader = document.getElementById('storeHeader');
const storeFooter = document.getElementById('storeFooter');
const heroBanner = document.getElementById('heroBanner');
const productsSection = document.getElementById('productsSection');

function showStore() {
    passwordModal.style.display = 'none';
    storeHeader.style.display = '';
    storeFooter.style.display = '';
    heroBanner.style.display = '';
    productsSection.style.display = '';
}

function checkPassword() {
    if (passwordInput.value === '0012') {
        showStore();
    } else {
        passwordError.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

if (passwordSubmit && passwordInput) {
    passwordSubmit.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') checkPassword();
    });
}
if (passwordInput) {
    setTimeout(() => passwordInput.focus(), 100);
}

// --- Product Grid & Cart Logic ---
const products = [
    { id: 1, name: 'Wireless Earbuds', price: 59.99, img: 'https://placehold.co/160x120/4f46e5/fff?text=Earbuds', desc: 'Enjoy music on the go.' },
    { id: 2, name: 'Smart Watch', price: 129.99, img: 'https://placehold.co/160x120/6366f1/fff?text=Watch', desc: 'Track your fitness and notifications.' },
    { id: 3, name: 'Eco Water Bottle', price: 19.99, img: 'https://placehold.co/160x120/f59e42/fff?text=Bottle', desc: 'Reusable and eco-friendly.' },
    { id: 4, name: 'Bluetooth Speaker', price: 39.99, img: 'https://placehold.co/160x120/4f46e5/fff?text=Speaker', desc: 'Portable and powerful sound.' },
    { id: 5, name: 'Fitness Mat', price: 34.99, img: 'https://placehold.co/160x120/6366f1/fff?text=Mat', desc: 'Perfect for yoga and workouts.' },
    { id: 6, name: 'Handmade Bag', price: 49.99, img: 'https://placehold.co/160x120/f59e42/fff?text=Bag', desc: 'Stylish handmade bag for everyday use.' }
];
let cart = [];

function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>${product.desc}</p>
            <div class="price">$${product.price.toFixed(2)}</div>
            <button data-id="${product.id}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
        `;
        card.querySelector('button').addEventListener('click', () => addToCart(product.id));
        grid.appendChild(card);
    });
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    if (!cartItems || !cartTotal || !cartCount) return;
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;
        total += product.price * item.qty;
        count += item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${product.name} x${item.qty}</span>
            <span>$${(product.price * item.qty).toFixed(2)} <button class="remove-item" title="Remove" data-id="${item.id}">&times;</button></span>
        `;
        div.querySelector('.remove-item').addEventListener('click', () => removeFromCart(item.id));
        cartItems.appendChild(div);
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = count;
}

function addToCart(id) {
    const found = cart.find(item => item.id === id);
    if (found) {
        found.qty += 1;
    } else {
        cart.push({ id, qty: 1 });
    }
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// Cart Modal Logic
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartModal = document.getElementById('closeCartModal');

if (cartBtn && cartModal) {
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        renderCart();
    });
}
if (closeCartModal && cartModal) {
    closeCartModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
}

// Hamburger/mobile menu logic
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const cartBtnMobile = document.getElementById('cartBtnMobile');
const cartCountMobile = document.getElementById('cartCountMobile');

if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.style.display = 'flex';
        renderCart();
        // Sync cart count
        cartCountMobile.textContent = document.getElementById('cartCount').textContent;
    });
}
if (closeMobileMenu && mobileMenu) {
    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
}
if (cartBtnMobile && cartModal) {
    cartBtnMobile.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        mobileMenu.style.display = 'none';
        renderCart();
    });
}
// Update mobile cart count when cart changes
function updateMobileCartCount() {
    if (cartCountMobile) {
        cartCountMobile.textContent = document.getElementById('cartCount').textContent;
    }
}
// Patch renderCart to also update mobile count
const origRenderCart = renderCart;
renderCart = function() {
    origRenderCart();
    updateMobileCartCount();
};

// --- Account Modal Logic ---
const accountModal = document.getElementById('accountModal');
const closeAccountModal = document.getElementById('closeAccountModal');
const accountBtns = document.querySelectorAll('.account-btn');
const accountAuth = document.getElementById('accountAuth');
const accountRegister = document.getElementById('accountRegister');
const accountProfile = document.getElementById('accountProfile');
const showRegister = document.getElementById('showRegister');
const showSignIn = document.getElementById('showSignIn');
const signInForm = document.getElementById('signInForm');
const registerForm = document.getElementById('registerForm');
const accountError = document.getElementById('accountError');
const signOutBtn = document.getElementById('signOutBtn');
const profileEmail = document.getElementById('profileEmail');
const profileEmail2 = document.getElementById('profileEmail2');

function openAccountModal() {
    accountModal.style.display = 'flex';
    accountAuth.style.display = '';
    accountRegister.style.display = 'none';
    accountProfile.style.display = 'none';
    accountError.style.display = 'none';
    setTimeout(() => {
        const emailInput = document.getElementById('accountEmail');
        if (emailInput) emailInput.focus();
    }, 100);
}
function closeAccount() {
    accountModal.style.display = 'none';
}
accountBtns.forEach(btn => {
    btn.addEventListener('click', openAccountModal);
});
if (closeAccountModal) closeAccountModal.addEventListener('click', closeAccount);

if (showRegister) showRegister.addEventListener('click', e => {
    e.preventDefault();
    accountAuth.style.display = 'none';
    accountRegister.style.display = '';
    accountProfile.style.display = 'none';
});
if (showSignIn) showSignIn.addEventListener('click', e => {
    e.preventDefault();
    accountAuth.style.display = '';
    accountRegister.style.display = 'none';
    accountProfile.style.display = 'none';
});

if (signInForm) signInForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('accountEmail').value;
    const password = document.getElementById('accountPassword').value;
    if (password === 'demo') {
        accountAuth.style.display = 'none';
        accountRegister.style.display = 'none';
        accountProfile.style.display = '';
        profileEmail.textContent = email;
        profileEmail2.textContent = email;
        accountError.style.display = 'none';
    } else {
        accountError.style.display = 'block';
    }
});
if (registerForm) registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    if (password === 'demo') {
        accountAuth.style.display = 'none';
        accountRegister.style.display = 'none';
        accountProfile.style.display = '';
        profileEmail.textContent = email;
        profileEmail2.textContent = email;
        accountError.style.display = 'none';
    } else {
        accountError.style.display = 'block';
    }
});
if (signOutBtn) signOutBtn.addEventListener('click', function() {
    accountAuth.style.display = '';
    accountRegister.style.display = 'none';
    accountProfile.style.display = 'none';
    accountError.style.display = 'none';
});
// Close modal on Esc
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && accountModal.style.display === 'flex') {
        closeAccount();
    }
});

// Initial render
renderProducts();
renderCart(); 