/****** Scheduler ******/

function Scheduler(tempo)
{
	var _handler;
	var _interval = (60/tempo) * 1000;
	var _scheduleBuffer = [];
	var _handlers = {};

	function _queue(theId)
	{
		console.log("queued ", theId);

		if(_scheduleBuffer.indexOf(theId) == -1)
			_scheduleBuffer.push(theId);
	}

	function _clearQueue()
	{
		_scheduleBuffer = [];
	}

	var _callback = function()
	{
		for(var i = 0; i < _scheduleBuffer.length; i++)
		{
			startSound(_scheduleBuffer[i]);
			console.log("Scheduler started sound: ", _scheduleBuffer[i]);
		}

		_clearQueue();
	}

	function _schedule()
	{
		_handler = setInterval(_callback, _interval);
	}

	function _deschedule(handlerIndex)
	{
		if(_handlers[handlerIndex] !== undefined) {
			delete _handlers[_handlerIndex];
		}
	}

	function _removeFromBuffer(id)
	{
		if(_scheduleBuffer[id] !== undefined)
		{
			debugger;
			delete _scheduleBuffer[id];
		}
	}

	return {
		queue : _queue,
		schedule : _schedule,
		deschedule: _deschedule,
		removeFromBuffer: _removeFromBuffer
	}
}
