import boss_several_shot from '../../sounds/boss_several_shot.mp3';

export const bossSeveralShotSound = () => {
	let audio;

	audio = new Audio(boss_several_shot);

	audio.play();
};
