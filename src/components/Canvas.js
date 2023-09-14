import React, { useEffect, useState, useRef } from 'react';
import { useCanvas } from './CanvasContext';

import { initBackground } from '../functions/inits/initBackground';
import { initLvl1 } from '../functions/inits/initLvl1.js';
import { initLvl2 } from '../functions/inits/initLvl2.js';
import { initLvl3 } from '../functions/inits/initLvl3.js';

import { checkMissileAlienCollision } from '../functions/collisions/checkMissileAlienCollision.js';
import { checkMissilePlayerCollision } from '../functions/collisions/CheckMissilePlayerCollision';

import { updateBackground } from '../functions/updates/updateBackground.js';
import { updateLvl1 } from '../functions/updates/updateLvl1';
import { updateLvl2 } from '../functions/updates/updateLvl2';
import { updateLvl3 } from '../functions/updates/updateLvl3';
import { updatePlayer } from '../functions/updates/updatePlayer.js';
import { updateAliens } from '../functions/updates/updateAliens';
import { updateMissiles } from '../functions/updates/updateMissiles.js';
import { updateShards } from '../functions/updates/updateShards.js';

import { shoot } from '../functions/actions/shoot.js';
import { alienShot } from '../functions/actions/alienShot';

import { checkWin } from '../functions/actions/checkWin';

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
	const lvl = useRef(1);
	const frames = useRef(0);

	const initAll = () => {
		initBackground(starsRef);
		initLvl1(aliensRef);

		// if ((lvl.current % 3) + 1 === 1) {
		// 	initLvl1(aliensRef);
		// } else if ((lvl.current % 3) + 1 === 2) {
		// 	initLvl2(aliensRef);
		// } else if ((lvl.current % 3) + 1 === 3) {
		// 	initLvl3(aliensRef);
		// }
	};

	const checkAll = () => {
		checkMissilePlayerCollision(missilesRef, player, shardsRef);
		checkMissileAlienCollision(missilesRef, aliensRef, shardsRef);
	};

	const updateAll = (frames) => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		updateBackground(ctx, starsRef.current);

		updateAliens(ctx, aliensRef.current, frames);

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
			frames.current++;
			if (frames.current % 30 === 0 && frames.current > 60) {
				// Functions to be callled every 30 frames (+- 0.5 second)
				alienShot(aliensRef, missilesRef);

				if (lvl.current % 3 === 1) {
					updateLvl1(frames.current, aliensRef);
				} else if (lvl.current % 3 === 2) {
					updateLvl2(frames.current, aliensRef);
				} else if (lvl.current % 3 === 0) {
					updateLvl3(frames.current, aliensRef);
				}
			}
			// console.log(frames)
			clearCanvas();

			checkAll();

			updateAll(frames.current);

			checkWin(aliensRef, lvl);

			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	useEffect(() => {
		frames.current = 0;
		if (lvl.current % 3 === 1) {
			initLvl1(aliensRef);
		} else if (lvl.current % 3 === 2) {
			initLvl2(aliensRef);
		} else if (lvl.current % 3 === 0) {
			initLvl3(aliensRef);
		}
	}, [lvl.current]);

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
