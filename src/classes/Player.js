import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	SPACESHIP_WIDTH,
	SPACESHIP_HEIGHT,
} from '../data/variables';

export default class Player {
	constructor() {
		this.position = {
			x: CANVAS_WIDTH / 2 - SPACESHIP_WIDTH / 2,
			y: CANVAS_HEIGHT - SPACESHIP_HEIGHT - 10,
		};

		this.width = SPACESHIP_WIDTH;
		this.height = SPACESHIP_HEIGHT;

		this.velocity = { x: 0, y: 0 };

		this.rotation = 0;

		const image = new Image();

		image.src = '../images/spaceship';

		image.onload = () => {
			this.image = image;
		};

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

		this.shoot = function () {
			console.log('shot');
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
