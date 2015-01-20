// Used by Scheduler
var SLOWEST_BPM = 40;

var colors = {
	"green" : "12, 180, 180",
	"red"	: "250, 103, 100",
	"blue"	: "100, 80, 200",
	"lime"	: "122, 122, 80"
}

var files = [
/* 40 BPM */
/* Amp default : 10.0 */
/* Accel default : 0.010 */
	{
		"name" 	: "Bouncing.mp3",
		"speed" : 40,
		"color"	: "blue",
		"amp"	: 25.0,
		"accel" : 0.030
	},
	{
		"name" 	: "Cello Portamento.mp3",
		"speed" : 40,
		"color"	: "red",
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Cello Reverse 1.mp3",
		"speed" : 40,
		"color"	: "green",
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Cello Reverse 2.mp3",
		"speed" : 40,
		"color"	: "blue",
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Cello Reverse 3.mp3",
		"speed" : 40,
		"color"	: "red",
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Crescendo 2.mp3",
		"speed" : 40,
		"color"	: "green",
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Crescendo 3.mp3",
		"speed" : 40,
		"color"	: "blue",
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Crescendo.mp3",
		"speed" : 40,
		"color"	: "red",
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Harmonics 1.mp3",
		"speed" : 40,
		"color"	: "green",
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Harmonics 2.mp3",
		"speed" : 40,
		"color"	: "blue",
		"amp"	: 9.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Doppler Effect.mp3",
		"speed" : 40,
		"color"	: "red",
		"amp"	: 20.0,
		"accel" : 0.030
	},
	{
		"name" 	: "Passing Trains.mp3",
		"speed" : 40,
		"color"	: "green",
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Slow Crescendo 1.mp3",
		"speed" : 40,
		"color"	: "blue",
		"amp"	: 10.0,
		"accel" : 0.012
	},
	{
		"name" 	: "Slow Crescendo 2.mp3",
		"speed" : 40,
		"color"	: "red",
		"amp"	: 10.0,
		"accel" : 0.013
	},
	{
		"name" 	: "Slow Crescendo 3.mp3",
		"speed" : 40,
		"color"	: "green",
		"amp"	: 10.0,
		"accel" : 0.010
	},
	{
		"name" 	: "Slow Pizzicato 1.mp3",
		"speed" : 40,
		"color"	: "red",
		"amp"	: 40.0,
		"accel" : 0.010
	},
	{
		"name" 	: "Slow Pizzicato 2.mp3",
		"speed" : 40,
		"color"	: "green",
		"amp"	: 40.0,
		"accel" : 0.010
	},
	{
		"name" 	: "Slow Pizzicato 3.mp3",
		"speed" : 40,
		"color"	: "blue",
		"amp"	: 40.0,
		"accel" : 0.013
	},
/* 60 BPM */
	{
		"name"	: "Canon.mp3",
		"speed"	: 60,
		"color"	: "red",
		"amp"	: 10.0,
		"accel" : 0.0075
	},
	{
		"name"	: "Cluster Attacks.mp3",
		"speed"	: 60,
		"color"	: "green",
		"amp"	: 20.0,
		"accel" : 0.018
	},
	{
		"name"	: "Cluster Bright.mp3",
		"speed"	: 60,
		"color"	: "blue",
		"amp"	: 20.0,
		"accel" : 0.018
	},
	{
		"name"	: "Cluster Crescendo.mp3",
		"speed"	: 60,
		"color"	: "red",
		"amp"	: 20.0,
		"accel" : 0.018
	},
	{
		"name"	: "Cluster Mid.mp3",
		"speed"	: 60,
		"color"	: "green",
		"amp"	: 30.0,
		"accel" : 0.020
	},
	{
		"name"	: "Cluster Pulse.mp3",
		"speed"	: 60,
		"color"	: "blue",
		"amp"	: 30.0,
		"accel" : 0.020
	},
	{
		"name"	: "Harmonic Chain 1.mp3",
		"speed"	: 60,
		"color"	: "red",
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name"	: "Harmonic Chain 2.mp3",
		"speed"	: 60,
		"color"	: "green",
		"amp"	: 15.0,
		"accel" : 0.008
	},
	{
		"name"	: "Pizzicato 60 a.mp3",
		"speed"	: 60,
		"color"	: "blue",
		"amp"	: 25.0,
		"accel" : 0.018
	},
	{
		"name"	: "Pizzicato 60 b.mp3",
		"speed"	: 60,
		"color"	: "red",
		"amp"	: 25.0,
		"accel" : 0.018
	},
	{
		"name"	: "Pizzicato 60 c.mp3",
		"speed"	: 60,
		"color"	: "green",
		"amp"	: 25.0,
		"accel" : 0.018
	},
	{
		"name"	: "Pizzicato 60 d.mp3",
		"speed"	: 60,
		"color"	: "blue",
		"amp"	: 25.0,
		"accel" : 0.018
	},
	{
		"name"	: "PPPP 2.mp3",
		"speed"	: 60,
		"color"	: "red",
		"amp"	: 20.0,
		"accel" : 0.006
	},
	{
		"name"	: "PPPP Portamento 1.mp3",
		"speed"	: 60,
		"color"	: "green",
		"amp"	: 25.0,
		"accel" : 0.010
	},
	{
		"name"	: "PPPP Portamento 2.mp3",
		"speed"	: 60,
		"color"	: "blue",
		"amp"	: 25.0,
		"accel" : 0.010

	},
	{
		"name"	: "PPPP.mp3",
		"speed"	: 60,
		"color"	: "red",
		"amp"	: 25.0,
		"accel" : 0.010
	},
	{
		"name"	: "Romantik 1.mp3",
		"speed"	: 60,
		"color"	: "green",
		"amp"	: 25.0,
		"accel" : 0.020
	},
	{
		"name"	: "Romantik 2.mp3",
		"speed"	: 60,
		"color"	: "blue",
		"amp"	: 25.0,
		"accel" : 0.020
	},
	{
		"name"	: "Romantik 3.mp3",
		"speed"	: 60,
		"color"	: "red",
		"amp"	: 25.0,
		"accel" : 0.020
	},
	{
		"name"	: "Runa 1.mp3",
		"speed"	: 60,
		"color"	: "green",
		"amp"	: 20.0,
		"accel" : 0.010
	},
	{
		"name"	: "Runa 2.mp3",
		"speed"	: 60,
		"color"	: "blue",
		"amp"	: 20.0,
		"accel" : 0.010
	},
	{
		"name"	: "Runa 3.mp3",
		"speed"	: 60,
		"color"	: "red",
		"amp"	: 20.0,
		"accel" : 0.010
	},
	{
		"name"	: "Runa 4.mp3",
		"speed"	: 60,
		"color"	: "green",
		"amp"	: 20.0,
		"accel" : 0.010
	},
	{
		"name"	: "Wave 1.mp3",
		"speed"	: 60,
		"color"	: "blue",
		"amp"	: 15.0,
		"accel" : 0.015
	},
	{
		"name"	: "Wave 2.mp3",
		"speed"	: 60,
		"color"	: "red",
		"amp"	: 15.0,
		"accel" : 0.015
	},
	{
		"name"	: "Wave 3.mp3",
		"speed"	: 60,
		"color"	: "green",
		"amp"	: 15.0,
		"accel" : 0.015
	},
/* 90 BPM */
	{
		"name" 	: "Creaking Noise.mp3",
		"speed" : 90,
		"color"	: "blue",
		"amp"	: 20.0,
		"accel" : 0.020 
	},
	{	
		"name" 	: "Harmonic tremolo gliss.mp3",
		"speed" : 90,
		"color"	: "red",
		"amp"	: 20.0,
		"accel" : 0.020  
	},
	{
		"name" 	: "Pizzicato 1.mp3",
		"speed" : 90,
		"color"	: "green",
		"amp"	: 25.0,
		"accel" : 0.020 
	},
	{		
		"name" 	: "Pizzicato 2.mp3",
		"speed" : 90,
		"color"	: "blue",
		"amp"	: 25.0,
		"accel" : 0.020 
	},
	{		
		"name" 	: "Pump.mp3",
		"speed" : 90,
		"color"	: "red",
		"amp"	: 30.0,
		"accel" : 0.018 
	},
	{		
		"name" 	: "Ricochet 1.mp3",
		"speed" : 90,
		"color"	: "green",
		"amp"	: 35.0,
		"accel" : 0.022 
	},
	{		
		"name" 	: "Ricochet 2.mp3",
		"speed" : 90,
		"color"	: "blue",
		"amp"	: 35.0,
		"accel" : 0.022
	},
	{		
		"name" 	: "Ricochet 3.mp3",
		"speed" : 90,
		"color"	: "red",
		"amp"	: 35.0,
		"accel" : 0.022
	},
	{		
		"name" 	: "Ricochet 4.mp3",
		"speed" : 90,
		"color"	: "green",
		"amp"	: 35.0,
		"accel" : 0.022
	}
];

