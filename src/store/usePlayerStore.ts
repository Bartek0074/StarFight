import { create } from 'zustand';
import { type PlayerType } from '../models';

import { useInputStore } from './useInputStore';

import { constants } from '../config';

type PlayerStoreType = {
	player: PlayerType;
	updatePlayer: () => void;
};

export const usePlayerStore = create<PlayerStoreType>((set, get) => ({
	player: {
		width: constants.player.width,
		height: constants.player.height,
		x: constants.stage.width / 2 - constants.player.width / 2,
		y: constants.stage.height - constants.player.height - 10,
		dx: 0,
		dy: 0,
		speed: constants.player.speed,
		rotation: 0,
	},

	updatePlayer: () => {
		const { player } = get();
		const { left, right } = useInputStore.getState();

		let dx = player.dx;

		let x = player.x;
		let rotation = player.rotation;

		if (left && !right) {
			dx = -player.speed;
		} else if (right && !left) {
			dx = player.speed;
		} else {
			dx = 0;
		}

		if (left && !right && rotation >= constants.player.min_rotation) {
			rotation = constants.player.min_rotation;
		} else if (right && !left && rotation <= constants.player.max_rotation) {
			rotation = constants.player.max_rotation;
		} else if ((!left && !right) || (left && right)) {
			if (rotation > 0) {
				rotation -= constants.player.rotation_speed;
			} else if (rotation < 0) {
				rotation += constants.player.rotation_speed;
			}
		}

		if (x + dx < 0 || x + dx + player.width > constants.stage.width) {
			dx = 0;
		}

		x += dx;

		set({
			player: {
				...player,
				x,
				rotation,
			},
		});
	},
}));
