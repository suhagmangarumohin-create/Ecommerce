const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const dataPath = __dirname;
const CART_FILE = path.join(dataPath, 'cart.json');
const PARTTIME_FILE = path.join(dataPath, 'parttime.json');

function loadData(filePath, defaultValue) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return defaultValue;
  }
}

function saveData(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const products = [
  { id: 1, name: 'Classic Sneakers', price: 49.99, description: 'Comfortable everyday shoes with breathable mesh.', category: 'cloth', image: '/images/product-1.svg' },
  { id: 2, name: 'Leather Wallet', price: 24.99, description: 'Slim wallet with RFID protection and card slots.', category: 'accessories', image: '/images/product-2.svg' },
  { id: 3, name: 'Wireless Headphones', price: 79.99, description: 'Noise-isolating over-ear headphones with long battery life.', category: 'work', image: '/images/product-3.svg' },
  { id: 4, name: 'Travel Backpack', price: 59.99, description: 'Durable backpack with laptop pocket and water-resistant fabric.', category: 'mens', image: '/images/product-4.svg' },
  { id: 5, name: 'Ceramic Mug', price: 14.99, description: '12oz mug for coffee, tea, and everyday use.', category: 'womens', image: '/images/product-5.svg' },
  { id: 6, name: 'Bluetooth Speaker', price: 39.99, description: 'Portable speaker with deep bass and built-in microphone.', category: 'work', image: '/images/product-6.svg' },
  { id: 7, name: 'Office Chair', price: 129.99, description: 'Ergonomic office chair with lumbar support.', category: 'furniture', image: '/images/product-7.svg' },
  { id: 8, name: 'Smartwatch', price: 149.99, description: 'Fitness smartwatch with heart-rate monitor and GPS.', category: 'accessories', image: '/images/product-8.svg' },
  { id: 9, name: 'LED Desk Lamp', price: 29.99, description: 'Adjustable desk lamp with warm and cool light modes.', category: 'work', image: '/images/product-9.svg' },
  { id: 10, name: 'Running Shorts', price: 22.99, description: 'Lightweight running shorts with quick-dry fabric.', category: 'mens', image: '/images/product-10.svg' },
  { id: 11, name: 'Travel Wallet', price: 19.99, description: 'Compact travel wallet for passport and cards.', category: 'accessories', image: '/images/product-11.svg' },
  { id: 12, name: 'Noise Cancelling Earbuds', price: 69.99, description: 'In-ear earbuds with active noise cancellation.', category: 'work', image: '/images/product-12.svg' },
  { id: 13, name: 'Yoga Mat', price: 34.99, description: 'Non-slip yoga mat with extra cushioning.', category: 'womens', image: '/images/product-13.svg' },
  { id: 14, name: 'Gaming Mouse', price: 49.99, description: 'RGB gaming mouse with programmable buttons.', category: 'work', image: '/images/product-14.svg' },
  { id: 15, name: 'Bamboo Cutting Board', price: 27.99, description: 'Eco-friendly cutting board with juice groove.', category: 'accessories', image: '/images/product-15.svg' },
  { id: 16, name: 'Scented Candle Set', price: 22.99, description: 'Relaxing candle gift set with three fragrances.', category: 'womens', image: '/images/product-16.svg' },
  { id: 17, name: 'Laptop Stand', price: 31.99, description: 'Adjustable stand for laptops and tablets.', category: 'work', image: '/images/product-17.svg' },
  { id: 18, name: 'Sports Water Bottle', price: 18.99, description: 'Reusable water bottle with leak-proof lid.', category: 'accessories', image: '/images/product-18.svg' },
  { id: 19, name: 'Wireless Charger', price: 25.99, description: 'Fast wireless charger for phones and earbuds.', category: 'work', image: '/images/product-19.svg' },
  { id: 20, name: 'Travel Pillow', price: 21.99, description: 'Memory foam travel pillow for long journeys.', category: 'mens', image: '/images/product-20.svg' },
  { id: 21, name: 'Portable Coffee Maker', price: 69.99, description: 'Compact coffee maker for travel and office desks.', category: 'work', image: '/images/product-21.svg' },
  { id: 22, name: 'Wireless Keyboard', price: 49.99, description: 'Slim keyboard with quiet keys and Bluetooth connectivity.', category: 'work', image: '/images/product-22.svg' },
  { id: 23, name: 'Reading Glasses', price: 29.99, description: 'Lightweight frame with blue light protection.', category: 'accessories', image: '/images/product-23.svg' },
  { id: 24, name: 'Action Camera', price: 129.99, description: 'Waterproof action camera for adventures and sports.', category: 'work', image: '/images/product-24.svg' },
  { id: 25, name: 'Desk Organizer', price: 18.99, description: 'Multi-compartment desk organizer for stationery and accessories.', category: 'work', image: '/images/product-25.svg' },
  { id: 26, name: 'Hiking Socks', price: 12.99, description: 'Breathable socks designed for comfort on long hikes.', category: 'cloth', image: '/images/product-26.svg' },
  { id: 27, name: 'Wireless Home Security', price: 99.99, description: 'Smart security camera with app notifications.', category: 'work', image: '/images/product-27.svg' },
  { id: 28, name: 'Camping Hammock', price: 45.99, description: 'Lightweight hammock with easy setup and straps.', category: 'womens', image: '/images/product-28.svg' },
  { id: 29, name: 'Cookbook', price: 22.99, description: 'Recipe book for quick and healthy meals.', category: 'womens', image: '/images/product-29.svg' },
  { id: 30, name: 'LED String Lights', price: 15.99, description: 'Decorative string lights for indoor and patio ambiance.', category: 'accessories', image: '/images/product-30.svg' }
];

const cart = loadData(CART_FILE, []);
const partTimeItems = loadData(PARTTIME_FILE, []);

function persistCart() {
  saveData(CART_FILE, cart);
}

function persistPartTime() {
  saveData(PARTTIME_FILE, partTimeItems);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/cart', (req, res) => {
  res.json(cart);
});

