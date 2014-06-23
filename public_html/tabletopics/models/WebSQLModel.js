define( [], function( ) {
    return Backbone.Model.extend({
        db: openDatabase('tt4s-topics', '', 'TableTopics Topics DB', 1024*1024)
    });
});
