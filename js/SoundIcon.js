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
var res = 32;
var speed = 5;
var amp = 2;
var pointAccelConst = 0.1;

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

// Init test waveform
var wav = [];
for(var i = 0; i < res; ++i)
{
	wav[i] = (Math.sin(1/i*62*Math.PI) + 1)/2;
}

// Init peak meter
peakMeter.add(new paper.Point(0, 100));
peakMeter.add(new paper.Point(0, 0));

var peakMeterSymbol = new paper.Symbol(peakMeter);
//peakMeterSymbol.place(new paper.Point(400, 200));

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

peakMeter.onFrame = function (event) {
	this.segments[1].point.y = -100*wav[wavCount];
}

var waveCircleOnFrame = function (event) {

	var paper_id = this.id;
	var obj = objects[paper_id];

	if(obj.pointSpeed === undefined)
	{
		obj.pointSpeed = [];
	}

	obj.fftdata = new Uint8Array(obj.analyser.frequencyBinCount);
	obj.analyser.getByteFrequencyData(obj.fftdata);

	var pointUpdate = [];

	
	pointCounter = Math.floor(event.count) % res;
	
	var wavePoint = this.symbol.definition.segments[pointCounter].point;

	var freq = obj.fftdata[0]/16;
	var j = Math.PI*2*pointCounter/res;

	wavePoint.x = wavePoint.x + amp * freq /* ii[i]*/* Math.cos(j);
	wavePoint.y = wavePoint.y + amp * freq /* ii[i]*/ * Math.sin(j);

	wavCount = event.count % wav.length;
	
	var delta = [];
	var prevDelta = [];

	for (var i = 0; i < res; ++i)
	{
		var j = Math.PI*2*i/res;
		var point = this.symbol.definition.segments[i].point;

		var initCircle = waveCircleInit.segments[i].point;

		var initX = initCircle.x;
		var initY = initCircle.y;

		obj.pointSpeed[i] += pointAccelConst;

		var distSq = ((point.x * point.x) + (point.y*point.y));
		delta[i] = distSq;

		if(/*(delta[i] && !prevDelta[i])*/ delta[i] > g_r*g_r)
		{
			//bounceEnable[i] = true;
			point.x -= Math.cos(j) * obj.pointSpeed[i];
			point.y -= Math.sin(j) * obj.pointSpeed[i];
		}
		/*else if((delta[i] < g_r*g_r) && (delta[i] > ((g_r*g_r)/2)))
		{
			point.x -= Math.cos(j) * pointSpeed[i];
			point.y -= Math.sin(j) * pointSpeed[i];
		}*/
		/*else if((delta[i] > ((g_r*g_r)/4)) && (delta[i] <= ((g_r*g_r)/2)))
		{
		

			point.x -= Math.cos(j) * pointSpeed[i];
			point.y -= Math.sin(j) * pointSpeed[i];
		}*/
		else
		{
			point.x = initX;
			point.y = initY;
			obj.pointSpeed[i] = 0;
		}
	
		prevDelta[i] = delta[i];
	}

	this.symbol.definition.smooth();

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
		// Scaling here
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
		changePan(pushedElement.id, {x: getPan(e.point.x)});
	}
}

var mouseUpModule = function () {
	var placed = placeWaveSymbol(pushedElement.position.x, pushedElement.position.y);
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
	console.log(placed);
	if(scale !== undefined) placed.scale(scale);
	placed.onMouseDown = mouseDown;
	placed.onMouseDrag = mouseDrag;
	placed.onMouseUp = mouseUp;
	placed.onFrame = waveCircleOnFrame;
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