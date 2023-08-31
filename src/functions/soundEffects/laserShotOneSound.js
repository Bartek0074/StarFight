import laser_shot_1 from '../../sounds/laser_shot_1.mp3';

export const laserShotOneSound = () => {
	let audio;

	audio = new Audio(laser_shot_1);

	audio.play();
};
