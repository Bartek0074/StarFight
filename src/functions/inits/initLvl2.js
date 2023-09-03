import { CANVAS_WIDTH } from '../../data/variables';

import Alien from '../../classes/Alien';

export const initLvl2 = (aliensRef) => {
	let newAliens = [];

	const boss_type = 'froggy_boss';
	const boss_colors = ['rgb(211, 208, 79)', 'rgb(23, 89, 74)'];
	const boss_hitpoints = 250;
	const boss_mode = 'flyingIn';
	const boss_x = 310 + Math.random() * 20 - 10;
	const boss_y = -200;
	const boss_width = 80;
	const boss_height = 80;
	const boss_velocityX = Math.random() * 0.4 - 0.2;
	const boss_velocityY = 1;
	const boss_angle = 90;
	const boss_freeFlyingVelocity = 1;

	const alien_type = 'froggy';
	const alien_colors = ['rgb(211, 208, 79)', 'rgb(23, 89, 74)'];
	const alien_hitpoints = 20;
	const alien_mode = 'flying_in';
	const alien_y1 = 270;
	const alien_y2 = 330;
	const alien_width = 40;
	const alien_height = 40;
	const alien_velocityX1 = 2;
	const alien_velocityX2 = -2;
	const alien_velocityY = 0;
	const alien_angle = null;
	const alien_freeFlyingVelocity = null;

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

	for (let i = 0; i < 12; i++) {
		const alien_x1 = i * 61.75 - CANVAS_WIDTH - 138;
		newAliens.push(
			new Alien(
				alien_type,
				alien_colors,
				alien_hitpoints,
				alien_mode,
				alien_x1,
				alien_y1,
				alien_width,
				alien_height,
				alien_velocityX1,
				alien_velocityY,
				alien_angle,
				alien_freeFlyingVelocity
			)
		);
	}
	for (let i = 0; i < 12; i++) {
		const alien_x1 = i * 61.75 + CANVAS_WIDTH + 138;
		newAliens.push(
			new Alien(
				alien_type,
				alien_colors,
				alien_hitpoints,
				alien_mode,
				alien_x1,
				alien_y2,
				alien_width,
				alien_height,
				alien_velocityX2,
				alien_velocityY,
				alien_angle,
				alien_freeFlyingVelocity
			)
		);
	}

	aliensRef.current = newAliens;
};
