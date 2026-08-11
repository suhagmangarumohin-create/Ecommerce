const productList = document.getElementById('product-list');
const categorySelect = document.getElementById('category-select');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchStatus = document.getElementById('search-status');

let products = [];
let categories = [];

function updateSearchStatus(count) {
  if (searchStatus) {
    if (!searchInput.value.trim()) {
      searchStatus.textContent = `Showing ${count} products`;
    } else {
      searchStatus.textContent = `Found ${count} products for "${searchInput.value}"`;
    }
  }
}

function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  return products.filter(product => {
    const matchesCategory = category ? product.category === category : true;
    const matchesQuery = query
      ? product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
      : true;
    return matchesCategory && matchesQuery;
  });
}

function renderProducts(items) {
  productList.innerHTML = '';
  if (!items.length) {
    productList.innerHTML = '<p class="no-results">No products matched your filters.</p>';
    return;
  }
  items.forEach(product => productList.appendChild(createProductCard(product)));
  updateSearchStatus(items.length);
}

function renderCategories() {
  categorySelect.innerHTML = '<option value="">All categories</option>' +
    categories.map(category => `<option value="${category}">${category}</option>`).join('');
}

async function loadProductsPage() {
  products = await fetchJSON('/api/products');
  categories = [...new Set(products.map(p => p.category))];
  renderCategories();

  const selectedCategory = getQueryParam('category');
  if (selectedCategory) {
    categorySelect.value = selectedCategory;
  }

  const filteredProducts = filterProducts();
  renderProducts(filteredProducts);
}

searchButton.addEventListener('click', event => {
  event.preventDefault();
  renderProducts(filterProducts());
});

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    renderProducts(filterProducts());
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadProductsPage);
} else {
  loadProductsPage();
}

categorySelect.addEventListener('change', () => renderProducts(filterProducts()));

loadProductsPage();
