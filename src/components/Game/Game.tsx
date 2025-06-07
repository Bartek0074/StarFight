import { useCallback, useState, useEffect, useRef } from 'react';

import { Application, useTick, extend } from '@pixi/react';
import { Container, AnimatedSprite, Texture, Graphics, Assets } from 'pixi.js';

import { usePlayerStore } from '../../store';

import { type PlayerType } from '../../models';

import { constants } from '../../config/constants';

extend({ Container, AnimatedSprite, Graphics });

const framePaths = [
	'/space_00.png',
	// '/space_01.png',
	// '/space_02.png',
	// '/space_03.png',
	// '/space_04.png',
	// '/space_05.png',
	// '/space_06.png',
	// '/space_07.png',
	// '/space_08.png',
];

const Player = ({ player }: { player: PlayerType }) => {
	const [frames, setFrames] = useState<Texture[] | null>(null);
	const spriteRef = useRef<AnimatedSprite>(null);

	useEffect(() => {
		Assets.load(framePaths).then(() => {
			const textures = framePaths.map((path) => Texture.from(path));
			setFrames(textures);
		});
	}, []);

	useEffect(() => {
		if (spriteRef.current) {
			spriteRef.current.play();
			spriteRef.current.animationSpeed = 0.1;
			spriteRef.current.loop = true;
		}
	}, [frames]);

	if (!frames) return null;

	return (
		<pixiAnimatedSprite
			ref={spriteRef}
			textures={frames}
			x={player.x + player.width / 2}
			y={player.y + player.height / 2}
			anchor={0.5}
			rotation={(player.rotation * Math.PI) / 180}
			width={player.width}
			height={player.height}
			animationSpeed={2}
		/>
	);
};

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
			<Player player={player} />
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
