// to depend on a bower installed component:
// define(['component/componentName/file'])

define(["jquery", "knockout", 'lodash', 'utils', 'mapUtils', 'json!locations.json', 'zomato', 'flickr', 'async!http://maps.google.com/maps/api/js?sensor=false'], function ($, ko, _, utils, mapUtils, data, zomato, flickr) {

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
  self.locations = data.locations;

  var markers = [];
  this.filteredItems = this.locations;

  this.markerOver = function (index) {
    var marker = utils.getMarker(markers, index());
    mapUtils.toggleBounce(marker, map);
  }

  this.markerClicked = function (index) {
    var marker = utils.getMarker(markers, index());
    map.panTo(marker.getPosition());

    zomato.get(self.locations[index()])
      .then(function (s) {
        mapUtils.populateInfoWindow(marker, map, self.locations[index()], s.restaurants[0].restaurant.user_rating)
        return flickr.get(self.locations[index()])
      }).then(function (d) {
        var fPhoto = d.photos.photo[0];
        var imgUrl = 'https://farm' + fPhoto.farm + '.staticflickr.com/' + fPhoto.server + '/' + fPhoto.id + '_' + fPhoto.secret + '_' + 'q' + '.jpg';
        $('#plImage').attr('src',imgUrl)
      }).catch(function (err) {
        mapUtils.populateInfoWindow(marker, map, self.locations[index()], { aggregate_rating: "N/A" })
      })
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

  /*Menu-toggle*/
  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
  });

  ko.applyBindings(this, $('html')[0]);
});


