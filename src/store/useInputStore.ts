import { create } from 'zustand';

type InputStore = {
	left: boolean;
	right: boolean;
	fire: boolean;

	setLeft: (value: boolean) => void;
	setRight: (value: boolean) => void;
	setFire: (value: boolean) => void;
};

export const useInputStore = create<InputStore>((set) => ({
	left: false,
	right: false,
	fire: false,

	setLeft: (value: boolean) => {
		set({ left: value });
	},
	setRight: (value: boolean) => {
		set({ right: value });
	},
	setFire: (value: boolean) => {
		set({ fire: value });
	},
}));
