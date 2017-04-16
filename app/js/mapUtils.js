define(["knockout",
  "lodash",
  "utils",
  'async!http://maps.google.com/maps/api/js?sensor=false'
], function (ko, _, utils) {
  'use strict';
  var infoWindow = new google.maps.InfoWindow();

  return {
    addMarker: function (key, location, map, markers) {
      var marker = new google.maps.Marker({
        position: location.location,
        map: map,
        animation: google.maps.Animation.DROP,
        id: key
      });
      markers.push(marker)
    },
    toggleBounce: function (marker, map) {

      if ((!map.getBounds().contains(marker.getPosition()))) {
        map.panTo(marker.getPosition());
      }
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
        // largeInfowindow.close();
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    },
    populateInfoWindow: function (marker, map) {
      infoWindow.setContent(utils.getInfoWindownContent());
      infoWindow.open(map, marker);
    }
  }
});
