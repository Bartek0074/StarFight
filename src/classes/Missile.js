export default class Missile {
	constructor(from, x, y, radius, dx, dy, color) {
		this.from = from;

		this.position = {
			x: x,
			y: y,
		};

		this.velocity = { x: dx, y: dy };

		this.radius = radius;

		this.color = color;

		const rgbValues = color.match(/\d+/g);

		const R = parseInt(rgbValues[0]);
		const G = parseInt(rgbValues[1]);
		const B = parseInt(rgbValues[2]);

		// Dodaj historię położenia pocisku
		this.history = [];

		this.draw = function (ctx) {
			for (let i = 0; i < this.history.length; i++) {
				const alpha = 0.2 * i + 0.1;

				const pos = this.history[i];
				ctx.beginPath();
				ctx.arc(pos.x, pos.y, this.radius, 0, 2 * Math.PI, false);
				ctx.fillStyle = `rgba(${R}, ${G}, ${B}, ${alpha})`;
				ctx.fill();
				ctx.closePath();
			}

			// Rysuj pocisk
			ctx.beginPath();
			ctx.arc(
				this.position.x,
				this.position.y,
				this.radius, // Dla pocisku
				0,
				2 * Math.PI,
				false
			);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		};

		this.update = function (ctx) {
			// Dodaj obecne położenie do historii
			this.history.push({ x: this.position.x, y: this.position.y });

			// Ogranicz historię do określonej liczby punktów, aby uniknąć nadmiernego zużycia pamięci
			if (this.history.length > 5) {
				this.history.shift();
			}

			this.draw(ctx);

			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
		};
	}
}
