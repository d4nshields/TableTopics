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
        window.setTimeout( function() {
            this.mainPageView.render();
        }, 500);
    }
    $('.tabletopic-timer-area').css ({
        '-webkit-transform': 'scale('+(0.5*$(window).width()/558)+')'
    });
    
    return {
        'main': main
    };
});
