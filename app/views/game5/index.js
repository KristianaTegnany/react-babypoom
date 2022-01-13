import React from "react";
import { connect } from "react-redux";
import { defineMessages } from "react-intl";

import { gameOver, updateGuessed } from "./Actions";

import BubbleSay from "../../components/bubble-say";
import BubblePic from "../../components/bubble-pic";
import GameWin from "../game-win";
// i18n
import t from "../../i18n/i18n";

// Lib
import ascii from "../../../lib/ascii";

// CSS
// Images
import BABY_IMAGES from "../../../lib/baby-img";
import Game5Init from "./components/Game";

const SPACE_REPLACEMENT = { " ": "_" }; // insecable space

function uniqChars(str) {
  return Object.keys(
    Array.from(ascii(str || "")).reduce((h, c) => {
      h[c] = 1;
      return h;
    }, {})
  ).length;
}

let Game5 = (props) => {
  const { bpoom, desktop, win } = props;
  let babyType = bpoom.baby_full_type;
  let bubbleText = t(MSG.message);

  return win ? (
    <GameWin />
  ) : (
    <>
      {desktop ? (
        <BubbleSay speechDir="left" imgSrc={BABY_IMAGES[babyType]}>
          {bubbleText}
        </BubbleSay>
      ) : (
        <BubblePic imgSrc={BABY_IMAGES[babyType]}>{bubbleText}</BubblePic>
      )}
      <Game5Init />
    </>
  );
};

export default connect(mapStateToProps)(Game5);

function mapStateToProps(state) {
  const {
    app: { bpoom, noNav },
    game5: { win },
    mediaQueries: { desktop },
  } = state;

  return {
    bpoom,
    noNav,
    win,
    desktop,
  };
}

const MSG = defineMessages({
  message: {
    id: "game1.message",
    defaultMessage:
      "Devine mon prénom et tu verras apparaître progressivement ma première photo...",
  },
  guessed_before_next_step_header: {
    id: "game1.guessed_before_next_step_header",
    defaultMessage: "Attention",
  },
  guessed_before_next_step_body: {
    id: "game1.guessed_before_next_step_body",
    defaultMessage: "Es-tu sûr de vouloir continuer sans deviner mon prénom ?",
  },
  guessed_ok: {
    id: "game1.guessed.ok",
    defaultMessage: 'Bravo, mon prénom contient bien la lettre "{char}" !',
  },
  guessed_ko: {
    id: "game1.guessed.ko",
    defaultMessage: 'Hé non, mon prénom ne contient pas la lettre "{char}" !',
  },
});
