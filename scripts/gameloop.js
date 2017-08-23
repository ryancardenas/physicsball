/* 
 * Copyright (c) 2017 Ryan Cardenas
 */

function Init(){
	var game = new GraphicsPlatform();
	var timer1 = new Stopwatch();
        var xmax = game.canvas.width;
        var ymax = game.canvas.height;
	
	timer1.Start();
			
	var txt1 = new Text('',5,20,14);
	var txt2 = new Text('',5,40);
	var txt3 = new Text('',5,60);
	var circ = new Img('cball',0,0,20,20);

	txt1.AddTo(game);
	txt2.AddTo(game);
	txt3.AddTo(game);
	circ.AddTo(game);

	AddKBody(circ,120);
	circ.IsBound(0,xmax,0,ymax);
	circ.velx = 200;
	circ.mass = 1;
	circ.TracePath(game,500);
		
	StartGame();

	function StartGame(){
		var canvas = document.getElementById(CANVASNAME);
		var Animate = window.requestAnimationFrame 	 ||
			window.webkitRequestAnimationFrame 		 ||
			window.mozRequestAnimationFrame    		 ||
			window.oRequestAnimationFrame      		 ||
			window.msRequestAnimationFrame     		 ||
			null;
	
		//  If some form of 'requestAnimationFrame' is available, it is used for
		//	animation control.
		if (Animate !== null){
			var recursiveAnimate = function(){
				Gameloop();
				Animate(recursiveAnimate, canvas);
			}
				recursiveAnimate();
		}
		else {
			//Defaults to 'setInterval' animation control
			var FRAME_TIME_MS = 1000.0 / 60.0 ; //Frame time in MS
			setInterval(Gameloop, FRAME_TIME_MS);
		}
	}	
	
	
	function Gameloop(){
		var dt = 0.01; //0.001 to 0.01 works well.
		var accumulator = 0.0;
		var g = 9.8;
		
		
		var test = timer1.Delta();
		accumulator += test;
		
		while(accumulator >= dt){
			circ.KMove(0,g,dt);
			accumulator -= dt;
		}		

		txt1.text = "Parabolic Trajectory: A simulation of the path of a bouncing ball."//Round(circ.ke,5).toString();
		//txt2.text = Round(test,5).toString();
		//txt3.text = Round(0,5).toString();
				
		game.Update();
	}
}
