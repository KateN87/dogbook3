import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';

import dogReducer from './reducers/dogReducer';

const store = configureStore({
    reducer: {
        dogReducer: dogReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reduxLogger),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
