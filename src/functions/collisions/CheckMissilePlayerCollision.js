import { isCircleCollidingWithRectangle } from '../utils/isCircleCollidingWithRectangle.js';

import { playerImpactSound } from '../soundEffects/playerImpactSound.js';
import { playerExplosionSound } from '../soundEffects/playerExplosionSound.js';

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
				playerExplosionSound();
				player.dead = true;
				// explosion
			} else {
				addPlayerImpact(player, missile, shardsRef);
				playerImpactSound();
				// impoct (not yet explosion)
			}
		} else {
			// 	// not bum
		}
	});
};
