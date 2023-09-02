import player_explosion from '../../sounds/player_explosion.mp3';

export const playerExplosionSound = () => {
	let audio;

	audio = new Audio(player_explosion);

	audio.play();
};
