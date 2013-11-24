var ContentHandler = require('./content');

console.log('We have reached routes');

module.exports = exports = function(app, db){
	var contentHandler = new ContentHandler(db);
	app.get('/', contentHandler.displayMain);

	app.post('/addKin', contentHandler.addKin);

}