var orderedColors = [
	["#E2D300", "#0000AA"],
	["#284020", "#FF4800"],
	["#A0968C", "#FF4800"],
	["#0000AA", "#FF4800"],
	["#00D6A1", "#FF4800"],
	["#F4EFA1", "#00D6A1"],
	["#0000AA", "#E8AE7C"],
	["#00D6A1", "#CAE1D0"],
	["#F4EFA1", "#599C00"],
	["#E2D300", "#CAE1D0"],
	["#960049", "#353017"],
	["#CAE1D0", "#0000AA"],
	["#E2D300", "#FF4800"],
	["#FF4800", "#AD831E"],
	["#AD831E", "#E2D300"],
	["#284020", "#A0968C"],
	["#284020", "#EBB770"],
	["#A0968C", "#AD831E"],
	["#E8AE7C", "#00D6A1"],
	["#E2D300", "#960049"],
	["#E2D300", "#00D6A1"],
	["#FF4800", "#750002"],
	["#AD831E", "#CAE1D0"],
	["#750002", "#284020"],
	["#CAE1D0", "#A0968C"],
	["#AD831E", "#CAE1D0"],
	["#AD831E", "#284020"],
	["#E8AE7C", "#284020"],
	["#00D6A1", "#AD831E"],
	["#E8AE7C", "#F4EFA1"],
	["#960049", "#AD831E"],
	["#599C00", "#960049"],
	["#CAE1D0", "#AD831E"],
	["#E2D300", "#A0968C"],
	["#CAE1D0", "#FF4800"],
	["#FF4800", "#960049"],
	["#960049", "#323031"],
	["#0000AA", "#284020"],
	["#00D6A1", "#0000AA"],
	["#00D6A1", "#960049"],
	["#FF4800", "#599C00"],
	["#750002", "#599C00"],
	["#E8AE7C", "#750002"],
	["#750002", "#AD831E"],
	["#0000AA", "#A0968C"],
	["#F4EFA1", "#CAE1D0"],
	["#E2D300", "#E8AE7C"],
	["#E8AE7C", "#A0968C"],
	["#A0968C", "#00D6A1"],
	["#E2D300", "#284020"],
	["#CAE1D0", "#750002"],
	["#599C00", "#A0968C"],
	["#AD831E", "#E8AE7C"]
];

var Settings = (function()
{
	var _colorForName = function(file_id)
	{
		return moduleColor = (files[file_id]["color"] !== undefined) ?
		'rgb(' + colors[files[file_id]["color"]] + ')' : 'rgb(120, 120, 120)';
	}

	var _colorsForIndex = function(index)
	{
		if(orderedColors[index]) return orderedColors[index];
		console.log("Warning: Color index out of bounds.");
		return "#FF0000";
	}

	return {
		colorForName : _colorForName
	};
})();