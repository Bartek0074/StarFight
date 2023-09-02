import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	ALIEN_WIDTH,
	ALIEN_HEIGHT,
} from '../data/variables';

export default class Alien {
	constructor(
		x,
		y,
		velocityX,
		velocityY,
		angle,
		velocityAngle,
		hitpoints,
		colors,
		mode
	) {
		this.position = {
			x: x,
			y: y,
		};

		this.width = ALIEN_WIDTH;
		this.height = ALIEN_HEIGHT;

		this.velocity = { x: velocityX, y: velocityY };

		this.rotation = 0;

		this.hitpoints = hitpoints;
		this.maxHitpoints = hitpoints;

		this.colors = colors;

		this.mode = mode;

		this.angle = angle;

		this.velocityAngle = velocityAngle;

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

			if (this.mode === 'free_flying') {
				this.velocity.x =
					this.velocityAngle * Math.cos((this.angle * Math.PI) / 180);
				this.velocity.y =
					this.velocityAngle * Math.sin((this.angle * Math.PI) / 180);
				if (
					this.position.x + this.velocity.x < 10 ||
					this.position.x + this.width + this.velocity.x > CANVAS_WIDTH - 10
				) {
					const radians = Math.atan2(this.velocity.y, -this.velocity.x);

					const newAngle = (radians * 180) / Math.PI;

					this.angle = newAngle;
				}
				if (
					this.position.y + this.velocity.y < 10 ||
					this.position.y + this.height + this.velocity.y > CANVAS_WIDTH - 150
				) {
					const radians = Math.atan2(-this.velocity.y, this.velocity.x);

					const newAngle = (radians * 180) / Math.PI;

					this.angle = newAngle;
				}
			}

			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
		};
	}
}
