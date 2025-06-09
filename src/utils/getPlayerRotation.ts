type GetPlayerRotationParams = {
	rotation: number;
	left: boolean;
	right: boolean;
	minRotation: number;
	maxRotation: number;
	rotationSpeed: number;
};

export const getPlayerRotation = ({
	rotation,
	left,
	right,
	minRotation,
	maxRotation,
	rotationSpeed,
}: GetPlayerRotationParams): number => {
	if (left && !right && rotation > minRotation) {
		rotation -= rotationSpeed;
	} else if (right && !left && rotation < maxRotation) {
		rotation += rotationSpeed;
	} else if ((!left && !right) || (left && right)) {
		if (rotation > 0) {
			rotation -= rotationSpeed;
		} else if (rotation < 0) {
			rotation += rotationSpeed;
		}
	}

	return rotation;
};
