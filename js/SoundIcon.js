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

var infinitySymbol = new paper.Symbol(new paper.PointText({
	point : [0, 0],
	content : '∞',
	fillColor : 'black',
	fontFamily : 'Times New Roman',
	fontSize : 40
}));

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

var ampConstDefault = 10.0;
var pointAccelConstDefault = 0.010;

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

var waveCircleInitSymbol = new paper.Symbol(waveCircleInit);

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

wave.onFrame = function (event)
{
	for(var id in objects)
	{
		updateWaveCircle(event, objects[id].paper);
	}
}

var updateWaveCircle = function (event, paper_obj) {
	var paper_id = paper_obj.id;
	var obj = objects[paper_id];
	var sound_obj = objects[paper_id]["sound"];
	var properties = objects[paper_id]["properties"];

	var amp = properties.amp ? properties.amp : ampConstDefault;
	var pointAccelConst = properties.accel ? properties.accel : pointAccelConstDefault;

	if(obj === undefined || sound_obj === undefined)
		return;

	if(obj.pointSpeed === undefined)
	{
		obj.pointSpeed = [];
	}

	obj.sound.fftdata = new Uint8Array(obj.sound.analyser.frequencyBinCount);
	obj.sound.analyser.getByteFrequencyData(obj.sound.fftdata);
	obj.sound.source.onended = function () { removeSound(paper_id); };

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
		}
		else
		{
			point.x = initX;
			point.y = initY;
			obj.pointSpeed[i] = 0;
		}
	}
	paper_obj.symbol.definition.smooth();
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
		//setActiveObjectScale(e);
		setActiveObjectPan(e);
	}
};

var mouseDownModule = function (e) {
	// Start preloading audio
	var paper_id = e.target.id;
	var file_id = modules[paper_id].file_id;
	var properties = files[modules[paper_id].file_id];

	var moduleColor = getModuleColor(file_id);

	pushedElement = e.target;

	if(pushedElement !== null)
	{
		pushedElement = placeWaveSymbol(pushedElement.position.x, pushedElement.position.y, undefined, moduleColor, properties);
	}

	loadSound(paper_id, pushedElement.id);
};

var mouseUp = function (e) {
	console.log(pushedElement.position);
	if(isOffScreen(pushedElement.position))
	{
		removeSound(pushedElement.id);
		return;
	}
	setActiveObjectPan(e);
	startActiveObject(true);
	console.log(objects[pushedElement.id]);
	pushedElement = null;
};

var doubleClick = function (e) {
	toggleLoop(e);
};

function setActiveObjectPan(e) 
{
	if(pushedElement !== null)
	{
		changePan(pushedElement.id, {x: getXPan(e.point.x), y: getYPan(e.point.y)});
	}
}

function startActiveObject(scheduled)
{
	var scheduled = scheduled || false;
	if(pushedElement !== null)
	{
		var theId = pushedElement.id;

		if (objects[theId].hasStarted === true)
			return;

		var startClipNowAndStopTrying = function () {
			console.log(theId, " has started : ", objects[theId].hasStarted);
			if(scheduled && objects[theId].hasStarted === false)
			{
				sched.queue(theId);
			}

			clearInterval(interval);
			console.log("Cleared interval")
		};

		var interval = setInterval( function () {
			// Try until sound becomes available, then shedule it
			// and stop trying
			if(objects[theId].sound !== undefined)
			{
				startClipNowAndStopTrying();
			}
		}, 1000);
	}
}

function setActiveObjectScale(e) 
{
	if(pushedElement !== null)
	{
		setScale(pushedElement.id, e.point.y);
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

function placeWaveSymbol(x, y, scale, color, properties)
{
	color = color || 'rgb(120, 120, 120)';
	var placed = waveCircleSymbol.clone().place(new paper.Point(x, y));
	placed.symbol._definition.fillColor = color;

	pushObject(placed, properties);
	if(scale !== undefined) placed.scale(scale);
	placed.onMouseDown = mouseDown;
	placed.onMouseDrag = mouseDrag;
	placed.onMouseUp = mouseUp;
	placed.onDoubleClick = doubleClick;
	placed.onUpdate = updateWaveCircle;
	return placed;
}

function pushObject(paper, properties)
{
	objects[paper.id] = {
		"paper"			: paper,
		"properties"	: properties,
		"hasStarted" 	: false
	}
}

function isOffScreen(pos)
{
	return (pos.x > cw) || (pos.x < 0) || (pos.y > ch) || (pos.y < 0);
}

function placeModuleSymbol(moduleSymbol, x, y)
{
	var placed = moduleSymbol.place(new paper.Point(x, y));
	placed.onMouseDown = mouseDownModule;
	placed.onMouseDrag = mouseDrag;
	placed.onMouseUp = mouseUpModule;
	return placed;
}