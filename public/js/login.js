const loginForm = document.querySelector('.auth-form');
const loginMessage = document.createElement('div');
loginMessage.className = 'login-message';

function getStoredUser() {
  const stored = localStorage.getItem('shopbayUser');
  return stored ? JSON.parse(stored) : null;
}

function showLoggedIn(user) {
  if (!loginForm) return;
  loginForm.style.display = 'none';
  loginMessage.innerHTML = `
    <p>You are already logged in as <strong>${user.email}</strong>.</p>
    <button class="btn" id="logout-btn">Logout</button>
  `;
  loginForm.parentElement.appendChild(loginMessage);

  const logoutBtn = document.getElementById('logout-btn');
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('shopbayUser');
    window.location.reload();
  });
}

function showLoginForm() {
  if (!loginForm) return;
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();

    if (!email || !password) {
      alert('Please enter an email and password to continue.');
      return;
    }

    const user = { email, password, loggedInAt: new Date().toISOString() };
    localStorage.setItem('shopbayUser', JSON.stringify(user));
    window.location.href = 'index.html';
  });
}

const existingUser = getStoredUser();
if (existingUser) {
  showLoggedIn(existingUser);
} else {
  showLoginForm();
}
