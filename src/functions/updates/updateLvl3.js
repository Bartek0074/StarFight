export const updateLvl3 = (frames, aliensRef) => {
	if (frames === 90) {
		for (let i = 0; i < 4; i++) {
			setTimeout(() => {
				aliensRef.current.forEach((alien) => {
					alien.mode = 'free_flying';
				});
			}, 2250 + i * 4000);
		}
		setTimeout(() => {
			aliensRef.current.forEach((alien) => {
				alien.mode = 'free_flying';
			});
		}, 16000);
	}

	aliensRef.current.forEach((alien) => {
		if (frames % 60 === 0 && alien.mode === 'free_flying') {
			alien.angle += Math.random() * 70 - 20;
		}
	});
};
