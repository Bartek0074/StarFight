import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../data/variables';

export const updateMissiles = (ctx, missilesRef) => {
	missilesRef.current.forEach((missile, missileIndex) => {
		if (
			missile.position.y < -5 ||
			missile.position.y > CANVAS_HEIGHT + 5 ||
			missile.position.x < -5 ||
			missile.position.x > CANVAS_WIDTH + 5
		) {
			missilesRef.current.splice(missileIndex, 1);
			return;
		}
		missile.update(ctx);
	});
};
