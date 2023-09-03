import Shard from '../../classes/Shard';

export const addBossExplosion = (alien, missile, shardsRef) => {
	const numberOfShards = Math.floor(Math.random() * 25) + 25;

	const colors = [...alien.colors];

	colors.push(missile.color);

	const missileVelocity = Math.sqrt(
		missile.velocity.x ** 2 + missile.velocity.y ** 2
	);

	for (let i = 0; i < numberOfShards; i++) {
		const shardVelocity = (Math.random() * 2 + 0.3) * missileVelocity;

		const shardRadius = Math.random() * 4 + 1.5;

		const randomColorsIndex = Math.floor(Math.random() * colors.length);

		const color = `${colors[randomColorsIndex]}`;

		shardsRef.current.push(
			new Shard(
				alien.position.x + alien.width / 2,
				alien.position.y + alien.height / 2,
				shardVelocity,
				shardRadius,
				color
			)
		);
	}
};
