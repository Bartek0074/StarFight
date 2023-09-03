import Alien from '../../classes/Alien';

export const initLvl1 = (aliensRef) => {
	let newAliens = [];

	const type = 'froggy';
	const colors = ['rgb(211, 208, 79)', 'rgb(23, 89, 74)'];
	const hitpoints = 20;
	const mode = 'flyingIn';
	const y1 = -178;
	const y2 = -118;
	const velocityX = 0;
	const velocityY = 2;
	const angle = 90;
	const freeFlyingVelocity = 1;

	for (let i = 0; i < 10; i++) {
		const x1 = 60 + i * 60;
		newAliens.push(
			new Alien(
				type,
				colors,
				hitpoints,
				mode,
				x1,
				y1,
				velocityX,
				velocityY,
				angle,
				freeFlyingVelocity
			)
		);
	}
	for (let i = 0; i < 10; i++) {
		const x2 = 60 + i * 60;
		newAliens.push(
			new Alien(
				type,
				colors,
				hitpoints,
				mode,
				x2,
				y2,
				velocityX,
				velocityY,
				angle,
				freeFlyingVelocity
			)
		);
	}
	aliensRef.current = newAliens;
};
