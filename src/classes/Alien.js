import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	ALIEN_WIDTH,
	ALIEN_HEIGHT,
} from '../data/variables';

export default class Alien {
	constructor(x, y, hitpoints, explosionColors) {
		this.position = {
			x: x,
			y: y,
		};

		this.width = ALIEN_WIDTH;
		this.height = ALIEN_HEIGHT;

		this.velocity = { x: 0, y: 0 };

		this.rotation = 0;

		this.hitpoints = hitpoints;
		this.maxHitpoints = hitpoints;

		this.explosionColors = explosionColors;

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

			// HEALTH BAR

			const healthRatio = this.hitpoints / this.maxHitpoints;

			const healthBarWidth = this.width * healthRatio;
			const healthBarHeight = 2.5; // Szerokość paska życia
			const healthBarY = this.position.y - 8; // Położenie paska życia nad alienem
			const remainingHealthBarWidth = this.width * (1 - healthRatio);
			const healthBarX = this.position.x;

			let healthBarColor;
			if (healthRatio > 0.9) {
				healthBarColor = '#1E956C';
			} else if (healthRatio > 0.7) {
				healthBarColor = '#17B978';
			} else if (healthRatio > 0.45) {
				healthBarColor = '#B9B517';
			} else if (healthRatio > 0.2) {
				healthBarColor = '#B94917';
			} else {
				healthBarColor = '#991722';
			}

			ctx.fillStyle = healthBarColor;
			ctx.fillRect(
				healthBarX + remainingHealthBarWidth / 2,
				healthBarY,
				healthBarWidth,
				healthBarHeight
			);
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
