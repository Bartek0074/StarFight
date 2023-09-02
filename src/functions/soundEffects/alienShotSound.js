import alien_shot from '../../sounds/alien_shot.mp3';

export const alienShotSound = () => {
	let audio;

	audio = new Audio(alien_shot);
	audio.volume = 0.5;

	audio.play();
};
