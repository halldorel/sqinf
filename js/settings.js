// Used by Scheduler
var SLOWEST_BPM = 40;

var colors = {
	"green" : "0, 255, 0",
	"red"	: "255, 0, 0",
	"blue"	: "0, 0, 255",
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
		"color"	: "",
		"amp"	: 10.0,
		"accel" : 0.013
	},
	{
		"name" 	: "Slow Crescendo 3.mp3",
		"speed" : 40,
		"color"	: "",
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

var Settings = (function()
{
	var _colorForName = function(file_id)
	{
		return moduleColor = (files[file_id]["color"] !== undefined) ?
		'rgb(' + colors[files[file_id]["color"]] + ')' : 'rgb(120, 120, 120)';
	}

	return {
		colorForName : _colorForName
	};
})();