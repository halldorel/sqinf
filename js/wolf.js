//"use strict";

// Dependencies: Dancer & jQuery
// bach

// Setup the soundManager instance

var sounds = [];
var html = "";
var dragSrcEl = null;
var canvas = document.getElementById("scope");
var sounds_path = 'sounds/';

var audio_objects = {};
var loaded_sounds = {};

// Global vars
var cw = document.body.clientWidth;
var ch = document.body.clientHeight;
$(canvas).attr('width', cw).attr('height', ch);

var ctx = canvas.getContext("2d");

// Holds key->value binding for soundManager id to corresponding symbol
var placed_symbols = {};

// Holds key->value binding for symbol id to corresponding soundManager id
var sounds_playing = {};

paper.setup(canvas);

ctx.fillStyle = "rgb(100, 100, 100)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Load sounds from JSON and create sound objects	var data = {};
	$.getJSON('json/sounds.json', function (data) { 
	
		$.each(data, function (key, val)
		{
			var humanString = key.split('_');
			humanString = humanString.join(" ");
			html += '<li id="' + key + '" draggable="true">'
			+ humanString + '</li>';

			var audio = new Audio();
			audio.src = sounds_path + val;

			audio_objects[key] = audio;

		})
	}).done(function () {
		$("ul#modules").html(html);
	
		var mods = $("ul#modules li");
		var canvas = $("div#canvas-wrap");

		mods.on('dragstart', handleDragStart);
		canvas.on('dragover',  handleDragOver);
		canvas.on('dragleave', handleDragLeave);

		canvas.on('dragenter', handleDragEnter);
		canvas.on('drop', handleDrop);
	});


function startSound(src)
{
	if(loaded_sounds[src] !== undefined)
	{
		loaded_sounds[src].play();
	}
	else
	{
		var dancer = new Dancer();
		dancer.load(audio_objects[src]);
		dancer.play();
		loaded_sounds[src] = dancer;
	}
}

// Event handler for start of dragging modules
function handleDragStart(e)
{
	dragSrcEl = this;
	console.log(dragSrcEl.id);
	/*console.log("handleDragStart: " + dragSrcEl.id);*/
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
	//var sound = soundManager.getSoundById(id);
	//sound.setPan(pan);
}

function handleDrop(e)
{
	var activeSoundId = dragSrcEl.id;
	console.log(dragSrcEl);
	//var activeSound = soundManager.getSoundById(activeSoundId);
	var cx = e.originalEvent.clientX - canvas.offsetLeft;
	var cy = e.originalEvent.clientY - canvas.offsetTop;

	if (e.stopPropagation)
	{
		e.stopPropagation();
	}

	$(dragSrcEl).addClass("playing");

	// Reference to placed symbol in paper
	var placed = placeWaveSymbol(cx, cy);
	startSound(activeSoundId);

	// Update object reference array
	sounds_playing[placed.id] = activeSoundId;
	
	// Initialize sound pan and play
	//soundManager.setPan(activeSoundId, getPan(cx));
	//activeSound.play();

	return false;
}

$(document).ready(function (){

});