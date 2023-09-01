export default class Shard {
	constructor(x, y, velocity, radius, color) {
		this.x = x;
		this.y = y;
		this.velocity = velocity;
		this.radius = radius;
		this.color = color;

		this.angle = Math.random() * 360;

		this.velocityX = Math.cos(this.angle) * velocity;
		this.velocityY = Math.sin(this.angle) * velocity;

		this.alpha = 1;
		this.friction = 0.95;
		this.radiusDecrementation = 0.99;

		this.draw = function (ctx) {
			ctx.save();
			ctx.globalAlpha = this.alpha;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		};

		this.update = function (ctx) {
			this.x += this.velocityX;
			this.y += this.velocityY;

			this.alpha -= 0.005;

			this.velocity = Math.sqrt(
				Math.pow(this.velocityX, 2) + Math.pow(this.velocityY, 2)
			);

			if (this.velocity > 0.05) {
				this.velocityX *= this.friction;
				this.velocityY *= this.friction;
			}

			if (this.radius > 0) {
				this.radius *= this.radiusDecrementation;
			}

			this.draw(ctx);
		};
	}
}
