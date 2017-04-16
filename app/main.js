// to depend on a bower installed component:
// define(['component/componentName/file'])

define(["jquery", "knockout", "marker", 'lodash', 'utils', 'mapUtils', 'json!locations.json', 'async!http://maps.google.com/maps/api/js?sensor=false'], function ($, ko, Marker, _, utils, mapUtils, data) {

  var self = this;
  self.query = ko.observable("");

  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.7413549, lng: -73.9980244 },
    zoom: 12
  });

  //loading the locations from json file
  self.locations = data.locations;

  var markers = [];
  this.filteredItems = this.locations;

  this.markerOver = function (index) {
    var marker = utils.getMarker(markers, index());
    mapUtils.toggleBounce(marker, map);
  }

  this.markerClicked = function (index) {
    var marker = utils.getMarker(markers, index());
    mapUtils.populateInfoWindow(marker, map)
  }

  //populating all the markers on the map
  _.each(locations, function (location, index) {
    location.visibility = ko.observable(true);
    mapUtils.addMarker(index, location, map, markers)
  });


  self.filteredItems = ko.computed(function (a) {
    var filter = self.query().toLowerCase();

    if (!filter) {
      //if there is empty string in search, showing all the markers
      _.each(markers, function (pointer, key) { self.locations[key].visibility(true); return pointer.setVisible(true); })
      return self.locations;

    } else {
      var i = 0;
      return ko.utils.arrayFilter(self.locations, function (item) {
        i++;
        if (ko.utils.stringStartsWith(item.title.toLowerCase(), filter)) {
          //if title starts with the search terms
          markers[i - 1].setVisible(true);
          item.visibility(true);
        } else {
          markers[i - 1].setVisible(false);
          item.visibility(false);
        }
        return true;
      });
    }
  }, self)


  ko.applyBindings(this, $('html')[0]);
});
