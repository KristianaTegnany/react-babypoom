import React, { Component } from "react";
import { connect } from "react-redux";
import { defineMessages } from "react-intl";

import useTimeTracker from "../../hooks/time-tracker";

import { move, gameOver } from "./Actions";

import Button from "reactstrap/lib/Button";

import BubbleSay from "../../components/bubble-say";
import BubblePic from "../../components/bubble-pic";
import GameWin from "../game-win";

// i18n
import t from "../../i18n/i18n";

// Lib
import Ahoy from "../../../lib/ahoy-custom";
import { transformProp } from "../../../lib/css-props";
import getPhoto from "../../../lib/get-photo";

// CSS
import styles from "./styles.scss";

// Images
import BABY_IMAGES from "../../../lib/baby-img";

const SIZE = 3;

const DEFAULT = {
  puzzle: [
    [0, 8, 6],
    [2, 7, 4],
    [1, 5, 3],
  ],
  steps: [
    "8,7,6,5,4,3,2,1,0",
    "8,7,6,5,4,0,2,1,3",
    "8,7,6,5,0,4,2,1,3",
    "8,7,6,0,5,4,2,1,3",
    "8,7,6,2,5,4,0,1,3",
    "8,7,6,2,5,4,1,0,3",
    "8,7,6,2,0,4,1,5,3",
    "8,0,6,2,7,4,1,5,3",
    "0,8,6,2,7,4,1,5,3",
  ],
  stepLen: 9,
  currentX: 0,
  currentY: 0,
};

const LEVELS = { easy: 12, medium: 40, hard: 100 };
const CURRENT_LEVEL = LEVELS.easy;

let tries = 0;

let Game4 = (props) => {
  const {
    bpoom,
    desktop,
    win,
    currentX,
    currentY,
    puzzle,
    moves,
    steps,
    stepLen,
    move,
    gameOver,
  } = props;

  // Timer
  let timeTracker = useTimeTracker();

  return win ? <GameWin /> : <p>New game</p>;
};

export default connect(mapStateToProps, { move, gameOver })(Game4);

function mapStateToProps(state) {
  const {
    app: { bpoom, noNav },
    game2: { puzzle, moves, steps, stepLen, currentX, currentY, win },
    mediaQueries: { desktop },
  } = state;
  return {
    bpoom,
    noNav,
    puzzle,
    steps,
    stepLen,
    currentX,
    currentY,
    moves,
    win,
    desktop,
  };
}

const MSG = defineMessages({
  message: {
    id: "game2.message",
    defaultMessage:
      "Clique sur les cases afin de résoudre ce puzzle et je te dirai mon prénom...",
  },
  help: {
    id: "game2.help",
    defaultMessage: `Aide-moi un peu, je n'y arrive pas...`,
  },
});
