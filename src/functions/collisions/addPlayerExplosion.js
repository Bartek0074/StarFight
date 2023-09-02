import Shard from '../../classes/Shard';

export const addPlayerExplosion = (player, missile, shardsRef) => {
	const numberOfShards = Math.floor(Math.random() * 10) + 10;

	const colors = [...player.colors];

	colors.push(missile.color);

	const missileVelocity = Math.sqrt(
		missile.velocity.x ** 2 + missile.velocity.y ** 2
	);

	for (let i = 0; i < numberOfShards; i++) {
		const shardVelocity = (Math.random() + 0.6) * missileVelocity;

		const shardRadius = Math.random() * 1.5 + 2;

		const randomColorsIndex = Math.floor(Math.random() * colors.length);

		const color = `${colors[randomColorsIndex]}`;

		shardsRef.current.push(
			new Shard(
				missile.position.x,
				missile.position.y,
				shardVelocity,
				shardRadius,
				color
			)
		);
	}
};
