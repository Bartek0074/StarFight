type WillBeOutOfLeftBoundsParams = {
	x: number;
	dx: number;
	margin?: number;
};

export const willBeOutOfLeftBounds = ({
	x,
	dx,
	margin = 0,
}: WillBeOutOfLeftBoundsParams): boolean => {
	return x + dx < -margin;
};
