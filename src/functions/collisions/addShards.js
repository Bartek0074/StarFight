import Shard from '../../classes/Shard';

export const addShards = (alien, missile, shardsRef) => {
	console.log(shardsRef.current);

	const numberOfShards = Math.floor(Math.random() * 9);

	const colors = [...alien.explosionColors];

	colors.push(missile.color);

	const missileVelocity = Math.sqrt(
		missile.velocity.x ** 2 + missile.velocity.y ** 2
	);

	for (let i = numberOfShards; i < 11; i++) {
		const shardVelocity = (Math.random() * 0.7 + 0.3) * missileVelocity;

		const shardRadius = Math.random() + 1.5;

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
