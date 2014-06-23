define( ['models/WebSQLModel'], function( WebSQLModel) {
    return WebSQLModel.extend( {
        'store': new WebSQLStore( WebSQLModel.prototype.db, 'participants'),
        defaults:  {
                name: ""
        }
    });
});
