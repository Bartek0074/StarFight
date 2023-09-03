import froggy from '../../images/froggy.png';

export const updateAliens = (ctx, aliens) => {
	const alienImage = new Image();

	aliens.forEach((alien) => {
		if (alien.type === 'froggy') {
			alienImage.src = froggy;
		}
		alien.update(ctx, alienImage);
	});
};
