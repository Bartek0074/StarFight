export const updateMissiles = (ctx, missilesRef) => {
	missilesRef.current.forEach((missile) => missile.update(ctx));
};
