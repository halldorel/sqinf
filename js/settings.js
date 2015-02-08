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
		"color"	: ["#E2D300", "#0000AA"],
		"amp"	: 25.0,
		"accel" : 0.030
	},
	{
		"name" 	: "Cello Portamento.mp3",
		"speed" : 40,
		"color"	: ["#284020", "#FF4800"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Cello Reverse 1.mp3",
		"speed" : 40,
		"color"	: ["#A0968C", "#FF4800"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Cello Reverse 2.mp3",
		"speed" : 40,
		"color"	: ["#0000AA", "#FF4800"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Cello Reverse 3.mp3",
		"speed" : 40,
		"color"	: ["#00D6A1", "#FF4800"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Crescendo 2.mp3",
		"speed" : 40,
		"color"	: ["#F4EFA1", "#00D6A1"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Crescendo 3.mp3",
		"speed" : 40,
		"color"	: ["#0000AA", "#E8AE7C"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Crescendo.mp3",
		"speed" : 40,
		"color"	: ["#00D6A1", "#CAE1D0"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Harmonics 1.mp3",
		"speed" : 40,
		"color"	: ["#F4EFA1", "#599C00"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Harmonics 2.mp3",
		"speed" : 40,
		"color"	: ["#E2D300", "#CAE1D0"],
		"amp"	: 9.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Doppler Effect.mp3",
		"speed" : 40,
		"color"	: ["#960049", "#353017"],
		"amp"	: 20.0,
		"accel" : 0.030
	},
	{
		"name" 	: "Passing Trains.mp3",
		"speed" : 40,
		"color"	: ["#CAE1D0", "#0000AA"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Slow Crescendo 1.mp3",
		"speed" : 40,
		"color"	: ["#E2D300", "#FF4800"],
		"amp"	: 10.0,
		"accel" : 0.012
	},
	{
		"name" 	: "Slow Crescendo 2.mp3",
		"speed" : 40,
		"color"	: ["#FF4800", "#AD831E"],
		"amp"	: 10.0,
		"accel" : 0.013
	},
	{
		"name" 	: "Slow Crescendo 3.mp3",
		"speed" : 40,
		"color"	: ["#AD831E", "#E2D300"],
		"amp"	: 10.0,
		"accel" : 0.010
	},
	{
		"name" 	: "Slow Pizzicato 1.mp3",
		"speed" : 40,
		"color"	: ["#284020", "#A0968C"],
		"amp"	: 40.0,
		"accel" : 0.010
	},
	{
		"name" 	: "Slow Pizzicato 2.mp3",
		"speed" : 40,
		"color"	: ["#284020", "#EBB770"],
		"amp"	: 40.0,
		"accel" : 0.010
	},
	{
		"name" 	: "Slow Pizzicato 3.mp3",
		"speed" : 40,
		"color"	: ["#A0968C", "#AD831E"],
		"amp"	: 40.0,
		"accel" : 0.013
	},
/* 60 BPM */
	{
		"name"	: "Canon.mp3",
		"speed"	: 60,
		"color"	: ["#E8AE7C", "#00D6A1"],
		"amp"	: 10.0,
		"accel" : 0.0075
	},
	{
		"name"	: "Cluster Attacks.mp3",
		"speed"	: 60,
		"color"	: ["#E2D300", "#960049"],
		"amp"	: 20.0,
		"accel" : 0.018
	},
	{
		"name"	: "Cluster Bright.mp3",
		"speed"	: 60,
		"color"	: ["#E2D300", "#00D6A1"],
		"amp"	: 20.0,
		"accel" : 0.018
	},
	{
		"name"	: "Cluster Crescendo.mp3",
		"speed"	: 60,
		"color"	: ["#FF4800", "#750002"],
		"amp"	: 20.0,
		"accel" : 0.018
	},
	{
		"name"	: "Cluster Mid.mp3",
		"speed"	: 60,
		"color"	: ["#AD831E", "#CAE1D0"],
		"amp"	: 30.0,
		"accel" : 0.020
	},
	{
		"name"	: "Cluster Pulse.mp3",
		"speed"	: 60,
		"color"	: ["#750002", "#284020"],
		"amp"	: 30.0,
		"accel" : 0.020
	},
	{
		"name"	: "Harmonic Chain 1.mp3",
		"speed"	: 60,
		"color"	: ["#CAE1D0", "#A0968C"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name"	: "Harmonic Chain 2.mp3",
		"speed"	: 60,
		"color"	: ["#AD831E", "#CAE1D0"],
		"amp"	: 15.0,
		"accel" : 0.008
	},
	{
		"name"	: "Pizzicato 60 a.mp3",
		"speed"	: 60,
		"color"	: ["#AD831E", "#284020"],
		"amp"	: 25.0,
		"accel" : 0.018
	},
	{
		"name"	: "Pizzicato 60 b.mp3",
		"speed"	: 60,
		"color"	: ["#E8AE7C", "#284020"],
		"amp"	: 25.0,
		"accel" : 0.018
	},
	{
		"name"	: "Pizzicato 60 c.mp3",
		"speed"	: 60,
		"color"	: ["#00D6A1", "#AD831E"],
		"amp"	: 25.0,
		"accel" : 0.018
	},
	{
		"name"	: "Pizzicato 60 d.mp3",
		"speed"	: 60,
		"color"	: ["#E8AE7C", "#F4EFA1"],
		"amp"	: 25.0,
		"accel" : 0.018
	},
	{
		"name"	: "PPPP 2.mp3",
		"speed"	: 60,
		"color"	: ["#960049", "#AD831E"],
		"amp"	: 20.0,
		"accel" : 0.006
	},
	{
		"name"	: "PPPP Portamento 1.mp3",
		"speed"	: 60,
		"color"	: ["#599C00", "#960049"],
		"amp"	: 25.0,
		"accel" : 0.010
	},
	{
		"name"	: "PPPP Portamento 2.mp3",
		"speed"	: 60,
		"color"	: ["#CAE1D0", "#AD831E"],
		"amp"	: 25.0,
		"accel" : 0.010

	},
	{
		"name"	: "PPPP.mp3",
		"speed"	: 60,
		"color"	: ["#E2D300", "#A0968C"],
		"amp"	: 25.0,
		"accel" : 0.010
	},
	{
		"name"	: "Romantik 1.mp3",
		"speed"	: 60,
		"color"	: ["#CAE1D0", "#FF4800"],
		"amp"	: 25.0,
		"accel" : 0.020
	},
	{
		"name"	: "Romantik 2.mp3",
		"speed"	: 60,
		"color"	: ["#FF4800", "#960049"],
		"amp"	: 25.0,
		"accel" : 0.020
	},
	{
		"name"	: "Romantik 3.mp3",
		"speed"	: 60,
		"color"	: ["#960049", "#323031"],
		"amp"	: 25.0,
		"accel" : 0.020
	},
	{
		"name"	: "Runa 1.mp3",
		"speed"	: 60,
		"color"	: ["#0000AA", "#284020"],
		"amp"	: 20.0,
		"accel" : 0.010
	},
	{
		"name"	: "Runa 2.mp3",
		"speed"	: 60,
		"color"	: ["#00D6A1", "#0000AA"],
		"amp"	: 20.0,
		"accel" : 0.010
	},
	{
		"name"	: "Runa 3.mp3",
		"speed"	: 60,
		"color"	: ["#00D6A1", "#960049"],
		"amp"	: 20.0,
		"accel" : 0.010
	},
	{
		"name"	: "Runa 4.mp3",
		"speed"	: 60,
		"color"	: ["#FF4800", "#599C00"],
		"amp"	: 20.0,
		"accel" : 0.010
	},
	{
		"name"	: "Wave 1.mp3",
		"speed"	: 60,
		"color"	: ["#750002", "#599C00"],
		"amp"	: 15.0,
		"accel" : 0.015
	},
	{
		"name"	: "Wave 2.mp3",
		"speed"	: 60,
		"color"	: ["#E8AE7C", "#750002"],
		"amp"	: 15.0,
		"accel" : 0.015
	},
	{
		"name"	: "Wave 3.mp3",
		"speed"	: 60,
		"color"	: ["#750002", "#AD831E"],
		"amp"	: 15.0,
		"accel" : 0.015
	},
/* 90 BPM */
	{
		"name" 	: "Creaking Noise.mp3",
		"speed" : 90,
		"color"	: ["#0000AA", "#A0968C"],
		"amp"	: 20.0,
		"accel" : 0.020 
	},
	{	
		"name" 	: "Harmonic tremolo gliss.mp3",
		"speed" : 90,
		"color"	: ["#F4EFA1", "#CAE1D0"],
		"amp"	: 20.0,
		"accel" : 0.020  
	},
	{
		"name" 	: "Pizzicato 1.mp3",
		"speed" : 90,
		"color"	: ["#E2D300", "#E8AE7C"],
		"amp"	: 25.0,
		"accel" : 0.020 
	},
	{		
		"name" 	: "Pizzicato 2.mp3",
		"speed" : 90,
		"color"	: ["#E8AE7C", "#A0968C"],
		"amp"	: 25.0,
		"accel" : 0.020 
	},
	{		
		"name" 	: "Pump.mp3",
		"speed" : 90,
		"color"	: ["#A0968C", "#00D6A1"],
		"amp"	: 30.0,
		"accel" : 0.018 
	},
	{		
		"name" 	: "Ricochet 1.mp3",
		"speed" : 90,
		"color"	: ["#E2D300", "#284020"],
		"amp"	: 35.0,
		"accel" : 0.022 
	},
	{		
		"name" 	: "Ricochet 2.mp3",
		"speed" : 90,
		"color"	: ["#CAE1D0", "#750002"],
		"amp"	: 35.0,
		"accel" : 0.022
	},
	{		
		"name" 	: "Ricochet 3.mp3",
		"speed" : 90,
		"color"	: ["#599C00", "#A0968C"],
		"amp"	: 35.0,
		"accel" : 0.022
	},
	{		
		"name" 	: "Ricochet 4.mp3",
		"speed" : 90,
		"color"	: ["#AD831E", "#E8AE7C"],
		"amp"	: 35.0,
		"accel" : 0.022
	}
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
		if(files[index].color) return orderedColors[index];
		console.log("Warning: Color index out of bounds.");
		return "#FF0000";
	}
  
	return {
		colorForName : _colorForName,
		colorsForIndex: _colorsForIndex
	};
})();