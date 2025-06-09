type WillBeOutOfLeftBoundsParams = {
	x: number;
	dx: number;
};

export const willBeOutOfLeftBounds = ({
	x,
	dx,
}: WillBeOutOfLeftBoundsParams): boolean => {
	return x + dx < 0;
};
