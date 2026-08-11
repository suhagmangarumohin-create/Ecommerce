const productDetail = document.getElementById('product-detail');
const productId = Number(getQueryParam('id'));

async function loadProductDetail() {
  const products = await fetchJSON('/api/products');
  const product = products.find(p => p.id === productId);

  if (!product) {
    productDetail.innerHTML = '<p>Product not found.</p>';
    return;
  }

  productDetail.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-detail-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-detail-info">
        <span class="product-category">${product.category}</span>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="product-detail-price">${formatPrice(product.price)}</div>
        <div class="product-detail-actions">
          <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

window.addToCart = async function(productId) {
  await fetch('/api/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity: 1 })
  });
  window.location.href = 'checkout.html';
};

loadProductDetail();
