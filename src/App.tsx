import { useEffect } from 'react';
import { Game } from './components/Game/Game';
import { useInputStore } from './store/useInputStore';

function App() {
	const { setLeft, setRight, setFire } = useInputStore();

	useEffect(() => {
		const setKey = (event: KeyboardEvent, value: boolean) => {
			const key = event.key.toLowerCase();
			if (key === 'a') setLeft(value);
			else if (key === 'd') setRight(value);
			else if (key === 'k') setFire(value);
		};

		const handleKeyDown = (e: KeyboardEvent) => setKey(e, true);
		const handleKeyUp = (e: KeyboardEvent) => setKey(e, false);

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	return (
		<div>
			<Game />
		</div>
	);
}

export default App;
