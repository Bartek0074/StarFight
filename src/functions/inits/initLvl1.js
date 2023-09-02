import Alien from '../../classes/Alien';

export const initLvl1 = (aliensRef) => {
	let newAliens = [];

	const hitpoints = 20;

	const explosionColors = ['rgb(211, 208, 79)', 'rgb(23, 89, 74)'];

	for (let i = 0; i < 10; i++) {
		newAliens.push(
			new Alien(
				60 + i * 60,
				-178,
				0,
				2,
				90,
				1,
				hitpoints,
				explosionColors,
				'flyingIn'
			)
		);
	}
	for (let i = 0; i < 10; i++) {
		newAliens.push(
			new Alien(
				60 + i * 60,
				-118,
				0,
				2,
				90,
				1,
				hitpoints,
				explosionColors,
				'flyingIn'
			)
		);
	}
	aliensRef.current = newAliens;
};
