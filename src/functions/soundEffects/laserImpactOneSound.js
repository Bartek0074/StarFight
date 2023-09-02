import laser_impact_1 from '../../sounds/laser_impact_2.mp3';

export const laserImpactOneSound = () => {
	let audio;

	audio = new Audio(laser_impact_1);

	audio.play();
};
