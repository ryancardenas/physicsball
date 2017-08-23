/* 
 * Copyright (c) 2017 Ryan Cardenas
 */

/* Returns the browser-accepted version of "window.performance.now();" */
function now(){
    var performance = window.performance || {};
    performance.now = (function() {
        return performance.now    ||
        performance.webkitNow     ||
        performance.msNow         ||
        performance.oNow          ||
        performance.mozNow        ||
        function() { return new Date().getTime(); };
    })();
    return performance.now();
}

/* Stopwatch object. The .Start() method records the first time in two
   variables: 'this.start' and 'this.marker'. 
*/
function Stopwatch(){
	this.objtype = 'stopwatch';
	this.deltamax = 200;
	this.Start = function(){
		this.start = now();
		this.lap1 = this.start; //Used for first calculation of 'this.delta'
	}
		
	this.Stop = function(){
		this.stop = now();
		this.runtime = this.stop- this.start;
	}
		
	this.Delta = function(){
		this.lap2 = now();
		this.delta = this.lap2 - this.lap1;
		if(this.delta > this.deltamax) this.delta = this.deltamax;
		this.lap1 = this.lap2;
		return this.delta/1000;
	}
}


