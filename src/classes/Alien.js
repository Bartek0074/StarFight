import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../data/variables';
import froggy from '../images/froggy.png';
import froggy_boss from '../images/froggy_boss.png';

export default class Alien {
	constructor(
		type,
		colors,
		hitpoints,
		mode,
		x,
		y,
		width,
		height,
		velocityX,
		velocityY,
		angle,
		freeFlyingVelocity
	) {
		this.type = type;
		this.colors = colors;
		this.hitpoints = hitpoints;
		this.mode = mode;
		this.position = {
			x: x,
			y: y,
		};
		this.velocity = { x: velocityX, y: velocityY };
		this.angle = angle;
		this.freeFlyingVelocity = freeFlyingVelocity;

		this.maxHitpoints = hitpoints;

		this.width = width;
		this.height = height;

		this.bottomBorderFreeFlying = this.type.includes('boss')
			? 250
			: CANVAS_HEIGHT - 150;

		this.img = new Image();

		this.healthBarHeight = 2.5;
		this.healthBarTopMargin = 8;

		if (this.type.includes('boss')) {
			this.healthBarHeight = 4;
			this.healthBarTopMargin = 12;
		}

		if (this.type === 'froggy') {
			this.img.src = froggy;
		} else if (this.type === 'froggy_boss') {
			this.img.src = froggy_boss;
		}

		this.draw = function (ctx) {
			if (this.img) {
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
					this.img,
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
			const healthBarY = this.position.y - this.healthBarTopMargin; // Położenie paska życia nad alienem
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
				this.healthBarHeight
			);
		};

		this.update = function (ctx) {
			this.draw(ctx);

			if (this.mode === 'free_flying') {
				this.velocity.x =
					this.freeFlyingVelocity * Math.cos((this.angle * Math.PI) / 180);
				this.velocity.y =
					this.freeFlyingVelocity * Math.sin((this.angle * Math.PI) / 180);
				if (
					this.position.x + this.velocity.x < 10 ||
					this.position.x + this.width + this.velocity.x > CANVAS_WIDTH - 10
				) {
					const radians = Math.atan2(this.velocity.y, -this.velocity.x);

					const newAngle = (radians * 180) / Math.PI;

					this.angle = newAngle;
				} else if (
					this.position.y + this.velocity.y < 10 ||
					this.position.y + this.height + this.velocity.y >
						this.bottomBorderFreeFlying
				) {
					const radians = Math.atan2(-this.velocity.y, this.velocity.x);

					const newAngle = (radians * 180) / Math.PI;

					this.angle = newAngle;
				}
			} else if (this.mode === 'flying_through_borders') {
				if (this.position.x + this.width + this.velocity.x < 0) {
					this.position.x = CANVAS_WIDTH;
				} else if (this.position.x + this.velocity.x > CANVAS_WIDTH) {
					this.position.x = -this.width;
				}
			}

			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
		};
	}
}
