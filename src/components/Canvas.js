import React, { useEffect, useState, useRef } from 'react';
import { useCanvas } from './CanvasContext';

import { initBackground } from '../functions/inits/initBackground';
import { initAliens } from '../functions/inits/initAliens.js';

import { checkMissileAlienCollision } from '../functions/collisions/checkMissileAlienCollision.js';

import { updateBackground } from '../functions/updates/updateBackground.js';
import { updatePlayer } from '../functions/updates/updatePlayer.js';
import { updateAliens } from '../functions/updates/updateAliens';
import { updateMissiles } from '../functions/updates/updateMissiles.js';
import { updateShards } from '../functions/updates/updateShards.js';

import { shoot } from '../functions/actions/shoot.js';

import Player from '../classes/Player';

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

	const starsRef = useRef([]);

	const shardsRef = useRef([]);

	const missilesRef = useRef([]);

	let aliensRef = useRef([]);

	const initAll = () => {
		initBackground(starsRef);
		initAliens(aliensRef);
	};

	const checkAll = () => {
		checkMissileAlienCollision(missilesRef, aliensRef, shardsRef);
	};

	const updateAll = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		updateBackground(ctx, starsRef.current);

		updateAliens(ctx, aliensRef.current);

		setPlayerPosition({ x: player.position.x, y: player.position.y });

		updatePlayer(ctx, keysRef.current, player);

		updateMissiles(ctx, missilesRef);

		updateShards(ctx, shardsRef);
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

		initAll();

		const animate = () => {
			clearCanvas();

			checkAll();

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
			<canvas style={{ border: '1px solid yellow' }} ref={canvasRef} />
			{missilesRef?.current?.map((missile, index) => (
				<p key={index}>{index}</p>
			))}
		</div>
	);
}
