export const areRectanglesColliding = (rect1, rect2) => {
	// rect1 i rect2 to obiekty reprezentujące prostokąty w formie { x, y, width, height }

	if (
		rect1.x < rect2.x + rect2.width &&
		rect1.x + rect1.width > rect2.x &&
		rect1.y < rect2.y + rect2.height &&
		rect1.y + rect1.height > rect2.y
	) {
		// Prostokąty przecinają się
		return true;
	} else {
		// Prostokąty nie przecinają się
		return false;
	}
};
