import { useEffect, useState } from 'react';

import { Application, extend } from '@pixi/react';
import { Container, Text, Assets, Texture } from 'pixi.js';
import { sound } from '@pixi/sound';

import { GameStage } from '@/components/molecules';

import { useTextureStore } from '@/store';
import { type SpriteKey } from '@/store/useTextureStore';

import { constants } from '@/config/constants';

extend({ Container, Text });

const spriteGroups = {
	player: constants.player.frames,
	bulletPlayerOne: constants.weapons.player.basic.frames,
	enemyBugRegular: constants.enemies.bug.regular.frames,
};

export const Game = () => {
	const { setTextures, isLoaded } = useTextureStore();
	const [soundsLoaded, setSoundsLoaded] = useState(false);

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

		const loadSounds = async () => {
			let loadedCount = 0;
			const total = Object.keys(constants.sounds).length;

			Object.entries(constants.sounds).forEach(([name, url]) => {
				if (!sound.exists(name)) {
					sound.add(name, {
						url,
						preload: true,
						loaded: () => {
							loadedCount += 1;
							if (loadedCount === total) {
								setSoundsLoaded(true);
							}
						},
					});
				} else {
					loadedCount += 1;
					if (loadedCount === total) {
						setSoundsLoaded(true);
					}
				}
			});
		};

		loadTextures();
		loadSounds();
	}, [setTextures]);

	const allTexturesLoaded = Object.values(isLoaded).every((loaded) => loaded);
	const allLoaded = allTexturesLoaded && soundsLoaded;

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
