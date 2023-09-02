import { isCircleCollidingWithRectangle } from '../utils/isCircleCollidingWithRectangle.js';

import { laserImpactOneSound } from '../soundEffects/laserImpactOneSound.js';

import { addShardsImpact } from './addShardsImpact.js';
import { addShardsExplosion } from './addShardsExplosion.js';

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
			if (isCircleCollidingWithRectangle(circle, rect)) {
				missilesRef.current.splice(missileIndex, 1);

				alien.hitpoints -= missile.damage;

				if (alien.hitpoints <= 0) {
					addShardsExplosion(alien, missile, shardsRef);
					aliensRef.current.splice(alienIndex, 1);
					// explosion
				} else {
					addShardsImpact(alien, missile, shardsRef);
					laserImpactOneSound();
					// impoct (not yet explosion)
				}

				console.log(alien.hitpoints);
			} else {
				// 	// not bum
			}
		});
	});
};
