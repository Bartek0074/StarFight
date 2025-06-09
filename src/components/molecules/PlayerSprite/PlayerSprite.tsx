import { useState, useEffect, useRef } from 'react';

import { extend } from '@pixi/react';
import { AnimatedSprite, Texture, Assets } from 'pixi.js';

import { type PlayerType } from '@/models';

extend({ AnimatedSprite });

const framePaths = [
	'/-1.png',
	'/0.png',
	'/1.png',
	'/2.png',
	'/3.png',
	'/4.png',
	'/5.png',
	'/6.png',
	'/7.png',
	'/8.png',
	'/9.png',
	'/10.png',
	'/11.png',
];

export const PlayerSprite = ({ player }: { player: PlayerType }) => {
	const [frames, setFrames] = useState<Texture[] | null>(null);
	const spriteRef = useRef<AnimatedSprite>(null);

	useEffect(() => {
		Assets.load(framePaths).then(() => {
			const textures = framePaths.map((path) => Texture.from(path));
			setFrames([...textures, ...textures.slice(0, -1).reverse()]);
		});
	}, []);

	useEffect(() => {
		if (spriteRef.current) {
			spriteRef.current.play();
			spriteRef.current.animationSpeed = 0.2;
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
