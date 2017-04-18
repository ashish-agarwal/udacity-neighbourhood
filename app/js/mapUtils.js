define(["knockout",
  "lodash",
  "utils",
  'zomato',
  'async!http://maps.google.com/maps/api/js?sensor=false'
], function (ko, _, utils, zomato) {
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
      var self = this;
      // Create an onclick event to open the large infowindow at each marker.
      marker.addListener('click', function () {
        zomato.get(location)
          .then(function (s) {
            self.populateInfoWindow(marker, map, location, s.restaurants[0].restaurant.user_rating)
          }).catch(function (err) {
            self.populateInfoWindow(marker, map, location, { aggregate_rating: "N/A" })
          })
      });
      // Two event listeners - one for mouseover, one for mouseout,
      // to change the colors back and forth.
      marker.addListener('mouseover', function () {
        self.toggleBounce(this, map);
      });
      marker.addListener('mouseout', function () {
        self.toggleBounce(this, map);
      });
      markers.push(marker)
    },
    toggleBounce: function (marker, map) {

      if ((!map.getBounds().contains(marker.getPosition()))) {
        map.panTo(marker.getPosition());
      }
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    },
    populateInfoWindow: function (marker, map, location, ratings) {
      infoWindow.setContent(utils.getInfoWindownContent(location, ratings));
      infoWindow.open(map, marker);
    }
  }
});
