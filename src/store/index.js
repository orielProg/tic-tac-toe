import gameReducer from './game.js';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer : {game : gameReducer}
});

export default store;