import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { CanvasProvider } from './components/CanvasContext';

import { Provider } from 'react-redux';
import store from './store/configureStore';

import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<CanvasProvider>
			<App />
		</CanvasProvider>
	</Provider>
);
