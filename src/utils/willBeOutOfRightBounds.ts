type WillBeOutOfRightBoundsParams = {
	x: number;
	dx: number;
	width: number;
	stageWidth: number;
};

export const willBeOutOfRightBounds = ({
	x,
	dx,
	width,
	stageWidth,
}: WillBeOutOfRightBoundsParams): boolean => {
	return x + dx + width > stageWidth;
};
