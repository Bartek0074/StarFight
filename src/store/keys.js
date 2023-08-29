import { createSlice } from '@reduxjs/toolkit';

const keys = createSlice({
	name: 'keys',
	initialState: {
		a: { pressed: false },
		d: { pressed: false },
		k: { pressed: false },
	},
	reducers: {
		setKey: (state, action) => {
			const { key, pressed } = action.payload;

			state[key].pressed = pressed;
		},
	},
});

export const { setKey } = keys.actions;

export default keys;
