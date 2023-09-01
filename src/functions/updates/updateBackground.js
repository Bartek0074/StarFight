export const updateBackground = (ctx, stars) => {
	stars.forEach((star) => star.update(ctx));
};
