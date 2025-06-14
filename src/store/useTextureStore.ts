import { create } from 'zustand';
import { Texture } from 'pixi.js';

export type SpriteKey = 'player' | 'bulletPlayerOne' | 'enemyBugRegular';

type TextureStore = {
	isLoaded: Record<SpriteKey, boolean>;
	textures: Record<SpriteKey, Texture[]>;
	setTextures: (key: SpriteKey, textures: Texture[]) => void;
};

export const useTextureStore = create<TextureStore>((set) => ({
	isLoaded: {
		player: false,
		bulletPlayerOne: false,
		enemyBugRegular: false,
	},
	textures: {
		player: [],
		bulletPlayerOne: [],
		enemyBugRegular: [],
	},
	setTextures: (key, textures) =>
		set((state) => ({
			textures: { ...state.textures, [key]: textures },
			isLoaded: { ...state.isLoaded, [key]: true },
		})),
}));
