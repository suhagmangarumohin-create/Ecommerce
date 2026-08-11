function formatPrice(value) {
  return '$' + value.toFixed(2);
}

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);
  return response.json();
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img class="product-image" src="${product.image}" alt="${product.name}" />
    <div class="card-content">
      <span class="product-category">${product.category}</span>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="card-footer">
        <strong>${formatPrice(product.price)}</strong>
        <button class="btn" onclick="window.location.href='product.html?id=${product.id}'">View</button>
      </div>
    </div>
  `;
  return card;
}
