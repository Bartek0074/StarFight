export default class Missile {
	constructor(from, x, y, width, height, dx, dy) {
		this.from = from;

		this.position = {
			x: x,
			y: y,
		};

		this.velocity = { x: dx, y: dy };

		this.width = width;
		this.height = height;

		this.draw = function (ctx) {
			ctx.beginPath();
			ctx.rect(this.position.x, this.position.y, this.width, this.height);
			ctx.fillStyle = '#F45050';
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
