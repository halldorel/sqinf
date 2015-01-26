var updates = 0;
var g_r = 60;
var moduleRadius = 25;
var res = 16;
var ampConstDefault = 10.0;
var pointAccelConstDefault = 0.010;
var pointCounter = 0;
var wavCount = 0;

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

var clockPath = new paper.Path({
	strokeColor: new paper.Color(0, 0, 0, 1),
	strokeWidth: 2, 
	strokeCap: 'square'
});

clockPath.add(new paper.Point(0, 0));
clockPath.add(new paper.Point(0, -g_r));

var waveCircleGroup = new paper.Group(waveCircle);

var waveCircleInit = new paper.Path({
	strokeColor: new paper.Color(0, 0, 0, 0),
	strokeWidth: 0
});

var peakMeter = new paper.Path({
	strokeColor: 'rgb(230, 70, 70)',
	strokeWidth: 5
});

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

var waveCircleSymbol = new paper.Symbol(waveCircleGroup);

var waveCircleInitSymbol = new paper.Symbol(waveCircleInit);

var numberOfLines = 18;

var startPoints = [];
var endPoints = [];

var linePaths = [];

var perspectiveGridLayer = new paper.Layer();

function calculatePerspectiveGridEndpoints()
{
	startPoints = [];
	endPoints = [];

	for (var i = 0; i < numberOfLines; i++)
	{
		startPoints.push(new paper.Point(0, 0));
		endPoints.push(new paper.Point(0, 0));
	}

	for(var i = 0; i < numberOfLines-1; i++)
	{
		//var startX = (i/numberOfLines) * _cw;
		var startX = 0.5*_cw;

		var endX = (10*i/numberOfLines) * _cw;
		endX = (endX - 4.5*_cw);
	
		startPoints[i].x = startX;
		startPoints[i].y = 200;

		endPoints[i].x = endX;//*Math.sin(i/numberOfLines*Math.PI);
		endPoints[i].y = (_ch)*2*Math.sin((1+i)/numberOfLines*Math.PI);

		if (endPoints[i].y < 200)
		{
			endPoints[i].y = 200;
		}
	}
}

function drawPerspectiveGrid()
{
	perspectiveGridLayer.activate();
	linePaths = [];
	// Draw perspective grid
	for(var i = 0; i < numberOfLines; i++)
	{
		linePaths.push(new paper.Path.Line(startPoints[i], endPoints[i]));
		linePaths[i].strokeColor = "#999";
		linePaths[i].strokeWidth = 1;
	}
	waveCircleLayer.activate();
}

var startPointsHz = [];
var endPointsHz = [];

var linePathsHz = [];

function calculateHorizontalGridEndpoints()
{
	startPointsHz = [];
	endPointsHz = [];

	for(var i = 0; i < numberOfLines; i++)
	{
		startPointsHz.push(new paper.Point(0, (200 + 3*(Math.pow(i/numberOfLines, 2)*(_ch)))));
		endPointsHz.push(new paper.Point(cw, (200 + 3*(Math.pow(i/numberOfLines, 2)*(_ch)))));
	}
}

function drawHorizontalLines()
{
	perspectiveGridLayer.activate();
	linePathsHz = [];

	for(var i = 0; i < numberOfLines/2; i++)
	{
		linePathsHz.push(new paper.Path.Line(startPointsHz[i], endPointsHz[i]));
		linePathsHz[i].strokeColor = "#999";
		linePathsHz[i].strokeWidth = 1;
	}
	waveCircleLayer.activate();
}

function removeAllFromArray(array)
{
	if(!(array === []))
	{
		for(var i in array)
		{
			if(array[i] !== undefined)
			{
				array[i].remove();
			}
		}
	}
}

function clearGrid()
{
	removeAllFromArray(linePaths);
	removeAllFromArray(linePathsHz);
}

function createModuleSymbol(moduleColor, secondModuleColor)
{
	var moduleClock = clock(0, 0, moduleRadius/2, 0, moduleColor, secondModuleColor);
	moduleClock[1](180);

	var moduleSymbol = new paper.Symbol(moduleClock[0]);
	return moduleSymbol;
}
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

