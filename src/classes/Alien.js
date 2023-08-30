import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	ALIEN_WIDTH,
	ALIEN_HEIGHT,
} from '../data/variables';

export default class Alien {
	constructor(x, y) {
		this.position = {
			x: x,
			y: y,
		};

		this.width = ALIEN_WIDTH;
		this.height = ALIEN_HEIGHT;

		this.velocity = { x: 0, y: 0 };

		this.rotation = 0;

		this.draw = function (ctx, image) {
			if (image) {
				ctx.save();

				ctx.translate(
					this.position.x + this.width / 2,
					this.position.y + this.height / 2
				);

				ctx.rotate(this.rotation);

				ctx.translate(
					-this.position.x - this.width / 2,
					-this.position.y - this.height / 2
				);

				ctx.drawImage(
					image,
					this.position.x,
					this.position.y,
					this.width,
					this.height
				);

				ctx.restore();
			} else {
				ctx.beginPath();
				ctx.rect(this.position.x, this.position.y, this.width, this.height);
				ctx.fillStyle = 'red';
				ctx.fill();
				ctx.closePath();
			}
		};

		this.update = function (ctx, image) {
			this.draw(ctx, image);

			if (
				this.position.x + this.velocity.x >= 0 &&
				this.position.x + this.width + this.velocity.x < CANVAS_WIDTH
			) {
				this.position.x += this.velocity.x;
			}
		};
	}
}
