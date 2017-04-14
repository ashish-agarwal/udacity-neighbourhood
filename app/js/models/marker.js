define(["knockout",
], function (ko) {
  'use strict';

  var Marker = function (params) {
    // var self = this;
    // self.position = ko.observable(params.position);
    // self.map = params.map;
    // self.title = ko.observable(params.title);
    this.marker = google.maps.Marker(params);
  }
  return Marker;
  // return new google.maps.Marker(Marker);

});
