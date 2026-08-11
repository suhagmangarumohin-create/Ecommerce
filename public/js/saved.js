const savedList = document.getElementById('saved-list');

async function loadSavedItems() {
  const items = await fetchJSON('/api/parttime');
  if (!items.length) {
    savedList.innerHTML = '<p>No saved items yet.</p>';
    return;
  }

  savedList.innerHTML = '';
  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'parttime-row';
    row.innerHTML = `
      <div class="parttime-details">
        <strong>${item.title}</strong>
        <p>${item.description}</p>
        <small>Saved at ${new Date(item.addedAt).toLocaleString()}</small>
      </div>
      <button class="small-btn remove-btn" onclick="removeSavedItem(${item.id})">Delete</button>
    `;
    savedList.appendChild(row);
  });
}

window.removeSavedItem = async function(id) {
  await fetchJSON('/api/parttime/remove', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  loadSavedItems();
};

loadSavedItems();
