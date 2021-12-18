import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './game.js';

const store = configureStore({
    reducer : {game : gameReducer}
});

export default store;