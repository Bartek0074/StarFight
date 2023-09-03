export const updateAliens = (ctx, aliens) => {
	aliens.forEach((alien) => {
		alien.update(ctx);
	});
};
