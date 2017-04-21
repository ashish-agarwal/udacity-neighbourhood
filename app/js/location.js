
define(["knockout",
  "lodash", "utils",
  'async!http://maps.google.com/maps/api/js?sensor=false'

], function (ko, _, utils) {
  'use strict';

  //detecting if its mobile or desktop
  var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

  var Location = function (props, map) {
    this.title = props.title
    this.marker = new google.maps.Marker({
      position: props.location,
      map: map,
      animation: google.maps.Animation.DROP,
    });
    this.marker.addListener('click', this.showInfo.bind(this))
  }
  var infoWindow = new google.maps.InfoWindow();

  Location.prototype.showInfo = function () {
    this.bounce()
    infoWindow.setContent(utils.getInfoWindownContent(location, { aggregate_ratings: 4 }))
    infoWindow.open(map, this.marker);
    if (isMobile) {
      $("#wrapper").toggleClass("active");
    }
  }

  Location.prototype.bounce = function () {
    var self = this;
    this.marker.setAnimation(google.maps.Animation.BOUNCE)
    setTimeout(function () { self.marker.setAnimation(null) }, 700)
  }


  return Location;

});
