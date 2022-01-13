import React from "react";
import "../scss/score.scss";

function Score(props) {
  return (
    <div styleName="score-container">
      <div styleName="score">
        <div>
          <span>Moves:</span> {props.moves}
        </div>
        {localStorage.getItem("bestScore") && (
          <div>
            <span>Best score:</span> {props.bestScore}
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          RESTART
        </button>
      </div>
    </div>
  );
}

export default Score;
