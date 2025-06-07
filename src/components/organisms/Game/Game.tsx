import { useCallback } from 'react';

import { Application, useTick, extend } from '@pixi/react';
import { Container, Graphics } from 'pixi.js';

import { PlayerSprite } from '../../molecules';

import { usePlayerStore } from '../../../store';

import { constants } from '../../../config/constants';

extend({ Container, Graphics });

const GameStage = () => {
	const { player, updatePlayer } = usePlayerStore();

	useTick(() => {
		updatePlayer();
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

export const Game = () => {
	return (
		<Application
			width={constants.stage.width}
			height={constants.stage.height}
			backgroundColor={0x000000}
		>
			<GameStage />
		</Application>
	);
};
