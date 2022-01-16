import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { defineMessages, FormattedDate } from "react-intl";
import BubbleSay from "../../components/bubble-say";
import BubblePic from "../../components/bubble-pic";
import GameWin from "../game-win";
// i18n
import t from "../../i18n/i18n";

// CSS
import "animate.css";
// Images
import BABY_IMAGES from "../../../lib/baby-img";

import Game5Init from "./components/Game";
import { discoverType } from "./types";

let Game5 = (props) => {
  const { bpoom, desktop, win } = props;
  let babyType = bpoom.baby_full_type;
  const getTextToShow = (index) => {
    switch (index) {
      case "start":
        return t(MSG.game5_start);
      case "end":
        return t(MSG.game5_end);
      case discoverType.weight:
        return t(MSG.game5_weight, {
          weight:
            bpoom.weight && bpoom.weight_unit
              ? `${bpoom.weight} ${bpoom.weight_unit}`
              : "",
        });
      case discoverType.size:
        return t(MSG.game5_size, {
          size:
            bpoom.size && bpoom.size_unit
              ? `${bpoom.size} ${bpoom.size_unit}`
              : "",
        });
      case discoverType.birth_date:
        return t(MSG.game5_birth_date, {
          birth_date: birthday(bpoom.birthday),
        });
      case discoverType.birth_time:
        return t(MSG.game5_birth_time, {
          birth_time: birthtime(bpoom.birth_time),
        });
      case discoverType.gender:
        return t(MSG.game5_gender, { gender: getText(bpoom, "gender") });
      case discoverType.baby_name:
        return t(MSG.game5_baby_name, {
          baby_name: (bpoom.baby_name || "").trim(),
        });
    }
  };

  const [gameText, setGameText] = useState("");
  const [fundMemoryKey, setFundMemoryKey] = useState("start");
  const animationRef = useRef(null);
  const bubbleAnimationRef = useRef(null);

  useEffect(() => {
    const text = getTextToShow(fundMemoryKey);
    setGameText(text);

    //remove and reassign animation
    const el = animationRef.current;
    const el2 = animationRef.current;
    removeAndReassignElementAnimation(el);
    removeAndReassignElementAnimation(el2);
  }, [fundMemoryKey]);

  const removeAndReassignElementAnimation = (el) => {
    el.setAttribute("class", "animate__animated animate__tada animate__slow");
    el.addEventListener("animationend", function () {
      el.setAttribute("class", "");
    });
  };

  console.log("props--->", bpoom);

  return win ? (
    <GameWin />
  ) : (
    <>
      {desktop ? (
        <BubbleSay speechDir="left" imgSrc={BABY_IMAGES[babyType]}>
          <div ref={animationRef}>{gameText}</div>
        </BubbleSay>
      ) : (
        <BubblePic imgSrc={BABY_IMAGES[babyType]}>
          <div ref={bubbleAnimationRef}>{gameText}</div>
        </BubblePic>
      )}
      <Game5Init setFundMemoryKey={setFundMemoryKey} />
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
  game5_start: {
    id: "game5.start",
    defaultMessage:
      "Faisons connaissance grâce au jeu bien connu du Memorie ;)",
  },
  game5_end: {
    id: "game5.end",
    defaultMessage: "Félicitations! Me voilà en photo!",
  },
  game5_weight: {
    id: "game5.weight.ok",
    defaultMessage: "Bravo, je pesais {weight} à la naissance!",
  },
  game5_size: {
    id: "game5.size.ok",
    defaultMessage: "Bravo, je mesure {size}",
  },
  game5_birth_date: {
    id: "game5.birth_date.ok",
    defaultMessage: "Bravo, je suis né le {birth_date}",
  },
  game5_birth_time: {
    id: "game5.birth_time.ok",
    defaultMessage: "Félicitation! je suis né à {birth_time}",
  },
  game5_gender: {
    id: "game5.gender.ok",
    defaultMessage: "Félicitation! Eh oui je suis {gender}",
  },
  game5_baby_name: {
    id: "game5.baby_name.ok",
    defaultMessage: "Félicitation! Je me prénome {baby_name}",
  },
  gender_F: {
    id: "gender.F",
    defaultMessage: "une petite fille",
  },
  gender_M: {
    id: "gender.M",
    defaultMessage: "un petit garçon",
  },
});

function getText(info, attrName, msgName) {
  let attr = info[attrName];
  if (!attr) return "";
  let msg = MSG[`${msgName || attrName}_${attr}`];
  return msg ? t(msg) : "";
}

function birthday(date) {
  if (!date) return "";
  let attrs = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  return <FormattedDate value={new Date(date)} {...attrs} />;
}

function birthtime(time) {
  const splitted = time.split(":");
  return splitted[0] + "h" + splitted[1];
}
