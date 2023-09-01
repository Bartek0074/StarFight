import { CANVAS_HEIGHT } from '../data/variables';
export default class Star {
	constructor(x, y, radius, color, alpha) {
		this.position = {
			x: x,
			y: y,
		};

		this.radius = radius;

		this.color = color;
		this.alpha = alpha;

		const rgbValues = color.match(/\d+/g);

		const R = parseInt(rgbValues[0]);
		const G = parseInt(rgbValues[1]);
		const B = parseInt(rgbValues[2]);

		this.colorAlpha = `rgba(${R}, ${G}, ${B}, ${alpha})`;

		this.velocity = (this.alpha * Math.floor(Math.random() * 10 + 2)) / 20;

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
			ctx.fillStyle = this.colorAlpha;
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
