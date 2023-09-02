import Shard from '../../classes/Shard';

export const addPlayerExplosion = (player, missile, shardsRef) => {
	const numberOfShards = Math.floor(Math.random() * 500);

	const colors = [...player.colors];

	colors.push(missile.color);

	const missileVelocity = Math.sqrt(
		missile.velocity.x ** 2 + missile.velocity.y ** 2
	);

	for (let i = 0; i < numberOfShards; i++) {
		const shardVelocity = (Math.random() * 4 + 0.125) * missileVelocity;

		const shardRadius = Math.random() * 5 + 1;

		const randomColorsIndex = Math.floor(Math.random() * colors.length);

		const color = `${colors[randomColorsIndex]}`;

		shardsRef.current.push(
			new Shard(
				player.position.x + player.width / 2,
				player.position.y + player.height / 2,
				shardVelocity,
				shardRadius,
				color
			)
		);
	}
};
