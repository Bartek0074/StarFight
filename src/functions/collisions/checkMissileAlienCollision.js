import { areRectanglesColliding } from '../utils/areRectanglesColliding.js';

import { laserImpactOneSound } from '../soundEffects/laserImpactOneSound.js';

export const checkMissileAlienCollision = (missilesRef, aliensRef) => {
	missilesRef.current.forEach((missile, missileIndex) => {
		aliensRef.current.forEach((alien, alienIndex) => {
			const rect1 = {
				x: missile.position.x,
				y: missile.position.y,
				width: missile.width,
				height: missile.height,
			};
			const rect2 = {
				x: alien.position.x,
				y: alien.position.y,
				width: alien.width,
				height: alien.height,
			};

			if (areRectanglesColliding(rect1, rect2) && missile.from === 'player') {
				aliensRef.current.splice(alienIndex, 1);
				missilesRef.current.splice(missileIndex, 1);

				laserImpactOneSound();
				// bum
			} else {
				// not bum
			}
		});
	});
};
