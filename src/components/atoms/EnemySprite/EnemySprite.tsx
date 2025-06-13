import { useEffect, useRef } from 'react';

import { extend } from '@pixi/react';
import { AnimatedSprite } from 'pixi.js';

import { useTextureStore } from '@/store';

import { type EnemyType } from '@/models';

extend({ AnimatedSprite });

export const EnemySprite = ({ enemy }: { enemy: EnemyType }) => {
	const { textures } = useTextureStore();
	const spriteRef = useRef<AnimatedSprite>(null);

	useEffect(() => {
		if (spriteRef.current && textures.enemyBugRegular && textures.enemyBugRegular.length > 0) {
			spriteRef.current.play();
			spriteRef.current.animationSpeed = 0.2;
			spriteRef.current.loop = true;
		}

		return () => {
			if (spriteRef.current) {
				spriteRef.current.stop();
			}
		};
	}, [textures.enemyBugRegular]);

	if (!textures.enemyBugRegular || textures.enemyBugRegular.length === 0) return null;

	return (
		<pixiAnimatedSprite
			ref={spriteRef}
			textures={textures.enemyBugRegular}
			x={enemy.x + enemy.width / 2}
			y={enemy.y + enemy.height / 2}
			anchor={0.5}
			rotation={(enemy.rotation * Math.PI) / 180}
			width={enemy.width}
			height={enemy.height}
			animationSpeed={2}
		/>
	);
};
