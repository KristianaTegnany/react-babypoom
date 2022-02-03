import Board from "./Board";
import React, { useEffect, useState } from "react";
import "../scss/index.scss";
import { useDispatch } from "react-redux";
import { gameOverGame5 } from "../Actions";

function Game5Init(props) {
  const [cardIds, setCardIds] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
  ]);
  useEffect(() => {
    const sorted = cardIds.sort(() => 0.5 - Math.random());
    setCardIds(sorted);
  }, []);

  console.log(cardIds);
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
