async function loadGallery() {
  const response = await fetch('/api/products');
  const products = await response.json();

  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'gallery-card';

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.className = 'gallery-image';

    const info = document.createElement('div');
    info.className = 'gallery-card-info';
    info.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <p class="price">$${product.price.toFixed(2)}</p>
    `;

    const button = document.createElement('a');
    button.href = `product.html?id=${product.id}`;
    button.className = 'btn btn-primary gallery-button';
    button.textContent = 'View Product';

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(button);
    grid.appendChild(card);
  });
}

loadGallery().catch(console.error);
