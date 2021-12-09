import { createSlice } from "@reduxjs/toolkit";
import { isTie, judge } from "../game/game_utils";

const initialGameState = {
  gameStatus: "on",
  gameTable: ["", "", "", "", "", "", "", "", ""],
  turn: "x",
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialGameState,
  reducers: {
    mark(state, action) {
      const index = action.payload.place;
      state.gameTable[index] = state.turn;
      const winner = judge(state);
      const tie = isTie(state.gameTable);
      if(winner) state.gameStatus = state.turn;
      if (tie && !winner) state.gameStatus = 'tie';
      state.turn = state.turn === "x" ? "o" : "x";
    },
    resetGame(state){
        state.gameStatus = initialGameState.gameStatus;
        state.gameTable = initialGameState.gameTable;
        state.turn = initialGameState.turn;
    }
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
