import { useCallback } from 'react';

import { Container, Graphics } from 'pixi.js';
import { useTick, extend } from '@pixi/react';

import { PlayerSprite, EnemySprite, BulletSprite } from '@/components/atoms';

import {
	useBulletStore,
	useEnemyStore,
	useFireControlStore,
	useInputStore,
	useParticleStore,
	usePlayerStore,
} from '@/store';

import { usePlayerBulletsVsEnemiesCollision } from '@/hooks';

import { constants } from '@/config/constants';

extend({ Container, Graphics });

export const GameStage = () => {
	const { player, updatePlayer, playerShoot } = usePlayerStore();
	const { playerBullets } = useBulletStore();
	const { enemies, hitEnemy, updateEnemies } = useEnemyStore();
	const { fire } = useInputStore();
	const { tryFire } = useFireControlStore();
	const { particles, updateParticles } = useParticleStore();

	const { checkPlayerBulletsVsEnemiesCollisions } =
		usePlayerBulletsVsEnemiesCollision();

	const handlePlayerFire = () => {
		if (fire && tryFire({ cooldown: player.cooldown })) {
			playerShoot();
		}
	};

	useTick(() => {
		handlePlayerFire();
		updatePlayer();
		updateEnemies();
		playerBullets.update();
		updateParticles();

		checkPlayerBulletsVsEnemiesCollisions({
			bullets: playerBullets.bullets,
			enemies: enemies,
			onCollision: (bullet, enemy) => {
				playerBullets.remove(bullet.id);
				hitEnemy(enemy, bullet);
			},
		});
	});

	const drawBackground = useCallback((g: Graphics) => {
		g.clear();
		g.fill({ color: 0x000000 });
		g.rect(0, 0, constants.stage.width, constants.stage.height);
		g.fill();
	}, []);

	return (
		<pixiContainer>
			<pixiGraphics draw={drawBackground} />
			<PlayerSprite player={player} />
			{playerBullets.bullets.map((bullet) => (
				<BulletSprite key={bullet.id} bullet={bullet} />
			))}
			{enemies.map((enemy) => (
				<EnemySprite key={enemy.id} enemy={enemy} />
			))}
			{particles.map((particle, index) => (
				<pixiGraphics
					key={index}
					draw={(g) => {
						g.clear();
						g.fill({ color: particle.color });
						g.circle(particle.x, particle.y, particle.radius);
						g.fill();
					}}
				/>
			))}
		</pixiContainer>
	);
};
