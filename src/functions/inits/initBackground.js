import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../data/variables';

import Star from '../../classes/Star';

export const initBackground = (starsRef) => {
	let stars = [];

	for (let i = 0; i < 100; i++) {
		const star = new Star(
			Math.floor(Math.random() * CANVAS_WIDTH - 10) + 5,
			Math.floor(Math.random() * CANVAS_HEIGHT - 10) + 5,
			1,
			Math.floor(Math.random() * 8 + 2) / 8
		);

		stars.push(star);
	}

	starsRef.current = stars;
};
