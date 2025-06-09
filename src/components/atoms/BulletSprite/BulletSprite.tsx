import { useEffect, useRef } from 'react';

import { extend } from '@pixi/react';
import { AnimatedSprite, BlurFilter } from 'pixi.js';

import { useTextureStore } from '@/store';

import { type BulletType } from '@/models';

extend({ AnimatedSprite });

export const BulletSprite = ({ bullet }: { bullet: BulletType }) => {
	const { textures } = useTextureStore();
	const spriteRef = useRef<AnimatedSprite>(null);

	useEffect(() => {
		if (
			spriteRef.current &&
			textures.bulletPlayerOne &&
			textures.bulletPlayerOne.length > 0
		) {
			spriteRef.current.play();
			spriteRef.current.animationSpeed = 0.2;
			spriteRef.current.loop = true;
		}

		return () => {
			if (spriteRef.current) {
				spriteRef.current.stop();
			}
		};
	}, [textures.bulletPlayerOne]);

	if (!textures.bulletPlayerOne || textures.bulletPlayerOne.length === 0)
		return null;

	return (
		<pixiAnimatedSprite
			ref={spriteRef}
			textures={textures.bulletPlayerOne}
			x={bullet.x + bullet.width / 2}
			y={bullet.y + bullet.height / 2}
			anchor={0.5}
			rotation={(bullet.rotation * Math.PI) / 180}
			width={bullet.width}
			height={bullet.height}
			animationSpeed={2}
			filters={[
				new BlurFilter({
					strength: 0.8,
				}),
			]}
		/>
	);
};
