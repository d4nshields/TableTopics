define( ['pages/advancedSettingsPageView', 'pages/gamePageView', 'widgets/mainSettingsView'], 
function( AdvancedSettingsPageView, GamePageView, MainSettingsView) {
    
    return Backbone.View.extend( {
        initialize: function( options) {
            console.log( "mainPageView.initialize();");
            Backbone.View.prototype.initialize.call( this, options);
            //
            this.advancedView = new AdvancedSettingsPageView( options);
            this.mainSettingsView = new MainSettingsView( options);
            this.gameView = new GamePageView( options);
        },
        render: function() {
            console.log( "mainPageView.render();");
            $.mobile.pageContainer.pagecontainer( "change", "#setuppage", {
                transition: 'fade'
            });
        }
    });
});
