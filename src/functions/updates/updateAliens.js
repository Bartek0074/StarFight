import froggy from '../../images/froggy.png';

export const updateAliens = (ctx, aliens) => {
	const alienImage = new Image();
	alienImage.src = froggy;

	aliens.forEach((alien) => alien.update(ctx, alienImage));
};
