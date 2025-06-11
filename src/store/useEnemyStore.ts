import { create } from 'zustand';
import { useParticleStore } from './useParticleStore';
import type { EnemyType } from '@/models';
import type { AddEnemyType } from '@/models';
import { type BulletType } from '@/models';
import { constants } from '@/config';
import { sound } from '@pixi/sound';

type EnemyStoreType = {
	enemies: EnemyType[];
	addEnemy: (enemy: AddEnemyType) => void;
	removeEnemy: (id: number) => void;
	updateEnemies: () => void;
	hitEnemy: (enemy: EnemyType, bullet: BulletType) => void;
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
		{
			id: 1,
			width: constants.enemies.bug.regular.width,
			height: constants.enemies.bug.regular.height,
			x: 220,
			y: 100,
			dx: 0,
			dy: 0,
			rotation: 0,
			health: constants.enemies.bug.regular.health,
		},
		{
			id: 2,
			width: constants.enemies.bug.regular.width,
			height: constants.enemies.bug.regular.height,
			x: 160,
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

	hitEnemy: (enemy: EnemyType, bullet: BulletType) => {
		const { removeEnemy } = get();
		const { makeExplosion } = useParticleStore.getState();

		const updatedEnemy = { ...enemy, health: enemy.health - bullet.damage };

		if (updatedEnemy.health <= 0) {
			removeEnemy(enemy.id);

			makeExplosion(
				updatedEnemy.x + updatedEnemy.width / 2,
				updatedEnemy.y + updatedEnemy.height / 2,
				{
					minCount: constants.particles.explosion.enemy.regular.minCount,
					maxCount: constants.particles.explosion.enemy.regular.maxCount,
					minRadius: constants.particles.explosion.enemy.regular.minRadius,
					maxRadius: constants.particles.explosion.enemy.regular.maxRadius,
					minSpeed: constants.particles.explosion.enemy.regular.minSpeed,
					maxSpeed: constants.particles.explosion.enemy.regular.maxSpeed,
					colors: [0xff0000, 0xffa500, 0xffff00],
				}
			);

			sound.play('enemyExplosion');
		} else {
			set((state) => ({
				enemies: state.enemies.map((e) =>
					e.id === enemy.id ? updatedEnemy : e
				),
			}));

			makeExplosion(bullet.x + bullet.width / 2, bullet.y + bullet.height / 2, {
				minCount: constants.particles.hit.enemy.regular.minCount,
				maxCount: constants.particles.hit.enemy.regular.maxCount,
				minRadius: constants.particles.hit.enemy.regular.minRadius,
				maxRadius: constants.particles.hit.enemy.regular.maxRadius,
				minSpeed: constants.particles.hit.enemy.regular.minSpeed,
				maxSpeed: constants.particles.hit.enemy.regular.maxSpeed,
				colors: [0xff0000, 0xffa500, 0xffff00],
			});

			sound.play('weaponPlayerBasicHit');
		}
	},
}));
