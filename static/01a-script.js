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

const renderLogBook = () => {
  const listGroup = document.getElementById('entriesList');
  listGroup.innerHTML = '';
  const entries = [...allEntries].reverse();

  entries.forEach((entry, i) => {
    const field = createEntry(entry, i + 1);
    listGroup.appendChild(field);
  });
};

const createEntry = ({ title, body, isoTime, lat, lon }, i) => {
    const field = document.createElement('li');
    field.classList.add('list-group-item', 'mb-3', 'rounded');
    field.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">Entry ${i}: ${title}</h5>
        <small class="text-muted">${isoTime}</small>
        </div>
        <p class="mb-1">${body}</p>
        <small class="text-muted">Coordinates: ${lat}, ${lon}</small>`;
    return field;
};
document.addEventListener('DOMContentLoaded', () => {
  renderLogBook();

  const saveBtn = document.getElementById('saveEntry');

  saveBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const title = document.getElementById('entryTitle').value.trim();
    const body = document.getElementById('entryBody').value.trim();
    const lat = document.getElementById('entryLat').value.trim();
    const lon = document.getElementById('entryLon').value.trim();

    if (!title || !body) {
      alert("Title and Report are required.");
      return;
    }

    const isoTime = new Date().toISOString();
    const newEntry = { title, body, isoTime, lat, lon };
    allEntries.push(newEntry);
    renderLogBook();

    document.getElementById('entryForm').reset();

    const modal = bootstrap.Modal.getInstance(document.getElementById('logModal'));
    modal.hide();
  });
});
