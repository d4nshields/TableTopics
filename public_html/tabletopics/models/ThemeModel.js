define( ['models/WebSQLModel'], function( WebSQLModel) {
    return WebSQLModel.extend( {
        'store': new WebSQLStore( WebSQLModel.prototype.db, 'themes'),
        defaults: {
                themename: "New Theme"
        }
    });
});
