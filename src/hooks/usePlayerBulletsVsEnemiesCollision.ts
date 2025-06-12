import { type BulletType } from '@/models';
import { type EnemyType } from '@/models';
import { areRectanglesColliding } from '@/utils';

type UsePlayerBulletsVsEnemiesCollisionParams = {
	bullets: BulletType[];
	enemies: EnemyType[];
	onCollision: (bullet: BulletType, enemy: EnemyType) => void;
};

export const usePlayerBulletsVsEnemiesCollision = () => {
	const checkPlayerBulletsVsEnemiesCollisions = ({
		bullets,
		enemies,
		onCollision,
	}: UsePlayerBulletsVsEnemiesCollisionParams) => {
		for (const bullet of bullets) {
			for (const enemy of enemies) {
				if (
					areRectanglesColliding({
						a: bullet,
						b: enemy,
					})
				) {
					onCollision(bullet, enemy);
				}
			}
		}
	};

	return { checkPlayerBulletsVsEnemiesCollisions };
};
