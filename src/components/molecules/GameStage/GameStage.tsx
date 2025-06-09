import { useCallback } from 'react';

import { useTick, extend } from '@pixi/react';
import { Container, Graphics } from 'pixi.js';

import { PlayerSprite,BulletSprite } from '@/components/atoms';

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
					x: player.x + player.width / 2 - 2,
					y: player.y,
					dy: -5,
					dx: 0,
					width: 4,
					height: 8,
					rotation: 0,
				});
		}
	}

	useTick(() => {
		useFire();
		updatePlayer();
		updateBullets();
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
			{bullets.map((bullet) => (
				<BulletSprite key={bullet.id} bullet={bullet} />
			))}
		</pixiContainer>
	);
};
