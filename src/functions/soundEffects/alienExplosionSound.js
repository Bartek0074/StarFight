import alien_explosion from '../../sounds/alien_explosion.mp3';

export const alienExplosionSound = () => {
	let audio;

	audio = new Audio(alien_explosion);

	audio.play();
};
