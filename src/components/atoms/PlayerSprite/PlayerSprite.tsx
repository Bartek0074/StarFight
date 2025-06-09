import { useEffect, useRef } from 'react';

import { extend } from '@pixi/react';
import { AnimatedSprite } from 'pixi.js';

import { useTextureStore } from '@/store';

import { type PlayerType } from '@/models';

extend({ AnimatedSprite });

export const PlayerSprite = ({ player }: { player: PlayerType }) => {
	const { textures } = useTextureStore();
	const spriteRef = useRef<AnimatedSprite>(null);

	useEffect(() => {
		if (spriteRef.current && textures.player && textures.player.length > 0) {
			spriteRef.current.play();
			spriteRef.current.animationSpeed = 0.2;
			spriteRef.current.loop = true;
		}

		return () => {
			if (spriteRef.current) {
				spriteRef.current.stop();
			}
		};
	}, [textures.player]);

	if (!textures.player || textures.player.length === 0) return null;

	return (
		<pixiAnimatedSprite
			ref={spriteRef}
			textures={textures.player}
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
