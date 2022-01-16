import Score from "./Score";
import Board from "./Board";
import React, { useState } from "react";
import "../scss/index.scss";
import { useDispatch } from "react-redux";
import { gameOverGame5 } from "../Actions";

const cardIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
cardIds.sort(() => 0.5 - Math.random());

function Game5Init(props) {
  const dispatch = useDispatch();

  const finishGameCallback = () => {
    dispatch(gameOverGame5());
  };

  return (
    <div styleName="app-container">
      <Board
        finishGameCallback={finishGameCallback}
        cardIds={cardIds}
        setFundMemoryKey={props.setFundMemoryKey}
      />
    </div>
  );
}

export default Game5Init;
