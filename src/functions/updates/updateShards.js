export const updateShards = (ctx, shardsRef) => {
	shardsRef.current.forEach((shard, shardIndex) => {
		if (shard.alpha < 0) {
			shardsRef.current.splice(shardIndex, 1);
			return;
		}

		shard.update(ctx);
	});
};
