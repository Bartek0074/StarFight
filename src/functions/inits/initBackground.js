import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../data/variables';

import Star from '../../classes/Star';

export const initBackground = (starsRef) => {
	let stars = [];

	const colors = [
		'rgb(240, 235, 141)',
		'rgb(53, 162, 159)',
		'rgb(210, 51, 105)',
		'rgb(238, 238, 238)',
	];

	for (let i = 0; i < 125; i++) {
		const randomColorsIndex = Math.floor(Math.random() * colors.length);

		const color = `${colors[randomColorsIndex]}`;

		const alpha = (Math.random() * (0.9 - 0.2) + 0.2).toFixed(3);
		console.log(alpha);

		const star = new Star(
			Math.floor(Math.random() * CANVAS_WIDTH - 10) + 5,
			Math.floor(Math.random() * CANVAS_HEIGHT - 10) + 5,
			1,
			color,
			alpha
		);

		stars.push(star);
	}

	starsRef.current = stars;
};
