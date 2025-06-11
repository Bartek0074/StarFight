import { create } from 'zustand';
import type { EnemyType } from '@/models';
import type { AddEnemyType } from '@/models';
import { constants } from '@/config';

type EnemyStoreType = {
	enemies: EnemyType[];
	addEnemy: (enemy: AddEnemyType) => void;
	removeEnemy: (id: number) => void;
	updateEnemies: () => void;
	hitEnemy: (id: number, damage: number) => void;
};

export const useEnemyStore = create<EnemyStoreType>((set, get) => ({
	enemies: [
		{
			id: 0,
			width: constants.enemies.bug.regular.width,
			height: constants.enemies.bug.regular.height,
			x: 100,
			y: 100,
			dx: 0,
			dy: 0,
			rotation: 0,
			health: constants.enemies.bug.regular.health,
		},
	],

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

	hitEnemy: (id: number, damage: number) => {
		const { enemies, removeEnemy } = get();
		const enemy = enemies.find((e) => e.id === id);

		if (!enemy) return;

		const updatedEnemy = { ...enemy, health: enemy.health - damage };

		if (updatedEnemy.health <= 0) {
			// sound of enemy death can be played here
			removeEnemy(id);
		} else {
			// sound of enemy hit can be played here
			set((state) => ({
				enemies: state.enemies.map((e) => (e.id === id ? updatedEnemy : e)),
			}));
		}
	},
}));
