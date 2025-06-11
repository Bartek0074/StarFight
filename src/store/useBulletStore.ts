import { create } from 'zustand';
import type { BulletType } from '@/models';
import type { AddBulletType } from '@/models';

import {
	willBeOutOfBottomBounds,
	willBeOutOfLeftBounds,
	willBeOutOfRightBounds,
	willBeOutOfTopBounds,
} from '@/utils';
import { constants } from '@/config';

type BulletOwner = 'playerBullets' | 'enemyBullets';

type BulletSliceType = {
	bullets: BulletType[];
	add: (bullet: AddBulletType) => void;
	remove: (id: number) => void;
	update: () => void;
};

type BulletStoreType = {
	playerBullets: BulletSliceType;
	enemyBullets: BulletSliceType;
};

const createBulletSlice = (
	owner: BulletOwner,
	set: (fn: (state: BulletStoreType) => Partial<BulletStoreType>) => void,
	get: () => BulletStoreType
): BulletSliceType => ({
	bullets: [],

	add: (bullet) => {
		const bullets = get()[owner].bullets;
		const lastId = bullets.length > 0 ? bullets[bullets.length - 1].id : 0;

		const newBullet: BulletType = {
			...bullet,
			id: lastId + 1,
		};

		set((state) => ({
			[owner]: {
				...state[owner],
				bullets: [...state[owner].bullets, newBullet],
			},
		}));
	},

	remove: (id: number) => {
		set((state) => ({
			[owner]: {
				...state[owner],
				bullets: state[owner].bullets.filter((b) => b.id !== id),
			},
		}));
	},

	update: () => {
		const { bullets } = get()[owner];

		const updated = bullets
			.map((b) => ({
				...b,
				x: b.x + b.dx,
				y: b.y + b.dy,
			}))
			.filter((b) => {
				return (
					!willBeOutOfLeftBounds({ x: b.x + 20, dx: b.dx, margin: constants.stage.bulletMargin }) &&
					!willBeOutOfRightBounds({
						x: b.x - 20,
						dx: b.dx,
						width: b.width,
						stageWidth: constants.stage.width,
						margin: constants.stage.bulletMargin,
					}) &&
					!willBeOutOfTopBounds({ y: b.y + 20, dy: b.dy, margin: constants.stage.bulletMargin }) &&
					!willBeOutOfBottomBounds({
						y: b.y - 20,
						dy: b.dy,
						height: b.height,
						stageHeight: constants.stage.height,
						margin: constants.stage.bulletMargin,
					})
				);
			});

		set((state) => ({
			[owner]: {
				...state[owner],
				bullets: updated,
			},
		}));
	},
});

export const useBulletStore = create<BulletStoreType>((set, get) => ({
	playerBullets: createBulletSlice('playerBullets', set, get),
	enemyBullets: createBulletSlice('enemyBullets', set, get),
}));
