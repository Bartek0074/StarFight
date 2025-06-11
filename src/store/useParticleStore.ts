import { create } from 'zustand';

import type { ParticleType } from '@/models';

type ParticleStoreType = {
	particles: ParticleType[];
	addParticle: (particle: ParticleType) => void;
	updateParticles: () => void;
	makeExplosion: (
		x: number,
		y: number,
		options: {
			minCount: number;
			maxCount: number;
			minRadius: number;
			maxRadius: number;
			minSpeed: number;
			maxSpeed: number;
			colors: number[];
		}
	) => void;
};

export const useParticleStore = create<ParticleStoreType>((set, get) => ({
	particles: [],

	addParticle: (particle) => {
		set((state) => ({
			particles: [...state.particles, particle],
		}));
	},

	updateParticles: () => {
		const updatedParticles = get()
			.particles.map((p) => ({
				...p,
				x: p.x + p.dx,
				y: p.y + p.dy,
				dx: p.dx * 0.97,
				dy: p.dy * 0.97,
				radius: p.radius * 0.98,
				opacity: p.opacity * 0.96,
			}))
			.filter((p) => p.opacity > 0.01);

		set({ particles: updatedParticles });
	},

	makeExplosion: (
		x,
		y,
		{ minCount, maxCount, minRadius, maxRadius, minSpeed, maxSpeed, colors }
	) => {
		const count =
			Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
		const { addParticle } = get();

		for (let i = 0; i < count; i++) {
			const angle = Math.random() * Math.PI * 2;
			const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
			const radius = Math.random() * (maxRadius - minRadius) + minRadius;
			const color = colors[Math.floor(Math.random() * colors.length)];

			addParticle({
				x,
				y,
				dx: Math.cos(angle) * speed,
				dy: Math.sin(angle) * speed,
				radius,
				opacity: 1,
				color,
			});
		}
	},
}));
