// Haetaan JSON
var url = getJson('data.json');

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

// Tehdään entry-kentät
var allEntries = url;
const createEntry = ({ title, body, isoTime, lat, lon }, i) => {
    const field = document.createElement('li');
    field.classList.add('list-group-item', 'flex-column', 'align-items-start');
    field.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">Entry ${i}: ${title}</h5>
        <small>${isoTime}</small>
        </div>
        <p class="mb-1">${body}</p>
        <small>Coordinates: ${lat}, ${lon}</small>`;
    return field;
}

// Luodaan logbook
const createLogBook = () => {
    const listGroup =  document.getElementById('entriesList');
    const logbook = allEntries;
    const entries = Object.values(logbook);

    entries.forEach((entry, i) => {
        const field = createEntry(entry, i + 1);
        listGroup.appendChild(field);
    });
}

// Ikkunan uudelleen lataus
function refresh() {
  window.location.reload();
}

// Ikkunan lataus
window.onload = () => {
  createLogBook();
};