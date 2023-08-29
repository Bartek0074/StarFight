import React, { useContext, useRef } from 'react';

import { CANVAS_WIDTH } from '../data/variables';
import { CANVAS_HEIGHT } from '../data/variables';

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);

	const prepareCanvas = () => {
		const canvas = canvasRef.current;
		canvas.width = CANVAS_WIDTH * 2;
		canvas.height = CANVAS_HEIGHT * 2;
		canvas.style.width = `${CANVAS_WIDTH}px`;
		canvas.style.height = `${CANVAS_HEIGHT}px`;

		const ctx = canvas.getContext('2d');
		ctx.scale(2, 2);
		ctx.lineCap = 'round';
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 2;
		contextRef.current = ctx;
	};

	const clearCanvas = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = '#040404';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	};

	return (
		<CanvasContext.Provider
			value={{
				canvasRef,
				contextRef,
				prepareCanvas,
				clearCanvas,
			}}
		>
			{children}
		</CanvasContext.Provider>
	);
};

export const useCanvas = () => useContext(CanvasContext);
