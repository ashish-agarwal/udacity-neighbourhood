// to depend on a bower installed component:
// define(['component/componentName/file'])

define(["jquery", "knockout", 'lodash', 'utils', 'json!locations.json', 'zomato', 'flickr', 'Location', 'async!http://maps.google.com/maps/api/js?sensor=false'], function ($, ko, _, utils, data, zomato, flickr, Location) {

  var self = this;
  self.query = ko.observable("");

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      "lat": 17.446713,
      "lng": 78.387263
    },
    zoom: 14
  });

  //loading the locations from json file
  var locations = data.locations;

  this.locations = ko.observableArray([]);

  locations.forEach(function (location) {
    var loc = new Location(location, map);
    this.locations.push(loc); // adds it to the observable array
  })


  self.filteredItems = ko.computed(function (item) {
    var filter = self.query().toLowerCase();
    if (!filter) {
      _.each(self.locations(), function (location) {
        location.marker.setVisible(true)
      })
      return self.locations();
    } else {
      return _.filter(self.locations(), function (location, i) {
        var visible = location.title.toLowerCase().indexOf(filter) !== -1;
        location.marker.setVisible(visible); // set marker visibility
        return visible; // filter functions expect a boolean
      });
    }
  });

  /*Menu-toggle*/
  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
  });


  ko.applyBindings(this, $('html')[0]);
});


