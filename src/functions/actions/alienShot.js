import { ALIEN_SHOT_CHANCE, BOSS_SHOT_CHANCE } from '../../data/variables';

import { alienShotSound } from '../soundEffects/alienShotSound';
import { bossSeveralShotSound } from '../soundEffects/bossSeveralShotSound';

import Missile from '../../classes/Missile';

export const alienShot = (aliensRef, missilesRef) => {
	aliensRef.current.forEach((alien) => {
		const drawnChance = Math.random();

		if (!alien.type.includes('boss') && drawnChance < ALIEN_SHOT_CHANCE) {
			const alienMissileX = alien.position.x + alien.width / 2;
			const alienMissileY = alien.position.y + alien.height;
			const alienMissileRadius = 2;
			const alienMissileVelocityY = Math.random() + 4;
			const alienMissileVelocityX = Math.random() * 0.5 - 0.25;
			const alienMissileDamage = 10;

			const colors = alien.colors;
			const randomColorsIndex = Math.floor(Math.random() * colors.length);

			const alienMissileColor = `${colors[randomColorsIndex]}`;

			alienShotSound();

			missilesRef.current.push(
				new Missile(
					'alien',
					alienMissileX,
					alienMissileY,
					alienMissileRadius,
					alienMissileVelocityX,
					alienMissileVelocityY,
					alienMissileDamage,
					alienMissileColor
				)
			);
			return;
		}

		if (alien.type.includes('boss') && drawnChance < BOSS_SHOT_CHANCE) {
			const bossMissileX = alien.position.x + alien.width / 2;
			const bossMissileY = alien.position.y + alien.height;
			const bossMissileRadius = 2.5;
			const bossMissileVelocityY1 = Math.random() * 3 + 4;
			const bossMissileVelocityX1 = Math.random() * 2 - 1;
			const bossMissileVelocityY2 = Math.random() * 3 + 4;
			const bossMissileVelocityX2 = Math.random() * 2 - 1;
			const bossMissileVelocityY3 = Math.random() * 3 + 4;
			const bossMissileVelocityX3 = Math.random() * 2 - 1;
			const bossMissileDamage = 10;

			const colors = alien.colors;
			const randomColorsIndex = Math.floor(Math.random() * colors.length);

			const bossMissileColor = `${colors[randomColorsIndex]}`;

			const shotTypeChance = Math.random();

			if (shotTypeChance < 0.5) {
				// SINGLE SHOT
				alienShotSound();
				missilesRef.current.push(
					new Missile(
						'alien',
						bossMissileX,
						bossMissileY,
						bossMissileRadius,
						bossMissileVelocityX1,
						bossMissileVelocityY1,
						bossMissileDamage,
						bossMissileColor
					)
				);
			} else if (shotTypeChance < 0.75) {
				// DOUBLE SHOT
				alienShotSound();
				missilesRef.current.push(
					new Missile(
						'alien',
						bossMissileX - 10,
						bossMissileY,
						bossMissileRadius,
						bossMissileVelocityX1,
						bossMissileVelocityY1,
						bossMissileDamage,
						bossMissileColor
					)
				);
				missilesRef.current.push(
					new Missile(
						'alien',
						bossMissileX + 10,
						bossMissileY,
						bossMissileRadius,
						bossMissileVelocityX2,
						bossMissileVelocityY2,
						bossMissileDamage,
						bossMissileColor
					)
				);
			} else if (shotTypeChance < 0.9) {
				// TRIPLE SHOT
				alienShotSound();
				missilesRef.current.push(
					new Missile(
						'alien',
						bossMissileX - 20,
						bossMissileY,
						bossMissileRadius,
						bossMissileVelocityX1,
						bossMissileVelocityY1,
						bossMissileDamage,
						bossMissileColor
					)
				);
				missilesRef.current.push(
					new Missile(
						'alien',
						bossMissileX,
						bossMissileY,
						bossMissileRadius,
						bossMissileVelocityX2,
						bossMissileVelocityY2,
						bossMissileDamage,
						bossMissileColor
					)
				);
				missilesRef.current.push(
					new Missile(
						'alien',
						bossMissileX + 20,
						bossMissileY,
						bossMissileRadius,
						bossMissileVelocityX3,
						bossMissileVelocityY3,
						bossMissileDamage,
						bossMissileColor
					)
				);
			} else {
				// SEVERAL SHOTS
				bossSeveralShotSound();

				for (let i = 0; i < 6; i++) {
					const bossSeveralMissileX = bossMissileX + Math.random() * 30 - 15;
					const bossSeveralMissileY = bossMissileY + Math.random() * 10 - 5;
					const bossSeveralMissileRadius = Math.random() + 2;
					const bossSeveralMissileVelocityX = Math.random() * 2 - 1;
					const bossSeveralMissileVelocityY = Math.random() * 3 + 5;

					const randomMissileColorsIndex = Math.floor(
						Math.random() * colors.length
					);
					const bossSeveralMissileColor = `${colors[randomMissileColorsIndex]}`;

					setTimeout(() => {
						missilesRef.current.push(
							new Missile(
								'alien',
								bossSeveralMissileX,
								bossSeveralMissileY,
								bossSeveralMissileRadius,
								bossSeveralMissileVelocityX,
								bossSeveralMissileVelocityY,
								bossMissileDamage,
								bossSeveralMissileColor
							)
						);
					}, i * 70);
				}
			}
		}
	});
};
