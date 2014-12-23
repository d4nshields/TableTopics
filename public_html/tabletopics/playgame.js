define( ['fastclick', 'pages/mainPageView'], 
function( fastclick, MainPageView) {
    
    var viewport_height = $(window).height();
    var viewport_width = $(window).width();
    var current_state;
    var configs = {};
    function setState( state) {
            current_state = state;
            game_states[current_state].call( this);
    }
    function main() {
        fastclick.attach( document.body);
        $.mobile.pageContainer.pagecontainer( "change", "#splashpage");
        this.mainPageView = new MainPageView({
            el: 'body',
            configs: configs
        });
        var _this=this;
        window.setTimeout( function() {
            _this.mainPageView.render();
        }, 3500);
    }
    $('.tabletopic-timer-area').css ({
        '-webkit-transform': 'scale('+(0.5*$(window).width()/558)+')'
    });
    
    return {
        'main': main
    };
});
