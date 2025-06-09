import { create } from 'zustand';
import type { BulletType } from '@/models';
import type { AddBulletType } from '@/models/Bullet';

import {
	willBeOutOfBottomBounds,
	willBeOutOfLeftBounds,
	willBeOutOfRightBounds,
	willBeOutOfTopBounds,
} from '@/utils';
import { constants } from '@/config';

type PlayerStoreType = {
	bullets: BulletType[];
	addBullet: (bullet: AddBulletType) => void;
	removeBullet: (id: number) => void;
	updateBullets: () => void;
};

export const useBulletStore = create<PlayerStoreType>((set, get) => ({
	bullets: [],

	addBullet: (bullet: AddBulletType) => {
		const lastAddedId =
			get().bullets.length > 0 ? get().bullets[get().bullets.length - 1].id : 0;

		const newBullet: BulletType = {
			...bullet,
			id: lastAddedId + 1,
		};

		set((state) => ({
			bullets: [...state.bullets, newBullet],
		}));
	},

	removeBullet: (id: number) => {
		set((state) => ({
			bullets: state.bullets.filter((bullet) => bullet.id !== id),
		}));
	},

	updateBullets: () => {
		const { bullets } = get();

		const visibleBullets = bullets
			.map((bullet) => ({
				...bullet,
				x: bullet.x + bullet.dx,
				y: bullet.y + bullet.dy,
			}))
			.filter((bullet) => {
				return (
					!willBeOutOfLeftBounds({
						x: bullet.x + 20,
						dx: bullet.dx,
						margin: 100,
					}) &&
					!willBeOutOfRightBounds({
						x: bullet.x - 20,
						dx: bullet.dx,
						width: bullet.width,
						stageWidth: constants.stage.width,
						margin: 100,
					}) &&
					!willBeOutOfTopBounds({
						y: bullet.y + 20,
						dy: bullet.dy,
						margin: 100,
					}) &&
					!willBeOutOfBottomBounds({
						y: bullet.y - 20,
						dy: bullet.dy,
						height: bullet.height,
						stageHeight: constants.stage.height,
						margin: 100,
					})
				);
			});

		set({ bullets: visibleBullets });
	},
}));
