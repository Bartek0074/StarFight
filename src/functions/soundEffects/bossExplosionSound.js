import boss_explosion from '../../sounds/boss_explosion.mp3';

export const bossExplosionSound = () => {
	let audio;

	audio = new Audio(boss_explosion);

	audio.play();
};
