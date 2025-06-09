import { useCallback } from 'react';

import { useTick, extend } from '@pixi/react';
import { Container, Graphics } from 'pixi.js';

import { PlayerSprite } from '@/components/atoms';

import { useInputStore, useFireControlStore, usePlayerStore } from '@/store';

import { constants } from '@/config/constants';

extend({ Container, Graphics });

export const GameStage = () => {
	const { player, updatePlayer } = usePlayerStore();
	const { fire } = useInputStore();
	const { tryFire } = useFireControlStore();

	useTick(() => {
		updatePlayer();
		if (fire) {
			tryFire({ cooldown: 1000 }) && console.log('Firing!');
		}
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
		</pixiContainer>
	);
};
