define( ['widgets/gameView'], 
function( GameView) {
    return Backbone.View.extend( {
        events: {
            'click #setupReady': 'render'
        },
        current_state: null,
        topic_num: 0,
        speaker_num: 0,
        initialize: function( options) {
            this.setupPageView = options.setupPageView;
            this.gameView = new GameView( {
                el: this.$el.selector,
                setupPageView: options.setupPageView,
                includeClockFn: function() {
                    return (this.setupPageView.getPlayMode() !== 'strict');
                }
            });
        },
        render: function( evt) {
            $.mobile.pageContainer.pagecontainer( "change", "#tabletopicspage", {
                transition: 'fade'
            });
            // render dependent components:
            this.gameView.render();
            if( "undefined" !== typeof evt)
                evt.preventDefault();
            return false;
        }
        
    });
});
