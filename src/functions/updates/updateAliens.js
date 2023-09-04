export const updateAliens = (ctx, aliens, frames) => {
	// 6 fps
	if (frames % 10 === 0) {
		aliens.forEach((alien) => {
			alien.frameIndex = (alien.frameIndex + 1) % alien.frames.length;
			alien.img.src = alien.frames[alien.frameIndex];
		});
	}

	aliens.forEach((alien) => {
		alien.update(ctx);
	});
};
