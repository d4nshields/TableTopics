define( ['widgets/themeEditorView'], 
function( ThemeEditorView) {
    return Backbone.View.extend( {
        events: {
            'click #buttonTopicseditor': 'render',
            'click #topicsgoback': 'back'
        },
        initialize: function( options) {
            console.log( "topicsPageView.initialize();");
            Backbone.View.prototype.initialize.call( this, options);
            this.setupPageView = options.setupPageView;
            this.themeEditorView = new ThemeEditorView( {
                el: "#setuptopics .widget-themeEditor",
                configs: options.configs
            });
        },
        render: function(evt) {
            console.log( "advancedView.render();");
            var _this=this;
            _this.themeEditorView.render();
            $( ":mobile-pagecontainer" ).pagecontainer( 'change', '#setuptopics', {transition: 'slide'});
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
