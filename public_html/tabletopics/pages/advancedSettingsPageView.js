define( ['pages/topicsPageView', 'pages/participantsPageView'], 
function( TopicsPageView, ParticipantsPageView) {
    return Backbone.View.extend( {
        events: {
            'click #buttonAdvanced': 'render',
            'click #advancedgoback': 'back'
        },
        initialize: function( options) {
            console.log( "advancedView.initialize();");
            Backbone.View.prototype.initialize.call( this, options);
            this.setupPageView = options.setupPageView;
            this.topicsPageView = new TopicsPageView( options);
            this.participantsPageView = new ParticipantsPageView( options);
        },
        render: function(evt) {
            console.log( "advancedView.render();");
            $.mobile.pageContainer.pagecontainer( 'change', '#setupadvanced', {transition: 'slide'});
            if( "undefined" !== typeof evt)
                evt.preventDefault();
            return false;
        },
        back: function(evt) {
            $.mobile.pageContainer.pagecontainer( 'change', '#setuppage', {transition: 'slide', reverse: true});
            if( "undefined" !== typeof evt)
                evt.preventDefault();
            return false;
        }
    });
});
