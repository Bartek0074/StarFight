import { isCircleCollidingWithRectangle } from '../utils/isCircleCollidingWithRectangle.js';

import { laserImpactOneSound } from '../soundEffects/laserImpactOneSound.js';
import { alienExplosionSound } from '../soundEffects/alienExplosionSound.js';

import { addPlayerImpact } from './addPlayerImpact.js';
import { addPlayerExplosion } from './addPlayerExplosion.js';

export const checkMissilePlayerCollision = (missilesRef, player, shardsRef) => {
	missilesRef.current.forEach((missile, missileIndex) => {
		const circle = {
			x: missile.position.x,
			y: missile.position.y,
			radius: missile.radius,
		};
		const rect = {
			x: player.position.x,
			y: player.position.y,
			width: player.width,
			height: player.height,
		};
		if (
			isCircleCollidingWithRectangle(circle, rect) &&
			missile.from === 'alien' &&
			player.dead === false
		) {
			missilesRef.current.splice(missileIndex, 1);

			player.hitpoints -= missile.damage;

			if (player.hitpoints <= 0) {
				addPlayerExplosion(player, missile, shardsRef);
				alienExplosionSound();
				player.dead = true;
				// explosion
			} else {
				addPlayerImpact(player, missile, shardsRef);
				laserImpactOneSound();
				// impoct (not yet explosion)
			}
		} else {
			// 	// not bum
		}
	});
};
