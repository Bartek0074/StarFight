import { create } from 'zustand';
import { type PlayerType } from '@/models';

import { useInputStore } from './useInputStore';

import { constants } from '@/config';
import { getPlayerDx, getSwingY } from '@/utils';

type PlayerStoreType = {
	player: PlayerType;
	updatePlayer: () => void;
};

const baseY = constants.stage.height - constants.player.height - 10;

export const usePlayerStore = create<PlayerStoreType>((set, get) => ({
	player: {
		width: constants.player.width,
		height: constants.player.height,
		x: constants.stage.width / 2 - constants.player.width / 2,
		y: baseY,
		dx: 0,
		dy: 0,
		speed: constants.player.speed,
		rotation: 0,
	},

	updatePlayer: () => {
		const { player } = get();
		const { left, right } = useInputStore.getState();

		let { dx, x, rotation } = player;

		dx = getPlayerDx({
			dx,
			left,
			right,
			speed: player.speed,
			accelerationFactor: constants.player.accelerationFactor,
			frictionFactor: constants.player.frictionFactor,
		});

		if (x + dx < 0 || x + dx + player.width > constants.stage.width) {
			dx = 0;
		}

		x += dx;

		if (left && !right && rotation >= constants.player.minRotation) {
			rotation -= constants.player.rotationSpeed;
		} else if (right && !left && rotation <= constants.player.maxRotation) {
			rotation += constants.player.rotationSpeed;
		} else if ((!left && !right) || (left && right)) {
			if (rotation > 0) {
				rotation -= constants.player.rotationSpeed;
			} else if (rotation < 0) {
				rotation += constants.player.rotationSpeed;
			}
		}

		const y = getSwingY({
			baseY: baseY,
			swingFrequency: constants.player.swingFrequencyY,
			swingAmplitude: constants.player.swingAmplitudeY,
		});

		set({
			player: {
				...player,
				x,
				dx,
				rotation,
				y,
			},
		});
	},
}));
