document.addEventListener('DOMContentLoaded', function () {
  // Fetch the initial data
  updatePlaces();

  // Add event listener to the Search button
  document.getElementById('apply_filters').addEventListener('click', function () {
    updatePlaces();
  });
});

function updatePlaces() {
  // Gather filters data
  var states = getCheckedItems('locations');
  var amenities = getCheckedItems('amenities');

  // Fetch places based on filters
  fetchPlaces(states, amenities);
}

function getCheckedItems(className) {
  var items = [];
  var checkboxes = document.querySelectorAll('.' + className + ' input[type="checkbox"]:checked');
  checkboxes.forEach(function (checkbox) {
    items.push({
      id: checkbox.getAttribute('data-id'),
      name: checkbox.getAttribute('data-name'),
    });
  });
  return items;
}

function fetchPlaces(states, amenities) {
  // Construct the API endpoint with selected filters
  var endpoint = '/api/v1/places_search';
  var data = JSON.stringify({
    states: states,
    amenities: amenities,
  });

  // Make a POST request to fetch places
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (places) {
      // Update the DOM with the fetched places
      displayPlaces(places);
    })
    .catch(function (error) {
      console.error('Error fetching places:', error);
    });
}

function displayPlaces(places) {
  // Get the places container
  var placesContainer = document.querySelector('.places');

  // Clear existing places
  placesContainer.innerHTML = '';

  // Display each place in the container
  places.forEach(function (place) {
    var placeElement = createPlaceElement(place);
    placesContainer.appendChild(placeElement);
  });
}

function createPlaceElement(place) {
  // Create an article element for the place
  var article = document.createElement('article');

  // Set up the content of the article (customize as needed)
  article.innerHTML = `
    <div class="title_box">
      <h2>${place.name}</h2>
      <div class="price_by_night">$${place.price_by_night}</div>
    </div>
    <div class="information">
      <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
      <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
    </div>
    <div class="user">
      <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
    </div>
    <div class="description">
      ${place.description}
    </div>
  `;

  return article;
}

