type GetPlayerDxParams = {
	dx: number;
	left: boolean;
	right: boolean;
	speed: number;
	accelerationFactor: number;
	frictionFactor: number;
};

export const getPlayerDx = ({
	dx,
	left,
	right,
	speed,
	accelerationFactor,
	frictionFactor,
}: GetPlayerDxParams): number => {
	let newDx = dx;

	if (left && !right) {
		newDx -= accelerationFactor * speed;
	} else if (right && !left) {
		newDx += accelerationFactor * speed;
	} else {
		if (newDx > 0) {
			newDx = Math.max(0, newDx - frictionFactor * speed);
		} else if (newDx < 0) {
			newDx = Math.min(0, newDx + frictionFactor * speed);
		}
	}

	newDx = Math.max(-speed, Math.min(speed, newDx));

	return newDx;
};
