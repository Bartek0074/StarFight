import player_impact from '../../sounds/player_impact.mp3';

export const playerImpactSound = () => {
	let audio;

	audio = new Audio(player_impact);

	audio.play();
};
