define( [], 
function( ) {
    return Backbone.View.extend( {
        events: {
            'click #buttonParticipants': 'render',
            'click #participantsgoback': 'back'
        },
        initialize: function( options) {
            console.log( "participantsPageView.initialize();");
            Backbone.View.prototype.initialize.call( this, options);
            //$( ":mobile-pagecontainer" ).pagecontainer( 'load', 'participantsPage.html')
        },
        render: function(evt) {
            console.log( "participantsPageView.render();");
            $( ":mobile-pagecontainer" ).pagecontainer( 'change', '#setupparticipants', {transition: 'slide'});
            if( "undefined" !== typeof evt)
                evt.preventDefault();
            return false;
        },
        back: function(evt) {
            $.mobile.pageContainer.pagecontainer( 'change', '#setupadvanced', {transition: 'slide', reverse: true});
            if( "undefined" !== typeof evt)
                evt.preventDefault();
            return false;
        }
    });
});
