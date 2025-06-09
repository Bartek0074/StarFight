type GetSwingYParams = {
	baseY: number;
	swingFrequency: number;
	swingAmplitude: number;
};

export const getSwingY = ({
	baseY,
	swingFrequency,
	swingAmplitude,
}: GetSwingYParams): number => {
	return baseY + Math.sin(Date.now() * swingFrequency) * swingAmplitude;
};
