//"use strict";

// Dependencies: Dancer & jQuery
// bach

// Setup the soundManager instance

var sounds = [];
var html = "";
var dragSrcEl = null;
var canvas = document.getElementById("scope");
var full_path = '/sqinf/'
var sounds_path = full_path + 'sounds/mp3/';

// Modules available to play
var modules = {};

// Modules currently playing
var objects = {};

// Global vars

var cw = document.body.clientWidth;
var ch = document.body.clientHeight;
console.log(ch);	

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
	$.each(files, function (key, val)
	{
		var humanString = key.split('_');
		humanString = humanString.join(" ");
		
		var placed = placeModuleSymbol(createModuleSymbol('rgb(255, 0, 0)'), module_pos.cx, module_pos.cy);
		
		module_pos.cx += 60;

		if(module_pos.cx > cw)
		{
			module_pos.cx = 35;
			module_pos.cy += 60;
		}

		modules[placed.id] = {
			paper: placed,
			src: val
		};
	});
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

	console.log("placed: ", placed);
}

function startSound(src)
{

}

function loadSound(paper_id, instance_id)
{
	var url = sounds_path + modules[paper_id].src;

	var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    
	console.log(a_ctx);

    request.onload = function () {
        a_ctx.decodeAudioData(request.response, function (buffer) {
        	var sound;

        	sound = {
        		buffer: null
        	};

			sound.convolver = a_ctx.createConvolver();
        	sound.analyser = a_ctx.createAnalyser();
        	sound.panner = a_ctx.createPanner();

        	sound.analyser.fftSize = 2048;
        	sound.analyser.smoothingTimeConstant = 0.1;

        	if(sound.buffer == null)
	        {
	        	sound.buffer = buffer;
	        }

			sound.source = a_ctx.createBufferSource();
    		sound.source.buffer = sound.buffer;
	        //sound.fftdata = new Uint8Array(sound.source.buffer);
	        //fft.getByteFrequencyData(sound.data);
    		sound.source.connect(sound.panner);
    		sound.convolver.connect(sound.analyser);
    		sound.analyser.connect(sound.panner);
    		sound.panner.setPosition(0, 0, 0);

    		sound.panner.connect(a_ctx.destination);
    		sound.source.start(0);

    		objects[instance_id] = sound;

        }, onError);
    };

    request.onreadystatechange = function () {
    	if(request.readyState == 4)
    	{
    		objects[instance_id].readyToRumble = true;
    	}
    };

    request.send();
}

function onError()
{
	console.log("Error loading sound ");
}

function removeSound(id)
{
	// Remove the image
	objects[id].paper.remove();
}

function getPan(xpos)
{
	var width = cw;
	var temp = ((2 * xpos) - width) / width;
	var pan = temp * 5;
	return pan;
}

function getSoundId(paper_id)
{
	return sounds_playing[paper_id];
}

function changePan(id, pan)
{

}
