export const updateShards = (ctx, shards) => {
	shards.forEach((shard) => shard.update(ctx));
};
