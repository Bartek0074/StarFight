import { SPACESHIP_SPEED } from '../../data/variables';

import spaceship from '../../images/spaceship.png';

export const updatePlayer = (ctx, keys, player) => {
	const spaceshipImage = new Image();
	spaceshipImage.src = spaceship;

	player.update(ctx, spaceshipImage);

	if (keys.a.pressed === true && keys.d.pressed === true) {
		player.velocity.x = 0;
		player.rotation = -0;
	} else if (keys.a.pressed === true) {
		player.velocity.x = -SPACESHIP_SPEED;
		player.rotation = -0.15;
	} else if (keys.d.pressed === true) {
		player.velocity.x = SPACESHIP_SPEED;
		player.rotation = 0.15;
	} else {
		player.velocity.x = 0;
		player.rotation = -0;
	}
};
