require.config( {
    paths: {
        'fastclick'             : '../js/fastclick'
    }
});

define( ['playgame'], function( PlayGame) {
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
    DOMReady( PlayGame.main);
});
