/* 
 * Copyright (c) 2017 Ryan Cardenas
 */

function GraphicsPlatform(){
	this.canvas = document.getElementById(CANVASNAME);
	var ctx = this.canvas.getContext('2d');
	
	this.objtype = 'graphicsplatform';
	this.children = []; //Stores array of all graphics objects
	
	this.Update = function(){
		ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		for(var i = 0; i < this.children.length; i++){
			this.children[i].Draw();
		}
	}

}


/*  Takes an array of Point objects as defined in pmath.js and
	makes a path of lines using these points.	*/
function Path(pts){
	var canvas = document.getElementById(CANVASNAME);
	var ctx = canvas.getContext('2d');
	
	this.objtype = 'path';
	this.pts = [];

	if('undefined' !== typeof(pts)){
		this.pts[0] = pts[0];
	}
	else{ 
		this.pts[0] = new Point(0,0);
	}
		
	this.AddTo = function(parent){
		parent.children.push(this);
	}
		
	this.Draw = function(){
		ctx.beginPath();
		ctx.moveTo(this.pts[0].x,this.pts[0].y);
		for(var i = 0; i < this.pts.length; i++){
			ctx.lineTo(this.pts[i].x,this.pts[i].y);
		}
				
		ctx.stroke();
	}

}


function Img(id, x, y, width, height){
    var canvas = document.getElementById(CANVASNAME);
	var ctx = canvas.getContext('2d');
        var img = document.getElementById("cball");

	this.objtype = 'circle';
	this.x = x;
	this.y = y;
        
        this.AddTo = function(parent){
		parent.children.push(this);
	}
		
        this.Draw = function(){       
            ctx.drawImage(img,this.x,this.y,width, height)
        }
}


function Circle(x, y, r, style, alpha){
	var canvas = document.getElementById(CANVASNAME);
	var ctx = canvas.getContext('2d');

	this.objtype = 'circle';
	this.x = x;
	this.y = y;
	this.r = r;
	this.fillstyle = style || '#000000';
	this.alpha = alpha || 1;
	this.strokestyle = '#000000';
		
	this.AddTo = function(parent){
		parent.children.push(this);
	}
		
	this.Draw = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);		
		ctx.closePath();
		ctx.globalAlpha = this.alpha;
		ctx.strokeStyle = this.strokestyle
		ctx.fillStyle = this.fillstyle;
		ctx.stroke();
		ctx.fill();
        }

}


function Rect(x1, y1, w, h, style, alpha){
	var canvas = document.getElementById(CANVASNAME);
	var ctx = canvas.getContext('2d');

	this.objtype = 'circle';
	this.x1 = x1;
	this.y1 = y1;
	this.w = w;
	this.h = h;
	this.fillstyle = style || '#000000';
	this.alpha = alpha || 1;
	this.strokestyle = '#000000';
		
	this.AddTo = function(parent){
		parent.children.push(this);
	}
		
	this.Draw = function(){
		ctx.beginPath();
		ctx.rect(x,y,w,h);	
		ctx.closePath();
		ctx.globalAlpha = this.alpha;
		ctx.strokeStyle = this.strokestyle
		ctx.fillStyle = this.fillstyle;
		ctx.stroke();
		ctx.fill();
	}

}


function Text(text, x, y, size){
	var canvas = document.getElementById(CANVASNAME);
	var ctx = canvas.getContext('2d');
	
	this.objtype = 'text';
	this.x = x;
	this.y = y;
	this.text = text;
	this.font = '14 px Georgia';
	this.fillstyle = '#000000';
	this.strokestyle = '#000000';
/*		this.align = '';
		this.baseline = '';
		this.fill = '';
		this.maxwidth = '';
*/		
	this.AddTo = function(parent){
		parent.children.push(this);
	}

	this.Draw = function(){
		ctx.font = this.font;
		ctx.strokeStyle = this.strokestyle;
		ctx.fillText(this.text,this.x,this.y);
	}
	
}

