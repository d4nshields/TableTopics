define( ['models/ThemeModel', 'models/TopicCollection'], function( ThemeModel, TopicCollection) {
    var themeCollectionInstance;        // module singleton
    
    var ThemeCollection = Backbone.Collection.extend( {
        'model': ThemeModel,
        'store': ThemeModel.prototype.store,
        'comparator': 'themename'
    });
    ThemeCollection.prototype.getThemeCollectionInstance = function() {
        if( "undefined" === typeof themeCollectionInstance)
            themeCollectionInstance = new ThemeCollection();
        return themeCollectionInstance;
    };
    return ThemeCollection;
});
