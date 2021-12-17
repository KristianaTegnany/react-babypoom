import React from "react";
import { connect } from "react-redux";
import { defineMessages } from "react-intl";

import BubbleSay from "../../components/bubble-say";
import BubblePic from "../../components/bubble-pic";
import GameWin from "../game-win";

// i18n
import t from "../../i18n/i18n";

import PuzzleGameInit from "./Game";
import BABY_IMAGES from "../../../lib/baby-img";

let Game4 = (props) => {
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
      <PuzzleGameInit bpoom={bpoom} />
    </>
  );
};

export default connect(mapStateToProps, )(Game4);

function mapStateToProps(state) {
  const {
    app: { bpoom },
    game4: { win },
    mediaQueries: { desktop },
  } = state;
  return {
    bpoom,
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