// Event listeners
var mouseDown = function (e) {
	var objectIndex = e.target.objectIndex;
	if(DEBUG) console.log("mouseDown: ", e.target);
	pushedElement = e.target;
	objects[pushedElement.objectIndex].isHeld = true;
	if(DEBUG) console.log(objectIndex, " is held: ", objects[objectIndex].isHeld);
};

var mouseDrag = function (e) {
	if(pushedElement !== null && objects[pushedElement.objectIndex] !== undefined)
	{
		var objectIndex = pushedElement.objectIndex;
		objects[objectIndex].position = e.point;
		pushedElement.position = e.point;
		correctStackingOrder(e)
		setActiveObjectPan(e);
	}
	else
	{
		if(e.target)
		{
			pushedElement = e.target;
		}
	}
};

var mouseDownModule = function (e) {
	// Start preloading audio
	var paper_id = e.target.id;
	var file_id = modules[paper_id].file_id;
	var properties = files[modules[paper_id].file_id];

	var moduleColor = Settings.colorsForIndex(file_id)[0];
	var secondColor = Settings.colorsForIndex(file_id)[1];
	
	pushedElement = placeWaveSymbol(e.point.x, e.point.y, getScale(e.point.y), moduleColor, properties, secondColor);
	
	var objectIndex = pushedElement.objectIndex;
	objects[objectIndex].isHeld = true;

	if(DEBUG) console.log(objectIndex, " is held: ", objects[objectIndex].isHeld);

	loadSound(paper_id, objectIndex);
};

var mouseUp = function (e) {
	var objectIndex = pushedElement.objectIndex;
	if(DEBUG) console.log("mouseUp:", e.target);
	startActiveObject(true, pushedElement);
	
	if(isOffScreen(pushedElement.position))
	{
		if(DEBUG) console.log("Removed sound", objectIndex)
		removeSound(objectIndex);
		pushedElement = null;
		return;
	}

	objects[objectIndex].isHeld = false;
	if(DEBUG) console.log(objectIndex, " is held: ", objects[objectIndex].isHeld);

	setActiveObjectPan(e);
	if(DEBUG) console.log(objects[objectIndex]);
	pushedElement = null;
};

var doubleClick = function (e) {
	toggleLoop(e);
};

function correctStackingOrder(e)
{
	waveCircleLayer.children.sort(function (a, b) {
		return a.position.y - b.position.y;
	});
}

function setActiveObjectPan(e) 
{
	var objectIndex = pushedElement.objectIndex;
	if(pushedElement !== null)
	{
		changePan(objectIndex, {x: getXPan(e.point.x), y: getYPan(e.point.y)});
	}
}

function startActiveObject(scheduled, object)
{
	if(DEBUG) console.log("startActiveObject scheduled:", scheduled, " object:", object);
	var scheduled = scheduled || false;

	var objectIndex = object.objectIndex;

	if (objects[objectIndex].hasStarted === true)
		return;

	var startClipNowAndStopTrying = function () {
		if(DEBUG) console.log(objectIndex, " has started : ", objects[objectIndex].hasStarted);
		if(scheduled && objects[objectIndex].hasStarted === false)
		{
			sched.queue(objectIndex);
		}

		clearInterval(interval);
		if(DEBUG) console.log("Cleared interval")
	};

	var interval = setInterval( function () {
		// Try until sound becomes available, then schedule it
		// and stop trying
		if(objects[objectIndex] !== undefined && objects[objectIndex].sound !== undefined)
		{
			startClipNowAndStopTrying();
		}
	}, 1000);
}

var mouseUpModule = function () {
	/*if(DEBUG) console.log("mouseUpModule:", e.target);
	if(DEBUG) console.log("Starting active object: ", placed.objectIndex)
	//startActiveObject(true, placed);
	pushedElement = null;*/
};

// Helper functions
function waveFunc (x) {
	return (40 + (20 * Math.sin(x * 2 * Math.PI)));
}

