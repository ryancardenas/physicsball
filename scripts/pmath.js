/* 
 * Copyright (c) 2017 Ryan Cardenas
 */

/* Accepts two components as arguments. If third argument is defined, creates 
   a 2D polar vector. */
function Round(num,n){
	n = Math.pow(10,n);
	return Math.round(num * n)/n;
}


function Vector2D(x, y, usepolar){
	this.objtype = 'Vector2';
	
	if('undefined' !== typeof(usepolar)){
		this.x = x * Math.cos(y);
		this.y = x * Math.sin(y);		
		this.r = x;
		this.theta = y;
	}
	else{
		this.x = x || 0.0;
		this.y = y || 0.0;
		this.r = Math.sqrt(x*x+y*y);
		this.theta = Math.atan(y/x);
	}

	this.objtype = 'vector2d';

	this.xangle = this.r >= 0 ? Math.acos(this.x/this.mag) : 0;
	this.yangle = this.r >= 0 ? Math.asin(this.y/this.mag) : 0;

}


function Point(x,y){
	this.objtype = 'point';
	this.x = x;
	this.y = y;
}

