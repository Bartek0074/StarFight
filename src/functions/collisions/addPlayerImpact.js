import Shard from '../../classes/Shard';

export const addPlayerImpact = (player, missile, shardsRef) => {
	const numberOfShards = Math.floor(Math.random() * 5) + 5;

	const colors = [...player.colors];

	colors.push(missile.color);

	const missileVelocity = Math.sqrt(
		missile.velocity.x ** 2 + missile.velocity.y ** 2
	);

	for (let i = 0; i < numberOfShards; i++) {
		const shardVelocity = (Math.random() * 0.8 + 0.4) * missileVelocity;

		const shardRadius = Math.random() * 1.2 + 1.8;

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
