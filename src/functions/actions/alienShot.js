import { ALIEN_SHOT_CHANCE } from '../../data/variables';

import { alienShotSound } from '../soundEffects/alienShotSound';

import Missile from '../../classes/Missile';

export const alienShot = (aliensRef, missilesRef) => {
	aliensRef.current.forEach((alien) => {
		const drawnChance = Math.random();

		if (drawnChance < ALIEN_SHOT_CHANCE) {
			alienShotSound()

			const missileX = alien.position.x + alien.width / 2;
			const missileY = alien.position.y + alien.height;

			const colors = alien.colors;

			const randomColorsIndex = Math.floor(Math.random() * colors.length);

			const missileRadius = 2;
			const missileVelocityY = Math.random() + 4;
			const missileVelocityX = Math.random() * 0.5 - 0.25;
			const missileDamage = 10;
			const missileColor = `${colors[randomColorsIndex]}`;

			missilesRef.current.push(
				new Missile(
					'alien',
					missileX,
					missileY,
					missileRadius,
					missileVelocityX,
					missileVelocityY,
					missileDamage,
					missileColor
				)
			);
		}
	});
};
