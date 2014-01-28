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

var g_r = 40;
var res = 32;
var speed = 2;
var amp = 10;
var pointAccel = 0.10;


// Init wave circle
for(var i = 0; i < res; ++i)
{
	var j = (2*i/res)*Math.PI;
	
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
peakMeterSymbol.place(new paper.Point(400, 200));

var waveCircleSymbol = new paper.Symbol(waveCircle);
waveCircleSymbol.place(new paper.Point(250, 250));

var waveCircleInitSymbol = new paper.Symbol(waveCircleInit);
waveCircleInitSymbol.place(new paper.Point(250, 250));

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

var ii = smoothen(5);

peakMeter.onFrame = function (event) {
	this.segments[1].point.y = -100*wav[wavCount];
}

var pointSpeed = [];

for(var i = 0; i < res; ++i)
{
	pointSpeed[i] = 0;
}

waveCircle.onFrame = function (event) {

	var pointUpdate = [];

	for(var i = 0; i < ii.length; ++i)
	{
		var updatePoint = ((pointCounter + i)) % res;
		pointUpdate[i] = this.segments[updatePoint].point;
		pointSpeed[updatePoint] = 0;
	}

	var oldPointCounter = 0;
	pointCounter = Math.floor(event.count) % res;

	if(oldPointCounter !== pointCounter)
	{
		for(var i = 0; i < pointUpdate.length; ++i)
		{
			var freq = dancer.getFrequency(500);
			var j = Math.PI*2*pointCounter/res;
			//pointUpdate[i].x = pointUpdate[i].x + amp * wav[wavCount]*ii[i]*Math.cos(j);
			//pointUpdate[i].y = pointUpdate[i].y + amp * wav[wavCount]*ii[i]*Math.sin(j);
			pointUpdate[i].x = pointUpdate[i].x + amp * wav[wavCount]*50000*freq*Math.cos(j);
			pointUpdate[i].y = pointUpdate[i].y + amp * wav[wavCount]*50000*freq*Math.sin(j);
		}
	}

	wavCount = event.count % wav.length;

	oldPointCounter = pointCounter;
	
	var delta = [];
	var prevDelta = [];

	for (var i = 0; i < res; ++i)
	{
		var j = Math.PI*2*i/res;
		var point = this.segments[i].point;

		var initCircle = waveCircleInit.segments[i].point;

		var initX = initCircle.x;
		var initY = initCircle.y;

		pointSpeed[i] += pointAccel;

		var distSq = ((point.x * point.x) + (point.y*point.y));
		delta[i] = distSq > g_r*g_r;

		if(/*!(delta[i] && prevDelta[i])*/ delta[i])
		{
			//pointSpeed[i] *= -1;
			point.x -= Math.cos(j) * pointSpeed[i];
			point.y -= Math.sin(j) * pointSpeed[i];
		}
		else
		{
			point.x = initX;
			point.y = initY;
			pointSpeed[i] = 0;
		}
	
		prevDelta[i] = delta[i];
	}

waveCircle.smooth();
}


var length = 40;

// Initialize waveform
for(var i = 0; i <= length; ++i)
{
	var ratio = i/length;
	var x = ratio * 80;
	var y = 0;
	wave.add(new paper.Point(x, y));
}

var box = new paper.Rectangle(new paper.Point(0, 0), new paper.Size(80, 80));
var boxBack = new paper.Rectangle(new paper.Point(0, 0), new paper.Size(80, 80));
var boxPath = new paper.Path.Rectangle(box, new paper.Size(10, 10));
var boxBackPath = new paper.Path.Rectangle(boxBack, new paper.Size(10, 10));

boxBackPath.fillColor = 'rgb(255, 255, 255)';
boxBackPath.opacity = 0.0;

boxPath.strokeColor = [0.8];
boxPath.strokeWidth = 8;

var group = new paper.Group([wave, boxPath, boxBackPath]);
var symbol = new paper.Symbol(group);

wave.onFrame = function(event) {
	for(var i = 0; i <= length; ++i)
	{
		var sinus = Math.sin(event.time*4 + 8*i/length);

		var point = this.segments[i].point;
		point.y = 0 + sinus * 20;
	}
};

var pushedElement = null;

var mouseDown = function (e) {
	pushedElement = e.target;
	//console.log(e.target);
};

var mouseMove = function (e) {

	if(pushedElement !== null)
	{
		var cx = e.clientX - canvas.offsetLeft;
		var cy = e.clientY - canvas.offsetTop;
		pushedElement.position = new paper.Point(cx, cy);

		var paper_id = pushedElement.id;
		var sm_id = getSoundId(paper_id);
		changePan(sm_id, getPan(cx));
	}

};

var mouseUp = function () {
	pushedElement = null;
};

function waveFunc (x) {
	return (40 + (20 * Math.sin(x * 2 * Math.PI)));
}

function placeWaveSymbol(x, y)
{
	var placed = waveCircleSymbol.place(new paper.Point(x, y));
	placed.onMouseDown = mouseDown;
	$(document).on('mousemove', mouseMove);
	placed.onMouseUp = mouseUp;
	return placed;
}