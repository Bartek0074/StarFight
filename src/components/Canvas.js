import React, { useEffect, useState, useRef } from 'react';
import { useCanvas } from './CanvasContext';

import { updatePlayer } from '../functions/updatePlayer.js';
import { updateMissiles } from '../functions/updateMissiles.js';
import { shoot } from '../functions/shoot.js';

import Player from '../classes/Player';
import Missile from '../classes/Missile';

export function Canvas() {
	// to redux
	const SHOOT_COOLDOWN_TIME = 250;
	//

	const { canvasRef, prepareCanvas, clearCanvas } = useCanvas();

	const keysRef = useRef({
		a: { pressed: false },
		d: { pressed: false },
		k: { pressed: false },
	});

	const [shootCooldown, setShootCooldown] = useState(false);

	const player = new Player();

	const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

	const missilesRef = useRef([]);

	const updateAll = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		setPlayerPosition({ x: player.position.x, y: player.position.y });

		updatePlayer(ctx, keysRef.current, player);

		updateMissiles(ctx, missilesRef);
	};

	useEffect(() => {
		function handleKeyDown({ keyCode }) {
			switch (keyCode) {
				case 65:
					keysRef.current.a.pressed = true;
					break;
				case 68:
					keysRef.current.d.pressed = true;
					break;
				case 75:
					keysRef.current.k.pressed = true;
					break;
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		//  Clean up
		return function cleanup() {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	useEffect(() => {
		function handleKeyUp({ keyCode }) {
			switch (keyCode) {
				case 65:
					keysRef.current.a.pressed = false;
					break;
				case 68:
					keysRef.current.d.pressed = false;
					break;
				case 75:
					keysRef.current.k.pressed = false;
					break;
			}
		}

		document.addEventListener('keyup', handleKeyUp);

		//  Clean up
		return function cleanup() {
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	useEffect(() => {
		let animationFrameId;

		prepareCanvas();

		const animate = () => {
			clearCanvas();

			updateAll();

			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	useEffect(() => {
		setShootCooldown(true);

		if (shootCooldown === false && keysRef.current.k.pressed) {
			shoot(playerPosition, missilesRef);
		}
	}, [keysRef.current.k.pressed]);

	useEffect(() => {
		setTimeout(() => {
			setShootCooldown(false);
		}, SHOOT_COOLDOWN_TIME);
	}, [shootCooldown]);

	return (
		<div>
			<canvas style={{ border: '1px solid yellow' }} ref={canvasRef} />;
			{missilesRef?.current?.map((missile, index) => (
				<p key={index}>{index}</p>
			))}
		</div>
	);
}
