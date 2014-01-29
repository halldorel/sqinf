//"use strict";

// Dependencies: Dancer & jQuery
// bach

// Setup the soundManager instance

var sounds = [];
var html = "";
var dragSrcEl = null;
var canvas = document.getElementById("scope");
var full_path = 'http://0.0.0.0:8080/sqinf/'
var sounds_path = full_path + 'sounds/';


var audio_urls = [];
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

// Holds key->value binding for soundManager id to corresponding symbol
var placed_symbols = {};

// Holds key->value binding for symbol id to corresponding soundManager id
var sounds_playing = {};

paper.setup(canvas);

var module_pos = {};
module_pos.cx = 35;
module_pos.cy = 35;

// Load sounds from JSON and create sound objects	var data = {};
	$.getJSON('json/sounds.json', function (data) { 
	
		$.each(data, function (key, val)
		{
			var humanString = key.split('_');
			humanString = humanString.join(" ");
			
			placeModuleSymbol(createModuleSymbol('rgb(255, 0, 0)'), module_pos.cx, module_pos.cy);
			module_pos.cx += 60;
			if(module_pos.cx > cw)
			{
				module_pos.cx = 35;
				module_pos.cy += 60;
			}
			audio_urls[key] = val;
		})
	});/*.done(function () {
		$("ul#modules").html(html);
	
		var mods = $("ul#modules li");
		var canvas = $("div#canvas-wrap");

		mods.on('dragstart', handleDragStart);
		canvas.on('dragover',  handleDragOver);
		canvas.on('dragleave', handleDragLeave);

		canvas.on('dragenter', handleDragEnter);
		canvas.on('drop', handleDrop);
	});*/

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

function loadSound(handle, paper_id)
{
	var url = sounds_path + audio_urls[handle];

	var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    
    request.onload = function () {
        a_ctx.decodeAudioData(request.response, function (buffer) { 
        	objects[paper_id].buffer = buffer; 
        }, errorLoadingSound(url))
    };

    request.onreadystatechange = function () {
    	
    };

    request.send();
}

function errorLoadingSound(sound)
{
	console.log("Error loading sound " + sound);
}

// Event handler for start of dragging modules
function handleDragStart(e)
{
	dragSrcEl = this;

	var handle = dragSrcEl.id;
	console.log(dragSrcEl);
	var cx = e.originalEvent.clientX - canvas.offsetLeft;
	var cy = e.originalEvent.clientY - canvas.offsetTop;

	if (e.stopPropagation)
	{
		e.stopPropagation();
	}

	
	setupObject(cx, cy);
	console.log("he");
}

// Prevent default events, so we can drop it
function handleDragOver(e)
{
	if(e.preventDefault) 
	{
		e.preventDefault();
	}

	return false;
}

function handleDragEnter(e)
{

}

function handleDragLeave(e)
{

}

function removeSound(id)
{
	// Remove the image
	placed_symbols[id].remove();

	// Remove from objects
	var paper_id = placed_symbols[id].id;

	delete placed_symbols.paper_id;
	delete sounds_playing.id
}

function getPan(xpos)
{
	var width = canvas.width;
	var temp = ((2 * xpos) - width) / width;
	var pan = temp * 100;
	return pan;
}

function getSoundId(paper_id)
{
	return sounds_playing[paper_id];
}

function changePan(id, pan)
{

}

function handleDrop(e)
{

	$(dragSrcEl).addClass("playing");

	return false;
}

$(document).ready(function (){

});