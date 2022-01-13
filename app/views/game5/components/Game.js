import Score from "./Score";
import Board from "./Board";
import React, { useState } from "react";
import "../scss/index.scss";
import { useDispatch } from "react-redux";
import { gameOverGame5 } from "../Actions";

const cardIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
cardIds.sort(() => 0.5 - Math.random());
console.log(cardIds);

function Game5Init() {
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(
    parseInt(localStorage.getItem("bestScore") || "0") ||
      Number.MAX_SAFE_INTEGER
  );
  const dispatch = useDispatch();

  const finishGameCallback = () => {
    const newBestScore = moves < bestScore ? moves : bestScore;
    setBestScore(newBestScore);
    localStorage.setItem("bestScore", "" + newBestScore);

    dispatch(gameOverGame5());
  };

  return (
    <div styleName="app-container">
      <Board
        setMoves={setMoves}
        finishGameCallback={finishGameCallback}
        cardIds={cardIds}
      />
    </div>
  );
}

export default Game5Init;
