var sounds = [];
var html = "";
var dragSrcEl = null;
var canvas = document.getElementById("scope");
var full_path = ''
var sounds_path = full_path + 'sounds';
var sampleRate = 44100;
var pushedElement = null;
var g_attenuation = 5;

for (var i = 0; i < files.length; ++i)
{
	// Construct filename
	files[i]["full_path"] = sounds_path
	+ "/"
	+ files[i]["speed"]
	+ "BPM/"
	+ files[i]["name"];
}

// Modules available to play
var modules = {};

// Modules currently playing
var objects = {};

// Global vars
var windowPadding = 0;

var DEBUG = false;

var cw = document.body.clientWidth;
var ch = document.body.clientHeight;
var _cw = cw;
var _ch = ch;

window.onresize = function () {
	cw = document.body.clientWidth - (2 * windowPadding);
	ch = document.body.clientHeight - (2 * windowPadding);
	_cw = cw;
	_ch = ch;
	$(canvas).attr('width', _cw);
	$(canvas).attr('height', _ch);
	positionModules();

	clearGrid();
	calculatePerspectiveGridEndpoints();
	drawPerspectiveGrid();
	calculateHorizontalGridEndpoints()
	drawHorizontalLines();
};

$(canvas).attr('width', _cw);
$(canvas).attr('height', _ch);

var ctx = canvas.getContext("2d");
var a_ctx;

// Initialize WebKit Audio
function init()
{
	try
	{
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        a_ctx = new AudioContext();
	}
    catch(e)
    {
        alert('Web Audio API is not supported in your browser');
    }
}

init();

// Setup Paper.js
paper.setup(canvas);

// Positional data for ordering modules

// Load modules from JSON and draw the modules

function positionModules()
{
	var module_pos = {};
	
	module_pos.cx = moduleRadius + 10;
	module_pos.cy = moduleRadius + 10;

	for(var i in modules)
	{
		modules[i].paper.position.x = module_pos.cx;
		modules[i].paper.position.y = module_pos.cy;
		module_pos.cx += moduleRadius * 2 + 10;

		if(module_pos.cx >= cw - 50)
		{
			module_pos.cx = moduleRadius + 10;
			module_pos.cy += moduleRadius * 2 + 10;
		}
	}
}

var waveCircleLayer;

function setupInitialLayout()
{
	for(var i = 0; i < files.length; ++i)
	{	
		var moduleColor = Settings.colorsForIndex(i)[0];
		var secondModuleColor = Settings.colorsForIndex(i)[1];
		var placed = placeModuleSymbol(createModuleSymbol(moduleColor, secondModuleColor), 0, 0);
		
		ModuleManager.addModuleWithKeyAndIndex(i, placed);

		modules[placed.id] = {
			paper: placed,
			file_id: i
		};
	} 

	positionModules();

	waveCircleLayer = new paper.Layer();

	waveCircleLayer.activate();

	calculatePerspectiveGridEndpoints();
	drawPerspectiveGrid();
	calculateHorizontalGridEndpoints()
	drawHorizontalLines();
}

$(document).ready(function() {
	setupInitialLayout();
});

function loadSound(paper_id, instance_id)
{
	// Check if sound exists in buffer
	if(objects[paper_id] === undefined)
	{
		var file_id = modules[paper_id]["file_id"];

		var url = files[file_id]["full_path"];
	
		var request = new XMLHttpRequest();
    	request.open('GET', url, true);
    	request.responseType = 'arraybuffer';
    	request.onload = function () {
    	    a_ctx.decodeAudioData(request.response, function (buffer) {
    	    	var sound;
	
    	    	sound = {
    	    		buffer: null
    	    	};
	
    	    	sound.analyser = a_ctx.createAnalyser();
    	    	sound.panner = a_ctx.createPanner();

    	    	if(sound.buffer == null)
		        {
		        	sound.buffer = buffer;
		        }
	
				sound.source = a_ctx.createBufferSource();
    			sound.source.buffer = sound.buffer;
    			sound.source.connect(sound.analyser);
    			sound.analyser.connect(sound.panner);
    			sound.panner.setPosition(0, 0, 0);
    			sound.panner.connect(a_ctx.destination);

    			objects[instance_id].sound = sound;
    			
    	    }, onError);
    	};
	
    	request.onreadystatechange = function () {
    		if(request.readyState == 4)
    		{
    		}
    	};
	
    	request.send();
    }
    else
    {
    	if(DEBUG) console.log("yes:", objects[paper_id]);
    }
}

function startSound(instance_id)
{
	if(objects[instance_id] === undefined) return;
	var obj = objects[instance_id].sound;
	objects[instance_id].hasStarted = true;
	var soundLength = obj.source.buffer.duration;

	objects[instance_id].degreesPerOptimalFrame = 6/soundLength;
	obj.source.start(0);
}

function onError()
{
	if(DEBUG) console.log("Error loading sound ");
}


function toggleLoop(e)
{
	var objectIndex = e.target.objectIndex;
	if(objects[objectIndex] !== undefined && objects[objectIndex].sound !== undefined)
	{
		objects[objectIndex].sound.source.loop = !objects[objectIndex].sound.source.loop;
		objects[objectIndex].loop = !objects[objectIndex].loop;
		if(DEBUG) console.log("Set loop to " + objects[objectIndex].sound.source.loop + " for object with id " + objectIndex);
	}
}

function getXPan(xpos)
{
	var width = cw;
	var sign = 1;
	var temp = ((2 * xpos) - width) / width;
	var pan = temp * 10;
	return xpos/width;
	return pan;
}

function getYPan(ypos)
{
	var y = ypos - 200;
	var canvasHeight = ch - 200;
	var pan = 1- (y / canvasHeight);
	if(DEBUG) console.log("Pan: ", pan * g_attenuation);
	return pan * g_attenuation;
}

function getScale(y)
{
	if (y < 200) return 0.625;
	var scale = 4*(y - 200)/ch;
	if (scale < 0.1) scale = 0.1;
	return scale;
}

function log10(n)
{
	return Math.log(n)/Math.log(10);
}

function changePan(id, pan)
{
	if(pan.x > 1) pan.x = 1;
	if(pan.x < -1) pan.x = -1;

	var x = Math.sin(pan.x * Math.PI);
	var z = Math.sin(pan.x * Math.PI);

	var obj = objects[id];

	if(obj.sound !== undefined)
	{
		obj.sound.panner.setPosition(2*pan.x - 1, 0, pan.y);//getYPan(pan.y));//
	}
}

var sched = new Scheduler(SLOWEST_BPM);
sched.schedule();

function removeSound(id)
{	
	console.log("will remove sound ", id);
	if(objects[id] !== undefined)
	{
		sched.removeFromBuffer(id);
		if(objects[id] !== undefined && objects[id].hasStarted == true)
		{
			objects[id].sound.source.stop(0);
		}

		if(objects[id].isHeld)
		{
			pushedElement = null;
		}

		objects[id].paper.symbol.definition.children = [];
		//objects[id].paper.remove();

		delete objects[id];
	}
}
