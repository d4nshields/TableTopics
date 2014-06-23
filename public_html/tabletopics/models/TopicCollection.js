define( ['models/TopicModel'], function( TopicModel) {
    var topicCollectionInstance;           // module scoped singleton
    
    var TopicCollection = Backbone.Collection.extend( {
        model: TopicModel,
        store: TopicModel.prototype.store,
        comparator: 'order'
    });
    TopicCollection.prototype.getThemeCollectionInstance = function() {
        if( "undefined" === typeof topicCollectionInstance)
            topicCollectionInstance = new TopicCollection();
        return topicCollectionInstance;
    };
    return TopicCollection;
});
