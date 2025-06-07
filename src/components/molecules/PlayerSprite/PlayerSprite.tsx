import { useState, useEffect, useRef } from 'react';

import { extend } from '@pixi/react';
import { AnimatedSprite, Texture, Assets } from 'pixi.js';

import { type PlayerType } from '@/models';

extend({ AnimatedSprite });

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

export const PlayerSprite = ({ player }: { player: PlayerType }) => {
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
