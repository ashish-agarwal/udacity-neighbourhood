// to depend on a bower installed component:
// define(['component/componentName/file'])

define(["jquery", "knockout", "marker", 'lodash', 'utils', 'async!http://maps.google.com/maps/api/js?sensor=false',], function ($, ko, Marker, _, utils) {
  var viewModel = {
    status: ko.observable('active')
  };
  var self = this;

  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.7413549, lng: -73.9980244 },
    zoom: 13
  });



  // These are the real estate listings that will be shown to the user.
  // Normally we'd have these in a database instead.
  var locations = [
    { title: 'Park Ave Penthouse', location: { lat: 40.7713024, lng: -73.9632393 } },
    { title: 'Chelsea Loft', location: { lat: 40.7444883, lng: -73.9949465 } },
    { title: 'Union Square Open Floor Plan', location: { lat: 40.7347062, lng: -73.9895759 } },
    { title: 'East Village Hip Studio', location: { lat: 40.7281777, lng: -73.984377 } },
    { title: 'TriBeCa Artsy Bachelor Pad', location: { lat: 40.7195264, lng: -74.0089934 } },
    { title: 'Chinatown Homey Space', location: { lat: 40.7180628, lng: -73.9961237 } }
  ];

  _.each(locations, function (location, index) {
    addMarker(index, location, map)
  });
  var largeInfowindow = new google.maps.InfoWindow();

  ko.applyBindings(viewModel, $('html')[0]);


  function addMarker(key, location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: location.location,
      map: map,
      animation: google.maps.Animation.DROP,
      id: key
    });

    marker.addListener('click', toggleBounce);
  }

  function toggleBounce() {
    if (this.getAnimation() !== null) {
      this.setAnimation(null);
    } else {
      populateInfoWindow(this, largeInfowindow);
      this.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  function populateInfoWindow(context, infoWindow) {
    infoWindow.setContent(utils.getInfoWindownContent());
    infoWindow.open(map, context)
  }
});
