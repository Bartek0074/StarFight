import { create } from 'zustand';
import type { BulletType } from '@/models';
import type { AddBulletType } from '@/models/Bullet';

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
		const updatedBullets = bullets.map((bullet) => {
			let x = bullet.x + bullet.dx;
			let y = bullet.y + bullet.dy;

			return {
				...bullet,
				x,
				y,
			};
		});

		set({ bullets: updatedBullets });
	},
}));
