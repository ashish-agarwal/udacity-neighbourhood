define(["knockout",
  "lodash",
  "utils",
  'async!http://maps.google.com/maps/api/js?sensor=false'
], function (ko, _, utils) {
  'use strict';
  var largeInfowindow = new google.maps.InfoWindow();

  return {
    addMarker: function (key, location, map, markers) {
      // Add the marker at the clicked location, and add the next-available label
      // from the array of alphabetical characters.
      var marker = new google.maps.Marker({
        position: location.location,
        map: map,
        animation: google.maps.Animation.DROP,
        id: key
      });
      markers.push(marker)
    },
    toggleBounce: function (marker, map, context) {

      if ((!map.getBounds().contains(marker.getPosition()))) {
        map.panTo(marker.getPosition());
      }
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
        largeInfowindow.close();
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        return this.populateInfoWindow(marker, map, largeInfowindow);
      }
    },
    populateInfoWindow: function (context, map, infoWindow) {
      infoWindow.setContent(utils.getInfoWindownContent());
      infoWindow.open(map, context);
    }
  }
});
