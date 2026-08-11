const checkoutCart = document.getElementById('checkout-cart');
const checkoutSummary = document.getElementById('checkout-summary');
const placeOrderBtn = document.getElementById('place-order-btn');
const orderMessage = document.getElementById('order-message');

function createCheckoutItem(item) {
  const row = document.createElement('div');
  row.className = 'item-row';
  row.innerHTML = `
    <div class="item-details">
      <strong>${item.product.name}</strong>
      <small>${formatPrice(item.product.price)} each</small>
    </div>
    <div>
      <div class="quantity-controls">
        <button onclick="updateQuantity(${item.product.id}, ${item.quantity - 1})">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.product.id}, ${item.quantity + 1})">+</button>
      </div>
      <div>${formatPrice(item.product.price * item.quantity)}</div>
    </div>
  `;
  return row;
}

function renderCheckoutCart(cart) {
  checkoutCart.innerHTML = '';
  if (!cart.length) {
    checkoutCart.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  cart.forEach(item => checkoutCart.appendChild(createCheckoutItem(item)));
}

async function refreshCheckout() {
  const [cart, summary] = await Promise.all([fetchJSON('/api/cart'), fetchJSON('/api/checkout')]);
  renderCheckoutCart(cart);
  renderCheckoutSummary(summary);
}

function renderCheckoutSummary(summary) {
  if (!summary || summary.itemCount === 0) {
    checkoutSummary.innerHTML = '<p>No checkout summary available.</p>';
    return;
  }
  checkoutSummary.innerHTML = `
    <div class="summary-row"><span>Items:</span><strong>${summary.itemCount}</strong></div>
    <div class="summary-row"><span>Subtotal:</span><strong>${formatPrice(summary.subtotal)}</strong></div>
    <div class="summary-row"><span>Shipping:</span><strong>${formatPrice(summary.shipping)}</strong></div>
    <div class="summary-row"><span>Tax:</span><strong>${formatPrice(summary.tax)}</strong></div>
    <div class="summary-row total"><span>Total:</span><strong>${formatPrice(summary.total)}</strong></div>
  `;
}

window.updateQuantity = async function(productId, quantity) {
  if (quantity < 1) {
    await removeFromCart(productId);
    return;
  }

  await fetchJSON('/api/cart/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity })
  });
  await refreshCheckout();
};

window.removeFromCart = async function(productId) {
  await fetchJSON('/api/cart/remove', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId })
  });
  await refreshCheckout();
};

placeOrderBtn.addEventListener('click', async () => {
  const response = await fetchJSON('/api/checkout');
  if (response.itemCount === 0) {
    orderMessage.innerText = 'Your cart is empty.';
    orderMessage.className = 'order-message error';
    return;
  }

  const user = getStoredUser();
  if (!user) {
    orderMessage.innerText = 'Please log in before placing an order.';
    orderMessage.className = 'order-message error';
    return;
  }

  const cart = await fetchJSON('/api/cart');
  const total = formatPrice(response.total);
  const order = {
    user,
    items: cart,
    total,
    placedAt: new Date().toISOString()
  };

  const existingOrders = JSON.parse(localStorage.getItem('shopbayOrders') || '[]');
  existingOrders.push(order);
  localStorage.setItem('shopbayOrders', JSON.stringify(existingOrders));

  orderMessage.innerText = `Order placed successfully for ${user.email}! Total ${total}.`;
  orderMessage.className = 'order-message success';

  // Clear the cart after successful order placement
  await fetchJSON('/api/cart/clear', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  // Refresh the checkout display to show empty cart
  await refreshCheckout();

  // Show success notification
  if (window.showToast) {
    showToast('✓ Order placed successfully! Your cart has been cleared.', 'success', 4000);
  }
});

refreshCheckout();
