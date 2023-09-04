export const checkWin = (aliensRef, lvl) => {
	if (aliensRef.current.length === 0) {
		lvl.current += 1;
	}
};
