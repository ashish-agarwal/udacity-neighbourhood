define(["knockout",
  "lodash",
  "jquery"
], function (ko, _, $) {
  'use strict';

  return {
    get: function (location) {
      return new Promise(function (resolve, reject) {
        var url = "https://developers.zomato.com/api/v2.1/search?q=" + location.title + "&lat=" + location.location.lat + "&lon=" + location.location.lng
        $.ajax({
          url: url,
          type: "POST",
          headers: {
            "Accept": "application/json",
            "user-key": "6ad7ad8f0e2f6fd4361cf706048ed686"
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
