require.config( {
    paths: {
        'jquery'                : '../js/jquery-1.11.0.min',
        'jqueryMobile'          : '../js/jquery-mobile/jquery.mobile.custom.min',
        'backbone'              : '../js/backbone.js/backbone',
        'underscore'            : '../js/underscore.js/underscore'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jqueryMobile': ['jquery']
    }
});

define( ['require', 'playgame'], function( requre, PlayGame) {
    function DOMReady(f){
      if (/(?!.*?compatible|.*?webkit)^mozilla|opera/i.test(navigator.userAgent)){ // Feeling dirty yet?
        document.addEventListener("DOMContentLoaded", f, false);
      }  else {
        window.setTimeout(f,0);
      }
    }
    if( document.readyState === "complete") {
        PlayGame.main();
    } else {
        DOMReady( PlayGame.main);
    }
});
