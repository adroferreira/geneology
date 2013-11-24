var KinDAO = require('../kin').KinDAO,
	sanitize = require('validator').sanitize;

function ContentHandler( db ){
	"use strict";
	var kin = new KinDAO(db);
	console.log('content handler initialized');
	this.displayMain = function( req, res, next ){
		console.log('main page displaying');
		"use strict";
		kin.getAllKin(function(err, results){
			"use strict";
			console.log("returning all kin");
			if(err){ console.log('there was an error while retrieving kin'); return next(err); }

			var kinGoogleObject = JSON.stringify( kin.formatGoogleChart(results) );
			console.log(kinGoogleObject);


			var kinObject = JSON.stringify(results);
			console.log(kinObject);

			return res.render('geneology_chart',{
				kinGoogle: kinGoogleObject,
				kin: kinObject
			});
		})
	}
	this.addKin = function( req, res, next){
		console.log('addKin commencing');
		"use strict";
		kin.addKin(req.body, function( err, results ){
			if(err){ console.log('there was an error while adding kin'); return next(err); }

			console.log('Kin has been added');

			res.send(results);

		});
	}
}
module.exports = ContentHandler;