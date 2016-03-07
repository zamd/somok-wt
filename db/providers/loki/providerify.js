
function Provider (collection){

	function trim(doc){
		delete doc.meta;
		delete doc.$loki
		return doc;
	}

	function findOne(filter,cb){
		var doc = collection.findOne(filter);
		cb(null, trim(doc));
	}

	function insert(doc, cb){
		var inserted = collection.insert(doc);
		cb(null, trim(inserted));
	}

	function update(doc, cb){
		var updated = collection.update(doc);
		cb(null, trim(updated));
	}

	function _get(id, cb){
		var doc = collection.get(id);

		cb(null, trim(doc));
	}

	function _import(docs, cb){
		var importCount=0;
		docs.forEach(function(doc){
			var imported = collection.insert(doc);
			if (imported)
				importCount++;
		});
		return cb(null,importCount);
	}

	function count(cb){
		var total = collection.count();
		cb(total)
	}

	return { findOne, insert, update, count, get: _get, import: _import};
}


module.exports = Provider;