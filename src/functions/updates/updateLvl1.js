import { ALIEN_FLY_CHANCE } from '../../data/variables';

export const updateLvl1 = (frames, aliensRef) => {
	if (aliensRef.current.length >= 8) {
		aliensRef.current.forEach((alien) => {
			if (frames === 120) {
				alien.velocity.y = 0;
			} else if (frames === 150) {
				alien.velocity.x = 1;
				alien.mode = 'swinging';
			} else if (frames >= 180) {
				if (frames % 60 === 0 && alien.mode === 'swinging') {
					alien.velocity.x = -alien.velocity.x;

					const drawnChance = Math.random();

					if (drawnChance < ALIEN_FLY_CHANCE) {
						alien.mode = 'free_flying';
					}
				} else if (alien.mode === 'free_flying') {
					alien.angle += Math.random() * 70 - 20;
				}
			}
		});
	} else {
        aliensRef.current.forEach((alien) => {
            alien.mode = 'free_flying';
            alien.velocityAngle = 1.5
            alien.angle += Math.random() * 70 - 20;
		});
	}
};
