var ModuleManager = (function()
{
	var _modules = {};

	var _addModuleWithKeyAndIndex = function(index, placedModuleObject)
	{
		_modules[placedModuleObject.id] = {
			paper: placedModuleObject,
			file_id : index
		}
	}

	return {
		addModuleWithKeyAndIndex : _addModuleWithKeyAndIndex
	}
})();