import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../data/variables';

import Missile from '../../classes/Missile';

import { laserShotOneSound } from '../soundEffects/laserShotOneSound';

import { SPACESHIP_WIDTH } from '../../data/variables';

export const shoot = (playerPosition, missilesRef, type = 'single_shot') => {
	if (type === 'single_shot') {
		laserShotOneSound();
	}

	let newMissiles = [...missilesRef.current].filter(
		(missile) =>
			missile.position.y > 0 &&
			missile.position.y < CANVAS_HEIGHT &&
			missile.position.x > 0 &&
			missile.position.x < CANVAS_WIDTH
	);

	const missileWidth = 4;
	const missileHeight = 6;
	const missileVelocityY = -5;
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
