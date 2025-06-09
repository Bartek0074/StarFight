import { useEffect } from 'react';

import { Application, extend } from '@pixi/react';
import { Container, Text, Assets, Texture } from 'pixi.js';

import { GameStage } from '@/components/molecules';

import { useTextureStore } from '@/store';
import { type SpriteKey } from '@/store/useTextureStore';

import { constants } from '@/config/constants';

extend({ Container, Text });

const spriteGroups = {
	player: constants.frames.player,
	bulletPlayerOne: constants.frames.bulletPlayerOne,
};

export const Game = () => {
	const { setTextures, isLoaded } = useTextureStore();

	useEffect(() => {
		const loadTextures = async () => {
			for (const [key, paths] of Object.entries(spriteGroups)) {
				await Assets.load(paths);
				const textures = paths.map((path) => Texture.from(path));
				setTextures(key as SpriteKey, [
					...textures,
					...textures.slice(0, -1).reverse(),
				]);
			}
		};
		loadTextures();
	}, [setTextures]);

	const allLoaded = Object.values(isLoaded).every((loaded) => loaded);

	return (
		<Application
			width={constants.stage.width}
			height={constants.stage.height}
			backgroundColor={0x000000}
		>
			{!allLoaded ? (
				<pixiText
					text='Loading...'
					style={{ fill: 0xffffff, fontSize: 24 }}
					x={constants.stage.width / 2}
					y={constants.stage.height / 2}
					anchor={0.5}
				/>
			) : (
				<GameStage />
			)}
		</Application>
	);
};
