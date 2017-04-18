define(["knockout",
  "lodash",
  "jquery"
], function (ko, _, $) {
  'use strict';

  return {
    get: function (location) {
      return new Promise(function (resolve, reject) {
        var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&radius=5&radius_units=km&api_key=7ede1469cfab29f1cf9c03fc77ef1e11&lat=" + location.location.lat + "&lon=" + location.location.lng + "&per_page=1&format=json&nojsoncallback=1&api_key=78f6e5df7f95b2113503c6546f88ccfe";
        $.ajax({
          url: url,
          type: "GET",
          headers: {
            "Accept": "application/json"
          },
          success: function (res) {
            resolve(res)
          },
          error: function (err, s) {
            reject(err)
          }
        })
      })
    }
  }
});
