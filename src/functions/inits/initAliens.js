import Alien from '../../classes/Alien';

export const initAliens = (aliensRef) => {
	let newAliens = [];

	for (let i = 0; i < 11; i++) {
		newAliens.push(new Alien(30 + i * 60, 30));
	}
	for (let i = 0; i < 11; i++) {
		newAliens.push(new Alien(30 + i * 60, 90));
	}
	aliensRef.current = newAliens;
};
