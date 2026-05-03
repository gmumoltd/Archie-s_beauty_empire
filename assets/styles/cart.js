// ================================================
// Archie's Beauty Empire — Cart Functionality
// Shared across all pages
// ================================================

let cart = [];

function addToCart(name, price) {
  // Check if item already in cart
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartUI();
  // Open cart sidebar briefly
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotalSection = document.getElementById('cartTotalSection');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const checkoutBtn = document.getElementById('checkoutBtn');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Update badge
  if (cartCount) cartCount.textContent = totalItems;

  // Update sidebar items
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = '<p style="color:var(--grey); font-size:0.85rem; text-align:center; margin-top:30px;">Your cart is empty.</p>';
    } else {
      cartItems.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div style="font-size:0.75rem; color:var(--grey);">x${item.qty}</div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="cart-item-price">KES ${(item.price * item.qty).toLocaleString()}</span>
            <button class="cart-remove" onclick="removeFromCart(${i})"><i class="fas fa-times"></i></button>
          </div>
        </div>
      `).join('');
    }
  }

  // Total
  if (cartTotalSection) {
    cartTotalSection.style.display = cart.length > 0 ? 'flex' : 'none';
  }
  if (cartTotalPrice) {
    cartTotalPrice.textContent = 'KES ' + totalPrice.toLocaleString();
  }
  if (checkoutBtn) {
    checkoutBtn.style.display = cart.length > 0 ? 'block' : 'none';
  }

  // Update inline cart summary (booking page)
  const summaryInline = document.getElementById('cartSummaryInline');
  const summaryTotal = document.getElementById('cartSummaryTotal');
  const inlineTotal = document.getElementById('inlineCartTotal');

  if (summaryInline) {
    if (cart.length === 0) {
      summaryInline.innerHTML = '<p style="color:var(--grey); font-size:0.85rem;">No services added yet.</p>';
    } else {
      summaryInline.innerHTML = cart.map(item => `
        <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.85rem;">
          <span style="color:#ccc;">${item.name} x${item.qty}</span>
          <span style="color:var(--gold);">KES ${(item.price * item.qty).toLocaleString()}</span>
        </div>
      `).join('');
    }
  }
  if (summaryTotal) {
    summaryTotal.style.display = cart.length > 0 ? 'block' : 'none';
  }
  if (inlineTotal) {
    inlineTotal.textContent = 'KES ' + totalPrice.toLocaleString();
  }
}

function checkout() {
  if (cart.length === 0) return;
  alert('Redirecting to booking page to complete your appointment!');
  window.location.href = 'booking.html';
}

// Initialize
updateCartUI();
