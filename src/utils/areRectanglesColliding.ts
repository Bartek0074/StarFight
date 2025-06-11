type Rect = {
	x: number;
	y: number;
	width: number;
	height: number;
};

type AreRectanglesCollidingParams = {
	a: Rect;
	b: Rect;
	margin?: number;
};

export const areRectanglesColliding = ({
	a,
	b,
	margin = 0,
}: AreRectanglesCollidingParams): boolean => {
	return (
		a.x < b.x + b.width - margin &&
		a.x + a.width > b.x + margin &&
		a.y < b.y + b.height - margin &&
		a.y + a.height > b.y + margin
	);
};
