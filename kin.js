function KinDAO( db ){
	"use strict";

	if( (this instanceof KinDAO) === false ){
		console.log("Warning, KinDAO needs to be called with \"new\" operator ");
		return new KinDAO( db );
	}

	var kin = db.collection("kin");
	var self = this;
	this.addKin = function( person, callback ){
		this.getLastInsert( function( doc ){

			console.log('retrieved last doc');
			var _id = parseInt( doc._id );
			person._id = _id + 1;

			console.log('using _id: ' + person._id);
			kin.insert(person, function( err, result ){
				"use strict";

				if( err ) return callback( err, null );

				console.log("New kin added");

				self.getLastInsert(function( doc ){
					console.log("returning inserted doc");
					return callback( null, doc );
				})
			})
		})
	}
	this.getAllKin = function( callback ){
		console.log('kinDAO retrieving all kin');
		kin.find().toArray(function( err, collection ){
			"use strict";
			console.log(collection);
			if( err ) return callback(err, null);

			//var googleFormats = self.formatGoogleChart( collection );

			return callback( null, collection );
		})
	}
	this.getLastInsert = function ( callback ){
		kin.find({}).sort({"_id": -1}).limit(1).toArray(function( err, doc ){
			"use strict";
			callback( doc[0] );
		})
	}
	this.formatGoogleChart = function ( docs ){
		var googleFormats = [];
		for(var i = 0; i < docs.length; i++){
			var doc = docs[i];
			var newFormat = [];
			var parentId = (doc.parent !== null ? doc.parent + '' : null );
			newFormat.push({
				v: doc._id + '',
				f: doc.name + ''
			});
			newFormat.push(parentId);

			googleFormats.push(newFormat);
		}
		return googleFormats;
	}
}
module.exports.KinDAO = KinDAO;