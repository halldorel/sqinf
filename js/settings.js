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
		"color"	: ["#ffb834", "#bf3100"],
		"amp"	: 25.0,
		"accel" : 0.030
	},
	{
		"name" 	: "Cello Portamento.mp3",
		"speed" : 40,
		"color"	: ["#00400a", "#008015"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Cello Reverse 1.mp3",
		"speed" : 40,
		"color"	: ["#800036", "#ff4200"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Cello Reverse 2.mp3",
		"speed" : 40,
		"color"	: ["#800036", "#929497"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Cello Reverse 3.mp3",
		"speed" : 40,
		"color"	: ["#800036", "#ac7c23"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Crescendo 1.mp3",
		"speed" : 40,
		"color"	: ["#008015", "#00c3a1"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Crescendo 2.mp3",
		"speed" : 40,
		"color"	: ["#008015", "#ffa180"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Crescendo 3.mp3",
		"speed" : 40,
		"color"	: ["#008015", "#00bf1f"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Harmonics 1.mp3",
		"speed" : 40,
		"color"	: ["#00ffd3", "#0026ff"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Distant Harmonics 2.mp3",
		"speed" : 40,
		"color"	: ["#00ffd3", "#f1f1f2"],
		"amp"	: 9.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Doppler Effect.mp3",
		"speed" : 40,
		"color"	: ["#590026", "#ffa180"],
		"amp"	: 20.0,
		"accel" : 0.030
	},
	{
		"name" 	: "Passing Trains.mp3",
		"speed" : 40,
		"color"	: ["#ac7c23", "#a6a8ab"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Slow Crescendo 1.mp3",
		"speed" : 40,
		"color"	: ["#ff4200", "#0026ff"],
		"amp"	: 10.0,
		"accel" : 0.012
	},
	{
		"name" 	: "Slow Crescendo 2.mp3",
		"speed" : 40,
		"color"	: ["#ff4200", "#00ffd3"],
		"amp"	: 10.0,
		"accel" : 0.013
	},
	{
		"name" 	: "Slow Crescendo 3.mp3",
		"speed" : 40,
		"color"	: ["#ff4200", "#00bf1f"],
		"amp"	: 10.0,
		"accel" : 0.010
	},
	{
		"name" 	: "Slow Pizzicato 1.mp3",
		"speed" : 40,
		"color"	: ["#929497", "#bf0051"],
		"amp"	: 40.0,
		"accel" : 0.010
	},
	{
		"name" 	: "Slow Pizzicato 2.mp3",
		"speed" : 40,
		"color"	: ["#929497", "#0026ff"],
		"amp"	: 40.0,
		"accel" : 0.010
	},
	{
		"name" 	: "Slow Pizzicato 3.mp3",
		"speed" : 40,
		"color"	: ["#929497", "#00c3a1"],
		"amp"	: 40.0,
		"accel" : 0.013
	},
/* 60 BPM */
	{
		"name"	: "Canon.mp3",
		"speed"	: 60,
		"color"	: ["#00bf1f", "#bf3100"],
		"amp"	: 10.0,
		"accel" : 0.0075
	},
	{
		"name"	: "Cluster Attacks.mp3",
		"speed"	: 60,
		"color"	: ["#00bf1f", "#2bcdff"],
		"amp"	: 20.0,
		"accel" : 0.018
	},
	{
		"name"	: "Cluster Bright.mp3",
		"speed"	: 60,
		"color"	: ["#00bf1f", "#0018a3"],
		"amp"	: 20.0,
		"accel" : 0.018
	},
	{
		"name"	: "Cluster Crescendo.mp3",
		"speed"	: 60,
		"color"	: ["#0026ff", "#ffb834"],
		"amp"	: 20.0,
		"accel" : 0.018
	},
	{
		"name"	: "Cluster Mid.mp3",
		"speed"	: 60,
		"color"	: ["#ffa180", "#f1f1f2"],
		"amp"	: 30.0,
		"accel" : 0.020
	},
	{
		"name"	: "Cluster Pulse.mp3",
		"speed"	: 60,
		"color"	: ["#ffa180", "#a6a8ab"],
		"amp"	: 30.0,
		"accel" : 0.020
	},
	{
		"name"	: "Harmonic Chain 1.mp3",
		"speed"	: 60,
		"color"	: ["#ffa180", "#6d6e70"],
		"amp"	: 10.0,
		"accel" : 0.008
	},
	{
		"name"	: "Harmonic Chain 2.mp3",
		"speed"	: 60,
		"color"	: ["#ffa180", "#404041"],
		"amp"	: 15.0,
		"accel" : 0.008
	},
	{
		"name" 	: "Loud Noise.mp3",
		"speed" : 60,
		"color"	: ["#ffa180", "#0018a3"],
		"amp"	: 20.0,
		"accel" : 0.020 
	},
	{
		"name"	: "Pizzicato 60 a.mp3",
		"speed"	: 60,
		"color"	: ["#f1f1f2", "#800036"],
		"amp"	: 25.0,
		"accel" : 0.018
	},
	{
		"name"	: "Pizzicato 60 b.mp3",
		"speed"	: 60,
		"color"	: ["#f1f1f2", "#ff4200"],
		"amp"	: 25.0,
		"accel" : 0.018
	},
	{
		"name"	: "Pizzicato 60 c.mp3",
		"speed"	: 60,
		"color"	: ["#bf0051", "#ac7c23"],
		"amp"	: 25.0,
		"accel" : 0.018
	},
	{
		"name"	: "PPPP.mp3",
		"speed"	: 60,
		"color"	: ["#6d6e70", "#008015"],
		"amp"	: 20.0,
		"accel" : 0.006
	},
	{
		"name"	: "PPPP 2.mp3",
		"speed"	: 60,
		"color"	: ["#6d6e70", "#00bf1f"],
		"amp"	: 20.0,
		"accel" : 0.006
	},
	{
		"name"	: "PPPP Portamento 1.mp3",
		"speed"	: 60,
		"color"	: ["#6d6e70", "#00ffd3"],
		"amp"	: 25.0,
		"accel" : 0.010
	},
	{
		"name"	: "PPPP Portamento 2.mp3",
		"speed"	: 60,
		"color"	: ["#6d6e70", "#bf3100"],
		"amp"	: 25.0,
		"accel" : 0.010

	},
	{
		"name"	: "Quiet Noise.mp3",
		"speed"	: 60,
		"color"	: ["#404041", "#ff4200"],
		"amp"	: 25.0,
		"accel" : 0.010
	},
	{
		"name"	: "Romantik 1.mp3",
		"speed"	: 60,
		"color"	: ["#bf3100", "#0018a3"],
		"amp"	: 25.0,
		"accel" : 0.020
	},
	{
		"name"	: "Romantik 2.mp3",
		"speed"	: 60,
		"color"	: ["#bf3100", "#008015"],
		"amp"	: 25.0,
		"accel" : 0.020
	},
	{
		"name"	: "Romantik 3.mp3",
		"speed"	: 60,
		"color"	: ["#bf3100", "#ffa180"],
		"amp"	: 25.0,
		"accel" : 0.020
	},
	{
		"name"	: "Runa 1.mp3",
		"speed"	: 60,
		"color"	: ["#0018a3", "#ac7c23"],
		"amp"	: 20.0,
		"accel" : 0.010
	},
	{
		"name"	: "Runa 2.mp3",
		"speed"	: 60,
		"color"	: ["#0018a3", "#2bcdff"],
		"amp"	: 20.0,
		"accel" : 0.010
	},
	{
		"name"	: "Runa 3.mp3",
		"speed"	: 60,
		"color"	: ["#0018a3", "#f1f1f2"],
		"amp"	: 20.0,
		"accel" : 0.010
	},
	{
		"name"	: "Wave 1.mp3",
		"speed"	: 60,
		"color"	: ["#805300", "#ffb834"],
		"amp"	: 15.0,
		"accel" : 0.015
	},
	{
		"name"	: "Wave 2.mp3",
		"speed"	: 60,
		"color"	: ["#805300", "#590026"],
		"amp"	: 15.0,
		"accel" : 0.015
	},
	{
		"name"	: "Wave 3.mp3",
		"speed"	: 60,
		"color"	: ["#805300", "#bf3100"],
		"amp"	: 15.0,
		"accel" : 0.015
	},
/* 90 BPM */
	{	
		"name" 	: "Harmonic tremolo gliss.mp3",
		"speed" : 90,
		"color"	: ["#00c3a1", "#ffa180"],
		"amp"	: 20.0,
		"accel" : 0.020  
	},
	{
		"name" 	: "Pizzicato 1.mp3",
		"speed" : 90,
		"color"	: ["#2bcdff", "#ffb834"],
		"amp"	: 25.0,
		"accel" : 0.020 
	},
	{		
		"name" 	: "Pizzicato 2.mp3",
		"speed" : 90,
		"color"	: ["#2bcdff", "#00ffd3"],
		"amp"	: 25.0,
		"accel" : 0.020 
	},
	{		
		"name" 	: "Pump.mp3",
		"speed" : 90,
		"color"	: ["#008870", "#ff4200"],
		"amp"	: 30.0,
		"accel" : 0.018 
	},
	{		
		"name" 	: "Ricochet 1.mp3",
		"speed" : 90,
		"color"	: ["#a6a8ab", "#00ffd3"],
		"amp"	: 35.0,
		"accel" : 0.022 
	},
	{		
		"name" 	: "Ricochet 2.mp3",
		"speed" : 90,
		"color"	: ["#a6a8ab", "#ffb834"],
		"amp"	: 35.0,
		"accel" : 0.022
	},
	{		
		"name" 	: "Ricochet 3.mp3",
		"speed" : 90,
		"color"	: ["#a6a8ab", "#ffa180"],
		"amp"	: 35.0,
		"accel" : 0.022
	},
	{		
		"name" 	: "Ricochet 4.mp3",
		"speed" : 90,
		"color"	: ["#a6a8ab", "#ac7c23"],
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
		if(files[index].color) return files[index].color;
		console.log("Warning: Color index out of bounds.");
		return "#FF0000";
	}
  
	return {
		colorForName : _colorForName,
		colorsForIndex: _colorsForIndex
	};
})();