var allEntries = getJson('./sample-data/data.json');

function getJson(url) {
  return JSON.parse($.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      global: false,
      async: false,
      success: function(data) {
          return data;
      }
  }).responseText);
}

const showLogBook = () => {
  const listGroup = document.getElementById('entriesList');
  listGroup.innerHTML = '';
  const entries = [...allEntries].sort((a, b) => new Date(b.isoTime) - new Date(a.isoTime));;

  entries.forEach((entry) => {
    const field = createEntry(entry);
    listGroup.appendChild(field);
  });
};

const createEntry = ({ id, title, body, isoTime, lat, lon }) => {
    const field = document.createElement('li');
    field.classList.add('list-group-item', 'mb-3', 'rounded');
    field.innerHTML = `
      <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Entry ${id}: ${title}</h5>
      <small class="text-muted">${isoTime}</small>
      </div>
      <p class="mb-1">${body}</p>
      <small class="text-muted">Coordinates: ${lat}, ${lon}</small>`;
    return field;
};

document.addEventListener('DOMContentLoaded', () => {
  showLogBook();

  const saveBtn = document.getElementById('saveEntry');

  saveBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const title = document.getElementById('entryTitle').value.trim();
    const body = document.getElementById('entryBody').value.trim();
    const lat = document.getElementById('entryLat').value.trim() || null;
    const lon = document.getElementById('entryLon').value.trim() || null;

    if (!title || !body) {
      alert("Title and Report are required.");
      return;
    }

    const isoTime = new Date().toISOString();
    const maxId = allEntries.reduce((max, entry) => Math.max(max, parseInt(entry.id || 0)), 0);
    const newId = maxId + 1;

    const newEntry = { id: newId, title, body, isoTime, lat, lon };
    allEntries.unshift(newEntry);
    showLogBook();

    document.getElementById('entryForm').reset();

    const modal = bootstrap.Modal.getInstance(document.getElementById('logModal'));
    modal.hide();
  });
});