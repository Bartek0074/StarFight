import { isCircleCollidingWithRectangle } from '../utils/isCircleCollidingWithRectangle.js';

import { laserImpactOneSound } from '../soundEffects/laserImpactOneSound.js';

export const checkMissileAlienCollision = (missilesRef, aliensRef) => {
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
				// bum
				laserImpactOneSound();

				aliensRef.current.splice(alienIndex, 1);
				missilesRef.current.splice(missileIndex, 1);
			} else {
				// 	// not bum
			}
		});
	});
};
