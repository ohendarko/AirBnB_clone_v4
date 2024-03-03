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
});