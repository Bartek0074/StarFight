export const constants = {
	stage: {
		width: 800,
		height: 600,
		bulletMargin: 100,
	},
	player: {
		width: 50,
		height: 60,
		speed: 2.5,
		rotationSpeed: 1,
		minRotation: -5,
		maxRotation: 5,
		swingAmplitudeY: 4,
		swingFrequencyY: 0.0025,
		frictionFactor: 0.05,
		accelerationFactor: 0.05,
	},
	enemy: {
		regular: {
			width: 50,
			height: 50,
			speed: 2.5,
		},
		boss: {
			width: 100,
			height: 100,
			speed: 1.5,
		},
	},
	sounds: {
		bulletOneShot: '/sounds/bullet/one/shot.mp3',
	},
	frames: {
		player: [
			'/images/player/1.png',
			'/images/player/2.png',
			'/images/player/3.png',
			'/images/player/4.png',
			'/images/player/5.png',
			'/images/player/6.png',
			'/images/player/7.png',
			'/images/player/8.png',
			'/images/player/9.png',
			'/images/player/10.png',
			'/images/player/11.png',
			'/images/player/12.png',
			'/images/player/13.png',
		],
		enemy: {
			regular: {
				bug: [
					'/images/enemy/regular/bug/1.png',
					'/images/enemy/regular/bug/2.png',
				],
			},
		},
		bulletPlayerOne: ['/images/bullet/player/one/1.png'],
	},
};
