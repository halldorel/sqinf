var wave = new paper.Path({
	strokeColor: new paper.Color(0, 0, 0, 0),
	strokeWidth: 0,
	strokeCap: 'square'
});

var waveCircle = new paper.Path({
	strokeColor: new paper.Color(0, 0, 0, 0),
	strokeWidth: 0, 
	strokeCap: 'square'
});

var waveCircleInit = new paper.Path({
	strokeColor: new paper.Color(0, 0, 0, 0),
	strokeWidth: 0
});

var peakMeter = new paper.Path({
	strokeColor: 'rgb(230, 70, 70)',
	strokeWidth: 5
});

var updates = 0;

function createModuleSymbol(moduleColor)
{
	var modulePath = new paper.Path.Circle({
		center: [0, 0],
		radius: 25,
		strokeWidth : 0,
		fillColor: moduleColor
	});

	var moduleSymbol = new paper.Symbol(modulePath);

	return moduleSymbol;
}

var g_r = 40;
var res = 16;
var speed = 8;
var amp = 15.0;
var pointAccelConst = 0.003;

// Init wave circle
for(var i = 0; i < res; ++i)
{
	var j = Math.PI*2*i/res;
	
	var x = g_r * Math.cos(j);
	var y = g_r * Math.sin(j);

	waveCircle.add(new paper.Point(x, y));
	waveCircleInit.add(new paper.Point(x, y));
}

waveCircle.closed = true;
waveCircle.smooth();
waveCircle.fillColor = 'rgba(0, 220, 220, 1)';

var waveCircleSymbol = new paper.Symbol(waveCircle);
//waveCircleSymbol.place(new paper.Point(250, 250));

var waveCircleInitSymbol = new paper.Symbol(waveCircleInit);
//waveCircleInitSymbol.place(new paper.Point(250, 250));

var pointCounter = 0;

var wavCount = 0;

function smoothen(x)
{
	var results = [];

	for(var i = 0; i < x; ++i)
	{
		var j = 2 * i / x;
		results.push(1/(1+3*j*j));
	}

	return results;
}

var ii = smoothen(11);

wave.onFrame = function (event) {
	for(var id in objects)
	{
		updateWaveCircle(event, objects[id].paper);
	}
}

var updateWaveCircle = function (event, paper_obj) {
	var paper_id = paper_obj.id;
	var obj = objects[paper_id];
	var sound_obj = objects[paper_id]["sound"];

	if(obj === undefined || sound_obj === undefined)
		return;

	if(obj.pointSpeed === undefined)
	{
		obj.pointSpeed = [];
	}

	obj.sound.fftdata = new Uint8Array(obj.sound.analyser.frequencyBinCount);
	obj.sound.timedomain = new Uint8Array(obj.sound.analyser.frequencyBinCount);
	obj.sound.analyser.getByteFrequencyData(obj.sound.fftdata);
	obj.sound.analyser.getByteTimeDomainData(obj.sound.timedomain);

	var pointUpdate = [];

	pointCounter = Math.floor(event.count) % res;

	var odd = event.count % 2;

	for(var i = 0; i < res; i++)
	{
		var wavePoint = paper_obj.symbol.definition.segments[i].point;
		var	freq = sound_obj.fftdata[i];
		var j = Math.PI*2*i/res;
		wavePoint.x = wavePoint.x + amp * 0.001 * freq * Math.cos(j);
		wavePoint.y = wavePoint.y + amp * 0.001 * freq * Math.sin(j);
	}

	var delta = [];
	var prevDelta = [];

	for (var i = 0; i < res; ++i)
	{
		var j = Math.PI*2*i/res;
		var point = paper_obj.symbol.definition.segments[i].point;

		var initCircle = waveCircleInit.segments[i].point;

		var initX = initCircle.x;
		var initY = initCircle.y;


		var distSq = ((point.x * point.x) + (point.y * point.y));
		delta[i] = distSq;

		if(delta[i] > g_r*g_r)
		{
			obj.pointSpeed[i] += pointAccelConst;
			point.x -= Math.cos(j) * amp * obj.pointSpeed[i];
			point.y -= Math.sin(j) * amp * obj.pointSpeed[i];
		}/*
		else if(delta[i] <= g_r*g_r)
		{
			point.x += Math.cos(j) * obj.pointSpeed[i];
			point.y += Math.sin(j) * obj.pointSpeed[i];
		}
		else if(delta[i] <= g_r*g_r && obj.pointSpeed[i] > -0.3)
		{
			obj.pointSpeed[i] -= pointAccelConst;
			point.x -= Math.cos(j) * amp * obj.pointSpeed[i];
			point.y -= Math.sin(j) * amp * obj.pointSpeed[i];
		}*/
		else
		{
			point.x = initX;
			point.y = initY;
			obj.pointSpeed[i] = 0;
		}
	}

	//console.log(updates);
	//paper_obj.symbol.definition.smooth();
}

// Event listeners

var pushedElement = null;
var mouseDown = function (e) {
	pushedElement = e.target;
};

var mouseDrag = function (e) {
	if(pushedElement !== null)
	{
		pushedElement.position = e.point;

		setActiveObjectPan(e);
	}
};

var mouseDownModule = function (e) {
	// Start preloading audio

	var paper_id = e.target.id;
	pushedElement = e.target;

	if(pushedElement !== null)
	{
		pushedElement = placeWaveSymbol(pushedElement.position.x, pushedElement.position.y);
	}

	loadSound(paper_id, pushedElement.id);
};

var mouseUp = function (e) {
	setActiveObjectPan(e);
	pushedElement = null;
};

function setActiveObjectPan(e) 
{
	if(pushedElement !== null)
	{
		changePan(pushedElement.id, {x: getXPan(e.point.x), y: getYPan(e.point.y)});
	}
}

var mouseUpModule = function () {
	var placed = placeWaveSymbol(pushedElement.position.x, pushedElement.position.y);
	console.log(placed);
	pushedElement.remove();
	pushedElement = null;
};

// Helper functions

function waveFunc (x) {
	return (40 + (20 * Math.sin(x * 2 * Math.PI)));
}

function placeWaveSymbol(x, y, scale)
{
	var placed = waveCircleSymbol.clone().place(new paper.Point(x, y));
	objects[placed.id] = {};
	objects[placed.id].paper = placed;
	if(scale !== undefined) placed.scale(scale);
	placed.onMouseDown = mouseDown;
	placed.onMouseDrag = mouseDrag;
	placed.onMouseUp = mouseUp;
	placed.onUpdate = updateWaveCircle;
	return placed;
}

function placeModuleSymbol(moduleSymbol, x, y)
{
	var placed = moduleSymbol.place(new paper.Point(x, y));
	placed.onMouseDown = mouseDownModule;
	placed.onMouseDrag = mouseDrag;
	placed.onMouseUp = mouseUpModule;
	return placed;
}