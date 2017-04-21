require.config({ catchError: true });
require.config({
  // make bower_components more sensible
  // expose jquery
  paths: {
    "bower_components": "../bower_components",
    "jquery": "../bower_components/jquery/dist/jquery"
  },
  map: {
    "*": {
      "knockout": "../bower_components/knockout.js/knockout",
      "ko": "../bower_components/knockout.js/knockout",
      "text": 'bower_components/requirejs-plugins/lib/text.js',
      "async": 'bower_components/requirejs-plugins/src/async.js',
      "json": 'bower_components/requirejs-plugins/src/json',
      "lodash": "../bower_components/lodash/dist/lodash.min.js",
      "utils": "js/utils",
      "Location": "js/location",
      "flickr": "js/services/flickr",
      "zomato": "js/services/zomato",
      "bootstrap": "../bower_components/bootstrap/dist/js/bootstrap.min.js"
    }
  }
});

// Use the debug version of knockout it development only
// When compiling with grunt require js will only look at the first
// require.config({}) found in this file
require.config({
  map: {
    "*": {
      "knockout": "../bower_components/knockout.js/knockout-2.3.0.debug",
      "ko": "../bower_components/knockout.js/knockout-2.3.0.debug"
    }
  }
});

if (!window.requireTestMode) {
  require(['main'], function () { });
}

