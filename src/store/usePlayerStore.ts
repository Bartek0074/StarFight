import { create } from 'zustand';
import { type PlayerType } from '@/models';

import { useInputStore } from './useInputStore';
import { useBulletStore } from './useBulletStore';

import { sound } from '@pixi/sound';

import { constants } from '@/config';
import {
	getPlayerDx,
	getPlayerRotation,
	getSwingY,
	willBeOutOfLeftBounds,
	willBeOutOfRightBounds,
} from '@/utils';

type PlayerStoreType = {
	player: PlayerType;
	updatePlayer: () => void;
  playerShoot: () => void;
};

const baseY = constants.stage.height - constants.player.height - 10;

export const usePlayerStore = create<PlayerStoreType>((set, get) => ({
	player: {
		width: constants.player.width,
		height: constants.player.height,
		x: (constants.stage.width - constants.player.width) / 2,
		y: baseY,
		dx: 0,
		dy: 0,
		speed: constants.player.speed,
		rotation: 0,
    cooldown: 100,
	},

	updatePlayer: () => {
		const { player } = get();
		const { left, right } = useInputStore.getState();

		let dx = getPlayerDx({
			dx: player.dx,
			left,
			right,
			speed: player.speed,
			accelerationFactor: constants.player.accelerationFactor,
			frictionFactor: constants.player.frictionFactor,
		});

		if (
			willBeOutOfLeftBounds({ x: player.x, dx }) ||
			willBeOutOfRightBounds({
				x: player.x,
				dx,
				width: player.width,
				stageWidth: constants.stage.width,
			})
		) {
			dx = 0;
		}

		const x = player.x + dx;

		const rotation = getPlayerRotation({
			rotation: player.rotation,
			left,
			right,
			minRotation: constants.player.minRotation,
			maxRotation: constants.player.maxRotation,
			rotationSpeed: constants.player.rotationSpeed,
		});

		const y = getSwingY({
			baseY,
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

	playerShoot: () => {
		const { player } = get();
		const { playerBullets } = useBulletStore.getState();

		playerBullets.add({
			x: player.x + player.width / 2 - 2,
			y: player.y,
			dy: -5,
			dx: 0,
			width: 4,
			height: 8,
			rotation: 0,
		});
    
		sound.play('bulletOneShot');
	},
}));
