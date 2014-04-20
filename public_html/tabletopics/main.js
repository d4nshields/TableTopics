require.config( {
    paths: {
        'backbone'              : '../js/backbone.js/backbone',
        'underscore'            : '../js/underscore.js/underscore',
        'fastclick'             : '../js/fastclick'
    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define( ['require', 'playgame', 'topics'], function( requre, PlayGame, topics) {
    $.mobile.defaultPageTransition   = 'none';
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.buttonMarkup.hoverDelay = 0;
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    
    function DOMReady(f){
      if( (document.readyState === "complete") || (!/(?!.*?compatible|.*?webkit)^mozilla|opera/i.test(navigator.userAgent))) {
        window.setTimeout(f,0);
      }  else {
        document.addEventListener("DOMContentLoaded", f, false);
      }
    }
    if( document.readyState === "complete") {
        PlayGame.main();
    } else {
        DOMReady( PlayGame.main);
    }
});
