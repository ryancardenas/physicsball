/* 
 * Copyright (c) 2017 Ryan Cardenas
 */

function AddKBody(obj, ref){

	for(i = 0; i < arguments.length; i++){
		arguments[i].isKbody = true;
		arguments[i].isBound = false;
		arguments[i].isPathTracing = false;
		arguments[i].mass = 0.0;
		arguments[i].ref = ref;  //Reference position: ground.
		arguments[i].posx = arguments[i].x;
		arguments[i].posy = arguments[i].ref - arguments[i].y;
		arguments[i].velx = 0.0;
		arguments[i].vely = 0.0;
		arguments[i].accx = 0.0;
		arguments[i].accy = 0.0;
		arguments[i].ke = 0.0;
		arguments[i].pe = 0.0;
		
		arguments[i].IsBound = function(xmin, xmax, ymin, ymax){
			this.isBound = true;
			this.xmin = xmin;
			this.xmax = xmax;
			this.ymin = ymin;
			this.ymax = ymax;
		}
		
		arguments[i].TracePath = function(game, pathsize){
			this.isPathTracing = true;
			
			if(('undefined' !== typeof(pathsize)) || (pathsize > 0)){
				this.pathsize = pathsize;
			}
			else{
				this.pathsize = -1;
			}
			var pts = [];
			pts[0] = new Point(this.x,this.y)
			this.path = new Path(pts);
			this.path.AddTo(game);
		}
		
		// Uses RK4 method with constant acceleration over interval dt
		// to calculate trajectory of KBody.
		arguments[i].KMove = function(ax, ay, dt){
			ax /= dt;
			ay /= dt;
			
			var x1 = this.x, y1 = this.y, vx1 = this.velx, vy1 = this.vely;
			
			var x2 = x1 + 0.5*vx1*dt, y2 = y1 + 0.5*vy1*dt;
			var vx2 = vx1 + 0.5*ax*dt, vy2 = vy1 + 0.5*ay*dt;
			
			var x3 = x1 + 0.5*vx2*dt, y3 = y1 + 0.5*vy2*dt;
			var vx3 = vx1 + 0.5*ax*dt, vy3 = vy1 + 0.5*ay*dt;
			
			var x4 = x1 + vx3*dt, y4 = y1 + vy3*dt;
			var vx4 = vx1 + ax*dt, vy4 = vy1 + ay*dt;

			this.x = x1 + (dt/6)*(vx1 + 2*(vx2 + vx3) + vx4);
			this.y = y1 + (dt/6)*(vy1 + 2*(vy2 + vy3) + vy4);
			this.velx += ax * dt;
			this.vely += ay * dt;
			this.accx = ax;
			this.accy = ay;
			this.posx = this.x;
			this.posy = this.ref - this.y;
			
			this.ke = 0.5 * this.mass * (this.velx * this.velx + this.vely * this.vely);
			this.pe = this.mass * (ax * this.x + ay * this.y);

			if(this.isBound){
			//------> Consider putting in a position reset for objects that
			//------> go past the boundary.
				if((this.vely > 0)&&(this.y > this.ymax)){
					this.vely *= -1;
				}
			 	if((this.vely < 0)&&(this.y < this.ymin)){
			  		this.vely *= -1;
				}
				if((this.velx > 0)&&(this.x > this.xmax)){
					this.velx *= -1;
				}
		  		if((this.velx < 0)&&(this.x < this.xmin)) {
					this.velx *= -1;
				}
			}
			
			if(this.isPathTracing){
				var nextpoint = new Point(this.x,this.y);
				if((this.path.pts.length >= this.pathsize) && (this.pathsize != -1)){
					this.path.pts.shift();
				}
				this.path.pts.push(nextpoint);
			}

		}
	}
}




