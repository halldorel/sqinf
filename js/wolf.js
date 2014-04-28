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

var cw = document.body.clientWidth;
var ch = document.body.clientHeight;

window.onresize = function () {
var cw = document.body.clientWidth;
var ch = document.body.clientHeight;
	$(canvas).attr('width', cw);
	$(canvas).attr('height', ch);
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
var module_pos = {};
module_pos.cx = 35;
module_pos.cy = 35;

// Load modules from JSON and draw the modules
$(document).ready(function() {
	for(var i = 0; i < files.length; ++i)
	{	
		var placed = placeModuleSymbol(createModuleSymbol('rgb(255, 0, 0)'), module_pos.cx, module_pos.cy);
		
		module_pos.cx += 60;

		if(module_pos.cx > cw)
		{
			module_pos.cx = 35;
			module_pos.cy += 60;
		}

		modules[placed.id] = {
			paper: placed,
			file_id: i
		};
		console.log(i);
	}
});


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

function startSound(src)
{

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
	
    	    	sound.analyser.fftSize = 256;
    	    	sound.analyser.smoothingTimeConstant = 0.5;

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
    			sound.source.start(0);

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

function toggleLoop(id)
{
	objects[id]["sound"]["source"].loop = !objects[id]["sound"]["source"].loop;
	console.log("Set loop to " + objects[id]["sound"]["source"].loop + " for object with id " + id);
}

function getXPan(xpos)
{
	var width = cw;
	var sign = 1;
	var temp = ((2 * xpos) - width) / width;
	var pan = temp * 10;
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

function getSoundId(paper_id)
{
	return sounds_playing[paper_id];
}

function changePan(id, pan)
{
	var obj = objects[id];
	if(obj.sound !== undefined)
	{
		obj.sound.panner.setPosition(pan.x/50, pan.y, Math.cos((pan.x/50)*Math.PI));
	}
}
