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
			const bossMissileVelocityX = Math.random() * 2 - 1;
			const bossMissileVelocityY = Math.random() * 3 + 4;
			const bossMissileDamage = 10;

			const colors = alien.colors;
			const randomColorsIndex = Math.floor(Math.random() * colors.length);

			const bossMissileColor = `${colors[randomColorsIndex]}`;

			const shotTypeChance = Math.random();

			if (shotTypeChance < 0.4) {
				// SINGLE SHOT
				alienShotSound();
				missilesRef.current.push(
					new Missile(
						'alien',
						bossMissileX,
						bossMissileY,
						bossMissileRadius,
						bossMissileVelocityX,
						bossMissileVelocityY,
						bossMissileDamage,
						bossMissileColor
					)
				);
			} else if (shotTypeChance < 0.7) {
				// DOUBLE SHOT
				alienShotSound();

				for (let i = 0; i < 2; i++) {
					const randomMissileColorsIndex = Math.floor(
						Math.random() * colors.length
					);
					const bossMultipleShotMissileColor = `${colors[randomMissileColorsIndex]}`;

					const bossMultipleShotMissileVelocityX = Math.random() * 2 - 1;
					const bossMutlipleShotMissileVelocityY = Math.random() * 3 + 4;

					missilesRef.current.push(
						new Missile(
							'alien',
							bossMissileX - 10 + i * 20,
							bossMissileY,
							bossMissileRadius,
							bossMultipleShotMissileVelocityX,
							bossMutlipleShotMissileVelocityY,
							bossMissileDamage,
							bossMultipleShotMissileColor
						)
					);
				}
			} else if (shotTypeChance < 0.85) {
				// TRIPLE SHOT
				alienShotSound();

				for (let i = 0; i < 3; i++) {
					const randomMissileColorsIndex = Math.floor(
						Math.random() * colors.length
					);
					const bossMultipleShotMissileColor = `${colors[randomMissileColorsIndex]}`;

					const bossMultipleShotMissileVelocityX = Math.random() * 2 - 1;
					const bossMutlipleShotMissileVelocityY = Math.random() * 3 + 4;

					missilesRef.current.push(
						new Missile(
							'alien',
							bossMissileX - 20 + i * 20,
							bossMissileY,
							bossMissileRadius,
							bossMultipleShotMissileVelocityX,
							bossMutlipleShotMissileVelocityY,
							bossMissileDamage,
							bossMultipleShotMissileColor
						)
					);
				}
			} else {
				// SEVERAL SHOTS
				bossSeveralShotSound();

				for (let i = 0; i < 6; i++) {
					const bossSeveralMissileX = bossMissileX + Math.random() * 30 - 15;
					const bossSeveralMissileY = bossMissileY + Math.random() * 10 - 5;
					const bossSeveralMissileRadius = Math.random() + 2;
					const bossSeveralMissileVelocityX = Math.random() * 3 - 1.5;
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
