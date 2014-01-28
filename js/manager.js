function Manager()
{
	var currentId = 0;
	var objects = [];

	var _newId = function () {
		return currentId++;
	}

	var _register = function (object) {
		var id = _newId();
		objects[id] = object;
		return id;
	}

	var _unregister = function (id) {
		objects = objects.slice(id, 1);
	}

	var createEntity = function (src, cx, cy) {
		var audio = new Audio('src');
		var dancer = new Dancer();
		var icon = placeWaveSymbol(cx, cy);

		dancer.load(audio);

		var id = _register({
			dancer: dancer,
			icon: icon
		});

		return id;
	}

	var removeEntity = function(id) {
		
		_unregister(id);
	}

	return {
		createEntity: createEntity,
		removeEntity: removeEntity
	}
}

