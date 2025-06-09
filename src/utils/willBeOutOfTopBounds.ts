type WillBeOutOfTopBoundsParams = {
	y: number;
	dy: number;
	margin?: number;
};

export const willBeOutOfTopBounds = ({
	y,
	dy,
	margin = 0,
}: WillBeOutOfTopBoundsParams): boolean => {
	return y + dy < -margin;
};
