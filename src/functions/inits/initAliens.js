import Alien from '../../classes/Alien';

export const initAliens = (aliensRef) => {
	let newAliens = [];

	const hitpoints = 50;

	const explosionColors = ['rgb(211, 208, 79)', 'rgb(23, 89, 74)'];

	for (let i = 0; i < 11; i++) {
		newAliens.push(new Alien(30 + i * 60, 30, hitpoints, explosionColors));
	}
	for (let i = 0; i < 11; i++) {
		newAliens.push(new Alien(30 + i * 60, 90, hitpoints, explosionColors));
	}
	aliensRef.current = newAliens;
};
