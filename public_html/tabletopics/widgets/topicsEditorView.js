define( [], 
function( ) {
    return Backbone.View.extend( {
        events: {
//            'change #edit-topic-theme': 'setSelectedTheme',
//            'change .tt-themename-editable': 'saveSelectedTheme',
        },
        initialize: function( options) {
            console.log( "topicsEditorView.initialize();");
            Backbone.View.prototype.initialize.call( this, options);
            this.setupPageView = options.setupPageView;
        },
        render: function( evt) {
            console.log( "topicsEditorView.render();");
            
        }
    });
});
