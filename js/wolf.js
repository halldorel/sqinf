//"use strict";

// Dependencies: Dancer & jQuery
// bach

// Setup the soundManager instance

var sounds = [];
var html = "";
var dragSrcEl = null;
var canvas = document.getElementById("scope");
var full_path = ''
var sounds_path = full_path + 'sounds';

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

var windowPadding = 40;

var cw = document.body.clientWidth - (2 * windowPadding);
var ch = document.body.clientHeight - (2 * windowPadding);

window.onresize = function () {
	cw = document.body.clientWidth - (2 * windowPadding);
	ch = document.body.clientHeight - (2 * windowPadding);
	$(canvas).attr('width', cw);
	$(canvas).attr('height', ch);
	positionModules();
};

$(canvas).attr('width', cw);
$(canvas).attr('height', ch);

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
	
	module_pos.cx = 35;
	module_pos.cy = 35;

	for(var i in modules)
	{
		modules[i].paper.position.x = module_pos.cx;
		modules[i].paper.position.y = module_pos.cy;
		module_pos.cx += 60;

		if(module_pos.cx >= cw - 50)
		{
			module_pos.cx = 35;
			module_pos.cy += 60;
		}
	}
}

$(document).ready(function() {
	for(var i = 0; i < files.length; ++i)
	{	
		// Read module color if defined, else use gray
		moduleColor = getModuleColor(i);

		var placed = placeModuleSymbol(createModuleSymbol(moduleColor), 0, 0);
		
		modules[placed.id] = {
			paper: placed,
			file_id: i
		};
	}

	positionModules();
});

function getModuleColor(file_id)
{
	return moduleColor = (files[file_id]["color"] !== undefined) ?
			'rgb(' + colors[files[file_id]["color"]] + ')' : 'rgb(120, 120, 120)';
}

function setupObject(cx, cy)
{
	// Reference to placed symbol in paper
	// Add symbol to object object
	var placed = placeWaveSymbol(cx, cy);
	objects[placed._id] = {
		paper : placed
	};

	loadSound(dragSrcEl.id, placed._id);
}

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
	
				sound.convolver = a_ctx.createConvolver();
    	    	sound.analyser = a_ctx.createAnalyser();
    	    	sound.panner = a_ctx.createPanner();
	
    	    	sound.analyser.fftSize = 64;
    	    	sound.analyser.smoothingTimeConstant = 0.9;

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
    	console.log("yes:", objects[paper_id]);
    }
}

function startSound(instance_id)
{
	var obj = objects[instance_id].sound;
	obj.source.start(0);
}

function onError()
{
	console.log("Error loading sound ");
}

function removeSound(id)
{
	objects[id]["sound"]["source"].stop();
	objects[id].paper.remove();
	delete objects[id];
}

function toggleLoop(e)
{
	var id = e.target._id;
	objects[id]["sound"]["source"].loop = !objects[id]["sound"]["source"].loop;
	console.log("Set loop to " + objects[id]["sound"]["source"].loop + " for object with id " + id);
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
	var height = ch;
	var temp = 1-(ypos/height);
	var pan = temp * 10;
	return pan;
}

function setScale(id, y)
{
	var scale = 1+y/ch;
	objects[id].scale = scale;
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
		console.log("X: ", 2*pan.x - 1, " Z: ", Math.sin(pan.x * Math.PI));
		obj.sound.panner.setPosition(2*pan.x - 1, 0, Math.sin(pan.x * Math.PI));
	}
}
