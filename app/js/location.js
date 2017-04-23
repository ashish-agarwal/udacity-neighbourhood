
define(["knockout",
  "lodash", "utils",
  'zomato', 'flickr',
  'async!http://maps.google.com/maps/api/js?sensor=false'
], function (ko, _, utils, zomato, flickr) {
  'use strict';

  //detecting if its mobile or desktop
  var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

  var Location = function (props, map) {
    this.title = props.title
    this.location = props.location;
    this.marker = new google.maps.Marker({
      position: props.location,
      map: window.map,
      animation: google.maps.Animation.DROP,
    });
    this.marker.addListener('click', this.showInfo.bind(this))
  }
  var infoWindow = new google.maps.InfoWindow();

  Location.prototype.showInfo = function () {
    this.bounce()
    var self = this;
    window.map.panTo(self.marker.getPosition());

    zomato.get(this)
      .then(function (s) {
        infoWindow.setContent(utils.getInfoWindownContent(self, s.restaurants[0].restaurant.user_rating))
        infoWindow.open(map, self.marker);
        return flickr.get(self)
      }).then(function (d) {
        var fPhoto = d.photos.photo[0];
        var imgUrl = 'https://farm' + fPhoto.farm + '.staticflickr.com/' + fPhoto.server + '/' + fPhoto.id + '_' + fPhoto.secret + '_' + 'q' + '.jpg';
        $('#plImage').attr('src', imgUrl)
      }).catch(function (err) {
        console.log(err);

        infoWindow.setContent(utils.getInfoWindownContent(location, { aggregate_rating: "Error occured", rating_color: 'ff0000' }))
        infoWindow.open(map, self.marker);
      })

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
