export const updateLvl2 = (frames, aliensRef) => {
	if (aliensRef?.current[0]?.type === 'froggy_boss') {
		if (frames === 300) {
			aliensRef.current[0].velocity.y = 0;
			aliensRef.current[0].mode = 'free_flying';
		} else if (frames > 300) {
			aliensRef.current[0].angle += Math.random() * 70 - 20;
		}
	}
	aliensRef.current.forEach((alien) => {
		if (alien.type !== 'froggy_boss') {
			if (frames === 420) {
				alien.mode = 'flying_through_borders'
			}
		}
	});
};
