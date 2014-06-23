define( ['models/ParticipantModel'], function( ParticipantModel) {
    return Backbone.Collection.extend( {
        'model': ParticipantModel,
        'store': ParticipantModel.prototype.store
    });
});
