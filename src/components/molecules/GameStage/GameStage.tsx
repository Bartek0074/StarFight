import { useCallback } from 'react';

import { useTick, extend } from '@pixi/react';
import { Container, Graphics } from 'pixi.js';

import { PlayerSprite } from '@/components/atoms';

import {
	useBulletStore,
	useInputStore,
	useFireControlStore,
	usePlayerStore,
} from '@/store';

import { constants } from '@/config/constants';

extend({ Container, Graphics });

export const GameStage = () => {
	const { player, updatePlayer } = usePlayerStore();
	const { bullets, updateBullets, addBullet } = useBulletStore();
	const { fire } = useInputStore();
	const { tryFire } = useFireControlStore();

	const useFire = () =>{
		if (fire) {
			tryFire({ cooldown: 300 }) &&
				addBullet({
					x: player.x + player.width / 2 - 3,
					y: player.y,
					dy: -5,
					dx: 0,
					width: 6,
					height: 6,
					rotation: 0,
				});
		}
	}

	useTick(() => {
		useFire();
		updatePlayer();
		updateBullets();
		console.log(bullets.length)
	});

	const drawBackground = useCallback((g: Graphics) => {
		g.clear();
		g.fill({ color: 0x000000 });
		g.rect(0, 0, constants.stage.width, constants.stage.height);
		g.fill();
	}, []);

	const drawBullets = useCallback(
		(g: Graphics) => {
			g.clear();
			g.fill({ color: 0xff0000 });
			bullets.forEach((bullet) => {
				g.circle(bullet.x, bullet.y, bullet.width / 2);
			});
			g.fill();
		},
		[bullets]
	);

	return (
		<pixiContainer>
			<pixiGraphics draw={drawBackground} />
			<PlayerSprite player={player} />
			<pixiGraphics draw={drawBullets} />
		</pixiContainer>
	);
};
