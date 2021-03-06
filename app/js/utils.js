define(["knockout",
  "lodash"
], function (ko, _) {
  'use strict';

  return {
    getMarker: function (pointers, index) {
      return _.find(pointers, function (pointer) { return pointer.get("id") === index })
    },
    getInfoWindownContent: function (location, rating) {
      return '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h4   id="firstHeading" class="firstHeading">' + location.title + '</h4>' +
        '<div id="bodyContent">' +
        '<img id="plImage" />'+
        '<p style="color:#' + rating.rating_color + '">Rating : ' + rating.aggregate_rating + '</p>' +
        '</div>' +
        '<div class="footer" style="text-align:right">' +
        '<a href="http://www.zomato.com" >Powered by zomato</a>&<a href="http://www.flickr.com">Flickr</a>' +
        '</div>' +
        '</div>';
    },
    getInfoWindownContent1: function (location, ratings) {
      return '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        '(last visited June 22, 2009).</p>' +
        '</div>' +
        '</div>';
    }
  }
});
