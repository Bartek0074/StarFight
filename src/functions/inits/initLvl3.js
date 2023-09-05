import { CANVAS_WIDTH } from '../../data/variables';

import Alien from '../../classes/Alien';

export const initLvl3 = (aliensRef) => {
	let newAliens = [];

	const boss_type = 'froggy_boss';
	const boss_colors = ['rgb(211, 208, 79)', 'rgb(23, 89, 74)'];
	const boss_hitpoints = 250;
	const boss_mode = 'flyingIn';
	const boss_y = -75;
	const boss_width = 80;
	const boss_height = 80;
	const boss_velocityY = 1;
	const boss_angle = 90;
	const boss_freeFlyingVelocity = 1;

	const alien_type = 'froggy';
	const alien_colors = ['rgb(211, 208, 79)', 'rgb(23, 89, 74)'];
	const alien_hitpoints = 20;
	const alien_mode = 'flying_in';
	const alien_y = -75;
	const alien_width = 40;
	const alien_height = 40;
	const alien_velocityX = 0;
	const alien_velocityY = 1;
	const alien_angle = 90;
	const alien_freeFlyingVelocity = 1;

	for (let i = 0; i < 10; i++) {
		const alien_x = 60 + i * 60;
		newAliens.push(
			new Alien(
				alien_type,
				alien_colors,
				alien_hitpoints,
				alien_mode,
				alien_x,
				alien_y,
				alien_width,
				alien_height,
				alien_velocityX,
				alien_velocityY,
				alien_angle,
				alien_freeFlyingVelocity
			)
		);
	}
	for (let i = 0; i < 3; i++) {
		setTimeout(() => {
			for (let i = 0; i < 10; i++) {
				const alien_x = 60 + i * 60;
				newAliens.push(
					new Alien(
						alien_type,
						alien_colors,
						alien_hitpoints,
						alien_mode,
						alien_x,
						alien_y,
						alien_width,
						alien_height,
						alien_velocityX,
						alien_velocityY,
						alien_angle,
						alien_freeFlyingVelocity
					)
				);
			}
		}, (i + 1) * 4000);
	}
	setTimeout(() => {
		for (let i = 0; i < 3; i++) {
			const boss_x = 310 + (i - 1) * 200;
			const boss_velocityX = Math.random() * 0.2 - 0.1;

			newAliens.push(
				new Alien(
					boss_type,
					boss_colors,
					boss_hitpoints,
					boss_mode,
					boss_x,
					boss_y,
					boss_width,
					boss_height,
					boss_velocityX,
					boss_velocityY,
					boss_angle,
					boss_freeFlyingVelocity
				)
			);
		}
	},  16000);

	aliensRef.current = newAliens;
};
