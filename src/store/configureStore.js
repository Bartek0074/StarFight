import { configureStore } from '@reduxjs/toolkit';
import keys from './keys';;

const store = configureStore({
	reducer: {
		keys: keys.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;