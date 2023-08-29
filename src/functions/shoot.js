import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../data/variables';

import Missile from '../classes/Missile';

import music from '../sounds/laser_shot_1.mp3';

import { SPACESHIP_WIDTH } from '../data/variables';

export const shoot = (playerPosition, missilesRef, type = 'single_shot') => {
	let audio;

	if (type === 'single_shot') {
		audio = new Audio(music);
	}

	audio.play();

	let newMissiles = [...missilesRef.current].filter(
		(missile) =>
			missile.position.y > 0 &&
			missile.position.y < CANVAS_HEIGHT &&
			missile.position.x > 0 &&
			missile.position.x < CANVAS_WIDTH
	);

	const missileWidth = 4;
	const missileHeight = 6;
	const missileVelocityY = 5;
	const missileVelocityX = 0;

	newMissiles.push(
		new Missile(
			'player',
			playerPosition.x + SPACESHIP_WIDTH / 2 - missileWidth / 2,
			playerPosition.y,
			missileWidth,
			missileHeight,
			missileVelocityX,
			missileVelocityY
		)
	);

	missilesRef.current = newMissiles;
};
