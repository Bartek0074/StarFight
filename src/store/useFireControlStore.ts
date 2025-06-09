import { create } from 'zustand';

type FireControlStore = {
	lastFireTime: number;
	tryFire: ({ cooldown }: { cooldown: number }) => boolean;
};

export const useFireControlStore = create<FireControlStore>((set, get) => ({
	lastFireTime: 0,

	tryFire: ({ cooldown }) => {
		const currentTime = Date.now();
		if (currentTime - get().lastFireTime >= cooldown) {
			set({ lastFireTime: currentTime });
			return true;
		}
		return false;
	},
}));