app.get('/api/parttime', (req, res) => {
  res.json(partTimeItems);
});

app.get('/api/checkout', (req, res) => {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  let shipping = cart.length ? 9.99 : 0;
  const uniqueCategoryCount = new Set(cart.map(item => item.product.category)).size;
  if (uniqueCategoryCount >= 4) {
    shipping = 0;
  }
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = Number((subtotal + shipping + tax).toFixed(2));

  res.json({
    itemCount: cart.reduce((count, item) => count + item.quantity, 0),
    subtotal: Number(subtotal.toFixed(2)),
    shipping,
    tax,
    total
  });
});

app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  persistCart();
  res.json(cart);
});

app.post('/api/cart/update', (req, res) => {
  const { productId, quantity } = req.body;
  const item = cart.find(item => item.product.id === productId);

  if (!item) {
    return res.status(404).json({ error: 'Product not in cart.' });
  }

  if (quantity <= 0) {
    const index = cart.findIndex(item => item.product.id === productId);
    cart.splice(index, 1);
  } else {
    item.quantity = quantity;
  }

  persistCart();
  res.json(cart);
});

app.post('/api/cart/remove', (req, res) => {
  const { productId } = req.body;
  const index = cart.findIndex(item => item.product.id === productId);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not in cart.' });
  }

  cart.splice(index, 1);
  persistCart();
  res.json(cart);
});

app.post('/api/cart/clear', (req, res) => {
  cart = [];
  persistCart();
  res.json({ message: 'Cart cleared successfully', cart });
});

app.post('/api/parttime/add', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Both title and description are required.' });
  }

  const id = partTimeItems.length ? partTimeItems[partTimeItems.length - 1].id + 1 : 1;
  partTimeItems.push({ id, title, description, addedAt: new Date().toISOString() });
  persistPartTime();
  res.json(partTimeItems);
});

app.post('/api/parttime/remove', (req, res) => {
  const { id } = req.body;
  const index = partTimeItems.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Part-time item not found.' });
  }

  partTimeItems.splice(index, 1);
  persistPartTime();
  res.json(partTimeItems);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
