type WillBeOutOfBottomBoundsParams = {
	y: number;
	dy: number;
	height: number;
	stageHeight: number;
	margin?: number;
};

export const willBeOutOfBottomBounds = ({
	y,
	dy,
	height,
	stageHeight,
	margin = 0,
}: WillBeOutOfBottomBoundsParams): boolean => {
	return y + dy + height > stageHeight + margin;
};
