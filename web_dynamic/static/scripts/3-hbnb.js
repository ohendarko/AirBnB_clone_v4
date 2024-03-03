$(document).ready(function () {
  var amenityIDs = [];

  $('input[type="checkbox"]').change(function () {
    var amenityID = $(this).data('name');

    if ($(this).is(':checked')) {
      if (amenityIDs.indexOf(amenityID) === -1) {
        amenityIDs.push(amenityID);
      }
    } else {
      var index = amenityIDs.indexOf(amenityID);
      if (index !== -1) {
        amenityIDs.splice(index, 1);
      }
    }

    var amenitiesText = amenityIDs.join(', ');
    $('.amenities > h4').text(amenitiesText);
  });

  function updateStatus() {
    $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
      if (data.status === "OK") {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  updateStatus();

  function getPlaces() {
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (response) {
        $('places').empty();
        response.forEach(function (place) {
          var descwitowner = place.description ? place.description.replace(/Owner:.*?\n/g, '') : '';
          var article = '<article>' +
            '<div class="title_box">' +
            '<h2>' + place.name + '</h2>' +
            '<div class="price_by_night">$' + place.price_by_night + '</div>' +
            '</div>' +
            '<div class="information">' +
            '<div class="max_guest">' + place.max_guest + ' Guest(s)</div>' +
            '<div class="number_rooms">' + place.number_rooms + ' Bedroom(s)</div>' +
            '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom(s)</div>' +
            '</div>' +
            '<div class="description">' +
            '<p>' + descwitowner + '</p>' +
            '</div>' +
            '</article>';
          $('.places').append(article);
        });
      },
      error: function (xhr, status, error) {
        console.error('Error:', error);
      }
    });
  }

  getPlaces();

});