function placeWaveSymbol(x, y, scale, color, properties, secondColor)
{
	if(DEBUG) console.log("placeWaveSymbol");
	color = color || 'rgb(120, 120, 120)';
	secondColor = secondColor || 'rgb(120, 0, 0)';
	properties = properties | {};
	var placed = waveCircleSymbol.clone().place(new paper.Point(x, y));
	var hvadErKlukkan = clock(0, 0, g_r, 1, color, secondColor);
	placed.symbol.definition.children[1] = hvadErKlukkan[0];
	//placed.symbol.definition.children[0].clipMask = true;
	placed.symbol.definition._clipItem = placed.symbol.definition.children[0];
	hvadErKlukkan[0].remove();
//debugger;
	//placed.symbol.definition.clipped = true;
	pushObject(placed, properties, hvadErKlukkan);
	placed.onMouseDown = mouseDown;
	placed.onMouseDrag = mouseDrag;
	placed.onMouseUp = mouseUp;
	placed.onDoubleClick = doubleClick;
	//placed.onUpdate = updateWaveCircle;
	return placed;
}

var g_objectIndex = 0;
function pushObject(paper, properties, clock)
{
	paper.objectIndex = g_objectIndex;
	
	objects[g_objectIndex++] = {
		paper : paper,
		properties : properties,
		hasStarted  : false,
		clock : clock
	};
	
	if(DEBUG) console.log("pushObject: ", objects);
}

function isOffScreen(pos)
{
	return (pos.x > cw) || (pos.x < 0) || (pos.y > ch) || (pos.y < 200);
}

function placeModuleSymbol(moduleSymbol, x, y)
{
	var placed = moduleSymbol.place(new paper.Point(x, y));
	placed.onMouseDown = mouseDownModule;
	placed.onMouseDrag = mouseDrag;
	placed.onMouseUp = mouseUpModule;
	return placed;
}

var updateWaveCircle = function (event, paper_obj) {
	if(paper_obj == null && DEBUG) console.log("paper object null");
	if(paper_obj.objectIndex == null && DEBUG) console.log("paper object id null");
	var objectIndex = paper_obj.objectIndex;
	var obj = objects[objectIndex];
	var sound_obj = obj["sound"];
	var properties = obj["properties"];

	var scale = getScale(obj.paper.position.y);

	obj.paper.matrix.scaleX = scale;
	obj.paper.matrix.scaleY = scale;
/*
	obj.paper.symbol.definition.matrix.scaleX = scale;
	obj.paper.symbol.definition.matrix.scaleY = scale;
*/
	//obj.paper.selected = true;

	var amp = properties.amp ? properties.amp : ampConstDefault;
	var pointAccelConst = properties.accel ? properties.accel : pointAccelConstDefault;

	if(obj.pointSpeed === undefined)
	{
		obj.pointSpeed = [];
	}

	if(sound_obj !== undefined)
	{
		obj.sound.fftdata = new Uint8Array(obj.sound.analyser.frequencyBinCount);
		obj.sound.analyser.getByteFrequencyData(obj.sound.fftdata);
		obj.sound.source.onended = function () { if(objects[objectIndex] !== undefined) objects[objectIndex].paper.remove(); };
		obj.sound.ontimeupdate = function (e) { console.log(e); };

		for(var i = 0; i < res; i++)
		{
			var wavePoint = paper_obj.symbol.definition.children[0].segments[i].point;
			var	freq = sound_obj.fftdata[i];
			
			//var freq = 1;
			var j = Math.PI*2*i/res;
			wavePoint.x = wavePoint.x + amp * 0.001 * freq * Math.cos(j);
			wavePoint.y = wavePoint.y + amp * 0.001 * freq * Math.sin(j);
		}

		// Ticks the clock at a given speed
		if(obj.hasStarted) obj.clock[1](obj.degreesPerOptimalFrame * (1 + event.delta), obj.loop);
	}

	var delta = [];
	var prevDelta = [];

	for (var i = 0; i < res; ++i)
	{
		var j = Math.PI*2*i/res;
		
		var point = paper_obj.symbol.definition.children[0].segments[i].point;

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
	
	paper_obj.symbol.definition.children[0].smooth();
}