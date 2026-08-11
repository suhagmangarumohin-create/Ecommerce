window.getStoredUser = function() {
  const stored = localStorage.getItem('shopbayUser');
  return stored ? JSON.parse(stored) : null;
};

window.logoutUser = function() {
  localStorage.removeItem('shopbayUser');
  window.location.reload();
};

function renderHeaderUser() {
  const user = window.getStoredUser();
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  let profile = topbar.querySelector('.user-profile');
  if (!profile) {
    profile = document.createElement('div');
    profile.className = 'user-profile';
    topbar.appendChild(profile);
  }

  if (user) {
    profile.innerHTML = `
      <span>Hello, <strong>${user.email}</strong></span>
      <button class="btn secondary-btn logout-btn" type="button">Logout</button>
    `;
    const logoutBtn = profile.querySelector('.logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', window.logoutUser);
    }
  } else {
    profile.innerHTML = `<a href="login.html" class="btn secondary-btn">Login</a>`;
  }
}

document.addEventListener('DOMContentLoaded', renderHeaderUser);
