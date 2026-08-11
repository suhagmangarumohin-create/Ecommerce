const ordersList = document.getElementById('orders-list');

function renderOrders() {
  const storedOrders = localStorage.getItem('shopbayOrders');
  const orders = storedOrders ? JSON.parse(storedOrders) : [];

  if (!orders.length) {
    ordersList.innerHTML = `
      <div class="order-card">
        <p>No orders found.</p>
      </div>
    `;
    return;
  }

  ordersList.innerHTML = orders.map(order => `
    <div class="order-card">
      <h3>Order for ${order.user.email}</h3>
      <small>${new Date(order.placedAt).toLocaleString()}</small>
      <p>${order.items.map(item => `${item.quantity} x ${item.product.name}`).join('<br/>')}</p>
      <p><strong>Total:</strong> ${order.total}</p>
    </div>
  `).join('');
}

renderOrders();
