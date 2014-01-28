var sound = function () {
	
	var actx;

	var currentId = 0;

	var sounds = [];
	var buffers = [];

	// Initialize audio in browser
	window.addEventListener('load', init, false);
	function init()
	{
		try
		{
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			var actx = new AudioContext();
		}
		catch(e)
		{
			console.log("Web Audio API not supported.");
		}
	}
	
	function startBufferingSound(id)
	{
		if(!hasStartedBuffering(id))
		{

		}
	}
	
	function hasStartedBuffering(id)
	{
		return buffers[id] !== undefined;
	}

	function create(source)
	{

	}

	return {
		play : play
	}
}