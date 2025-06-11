import { create } from 'zustand';
import type { EnemyType } from '@/models';
import type { AddEnemyType } from '@/models';
import type { AddBulletType } from '@/models';
import { constants } from '@/config';

type EnemyStoreType = {
	enemies: EnemyType[];
	addEnemy: (enemy: AddBulletType) => void;
	removeEnemy: (id: number) => void;
	updateEnemies: () => void;
};

export const useEnemyStore = create<EnemyStoreType>((set, get) => ({
	enemies: [{
		id: 0,
		width: constants.enemy.regular.width,
		height: constants.enemy.regular.height,
		x: 100,
		y: 100,
		dx: 0,
		dy: 0,
		rotation: 0,
	}],

	addEnemy: (enemy: AddEnemyType) => {
		const enemies = get().enemies;
		const lastId = enemies.length > 0 ? enemies[enemies.length - 1].id : 0;

		const newEnemy: EnemyType = {
			...enemy,
			id: lastId + 1,
		};

		set((state) => ({
			enemies: [...state.enemies, newEnemy],
		}));
	},

	removeEnemy: (id: number) => {
		set((state) => ({
			enemies: state.enemies.filter((e) => e.id !== id),
		}));
	},

	updateEnemies: () => {
		const { enemies } = get();

		const updatedEnemies = enemies.map((e) => ({
			...e,
			x: e.x + e.dx,
			y: e.y + e.dy,
		}));

		set(() => ({
			enemies: updatedEnemies,
		}));
	},
}));
