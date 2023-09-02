import { SPACESHIP_WIDTH } from '../../data/variables';

import Missile from '../../classes/Missile';

import { laserShotOneSound } from '../soundEffects/laserShotOneSound';

export const shoot = (playerPosition, missilesRef, type = 'single_shot') => {
	if (type === 'single_shot') {
		laserShotOneSound();
	}

	const missileRadius = 2;
	const missileVelocityY = -4;
	const missileVelocityX = 0;
	const missileDamage = 10;
	const missileColor = 'rgb(243, 36, 36)';

	missilesRef.current.push(
		new Missile(
			'player',
			playerPosition.x + SPACESHIP_WIDTH / 2 - missileRadius / 2,
			playerPosition.y,
			missileRadius,
			missileVelocityX,
			missileVelocityY,
			missileDamage,
			missileColor
		)
	);
};
