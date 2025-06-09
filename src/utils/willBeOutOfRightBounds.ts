type WillBeOutOfRightBoundsParams = {
	x: number;
	dx: number;
	width: number;
	stageWidth: number;
	margin?: number;
};

export const willBeOutOfRightBounds = ({
	x,
	dx,
	width,
	stageWidth,
	margin = 0,
}: WillBeOutOfRightBoundsParams): boolean => {
	return x + dx + width > stageWidth + margin;
};
