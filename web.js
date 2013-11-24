var express = require('express'),
	app = express(),
	cons = require('consolidate'),
	MongoClient = require('mongodb').MongoClient,
	routes = require('./routes');

	var rootDir = __dirname

MongoClient.connect('mongodb://localhost:27017/BibleGeneology', function(err, db){
	"use strict";
	if(err) throw(err);
	app.engine('html', cons.swig);
	app.set('view engine', 'html');
	app.set('views', rootDir + '/views');

    app.use(express.bodyParser());

    routes(app, db);

    app.listen(3000);
    console.log('Express server listening on port 3000');

})
