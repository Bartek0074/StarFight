import { isCircleCollidingWithRectangle } from '../utils/isCircleCollidingWithRectangle.js';

import { laserImpactOneSound } from '../soundEffects/laserImpactOneSound.js';
import { alienExplosionSound } from '../soundEffects/alienExplosionSound.js';

import { addAlienImpact } from './addAlienImpact.js';
import { addAlienExplosion } from './addAlienExplosion.js';

import { addBossImpact } from './addBossImpact.js';
import { addBossExplosion } from './addBossExplosion.js';

export const checkMissileAlienCollision = (
	missilesRef,
	aliensRef,
	shardsRef
) => {
	missilesRef.current.forEach((missile, missileIndex) => {
		aliensRef.current.forEach((alien, alienIndex) => {
			const circle = {
				x: missile.position.x,
				y: missile.position.y,
				radius: missile.radius,
			};
			const rect = {
				x: alien.position.x,
				y: alien.position.y,
				width: alien.width,
				height: alien.height,
			};
			if (
				isCircleCollidingWithRectangle(circle, rect) &&
				missile.from === 'player'
			) {
				missilesRef.current.splice(missileIndex, 1);

				alien.hitpoints -= missile.damage;

				if (alien.hitpoints <= 0) {
					// explosion
					aliensRef.current.splice(alienIndex, 1);
					if (alien.type.includes('boss')) {
						addBossExplosion(alien, missile, shardsRef);
					} else {
						addAlienExplosion(alien, missile, shardsRef);
						alienExplosionSound();
					}
				} else {
					// impact (not yet explosion)
					if (alien.type.includes('boss')) {
						addBossImpact(alien, missile, shardsRef);
						laserImpactOneSound();
					} else {
						addAlienImpact(alien, missile, shardsRef);
						laserImpactOneSound();
					}
				}
			}
		});
	});
};
