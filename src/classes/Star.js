import { CANVAS_HEIGHT } from '../data/variables';
export default class Star {
	constructor(x, y, radius, velocity) {
		this.position = {
			x: x,
			y: y,
		};

		this.velocity = velocity;

		this.radius = radius;

		this.draw = function (ctx) {
			ctx.beginPath();
			ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
			ctx.fillStyle = '#FCFFE755';
			ctx.fill();
			ctx.closePath();
		};

		this.update = function (ctx) {
			this.draw(ctx);
			if (this.position.y > CANVAS_HEIGHT + 10) {
				this.position.y = -10;
			}

			this.position.y += this.velocity;
		};
	}
}
