export default class Missile {
	constructor(from, x, y, radius, dx, dy, color = 'red') {
		this.from = from;

		this.position = {
			x: x,
			y: y,
		};

		this.velocity = { x: dx, y: dy };

		this.radius = radius;

		this.color = color;

		this.draw = function (ctx) {
			ctx.beginPath();
			ctx.arc(
				this.position.x,
				this.position.y,
				this.radius,
				0,
				2 * Math.PI,
				false
			);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		};

		this.update = function (ctx) {
			this.draw(ctx);

			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
		};
	}
}
