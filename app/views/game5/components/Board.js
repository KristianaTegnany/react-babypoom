import React, { useEffect, useReducer, useRef, useState } from "react";
import Card from "./Card";
import { game5Images } from "../images";
import "../scss/board.scss";
import getPhoto from "../../../../lib/get-photo";
import { connect } from "react-redux";
import { discoverType } from "../types";

function Board(props) {
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState([]);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const timeout = useRef(setTimeout(() => {}));
  const [keyFind, setKeyFind] = useState("");

  const imageToShow = [
    {
      key: discoverType.weight,
      src: game5Images[0], //memory_card_back_url_1
    },
    {
      key: discoverType.size,
      src: game5Images[1], //memory_card_back_url_2
    },
    {
      key: discoverType.birth_date,
      src: game5Images[2], //memory_card_back_url_3
    },
    {
      key: discoverType.birth_time,
      src: game5Images[3], //memory_card_back_url_4
    },
    {
      key: discoverType.gender,
      src: game5Images[4], //memory_card_back_url_5
    },
    {
      key: discoverType.baby_name,
      src: game5Images[5], //memory_card_back_url_6
    },
  ];

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (clearedCards.length === props.cardIds.length) {
      props.setFundMemoryKey("end");

      setTimeout(() => {
        props.finishGameCallback();
      }, 2500);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    // check if first card is equal second card
    if (first % 6 === second % 6) {
      props.setFundMemoryKey(keyFind);
      setClearedCards((prev) => [...prev, first, second]);
      setOpenCards([]);
      return;
    }
    // flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 1000);
  };

  const handleCardClick = (id, key) => {
    setKeyFind(key);
    if (openCards.length === 1) {
      // in this case we have alredy selected one card
      // this means that we are finishing a move
      setOpenCards((prev) => [...prev, id]);
      disable();
    } else {
      // in this case this is the first card we select
      clearTimeout(timeout.current);
      setOpenCards([id]);
    }
  };

  useEffect(() => {
    let timeout = setTimeout(() => {});
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  const checkIsFlipped = (id) => {
    return clearedCards.includes(id) || openCards.includes(id);
  };

  const checkIsInactive = (id) => {
    return clearedCards.includes(id);
  };

  const currentImage = getPhoto(props.bpoom.photo_urls, "normal");

  return (
    <div
      styleName={"board"}
      style={{
        backgroundColor: "white",
        backgroundImage: `url("${currentImage}")`,
        padding: 15,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderRadius: 4,
      }}
    >
      {props.cardIds.map((i) => {
        return (
          <Card
            key={i}
            image={imageToShow[i % 6]}
            id={i}
            isDisabled={shouldDisableAllCards}
            isInactive={checkIsInactive(i)}
            isFlipped={checkIsFlipped(i)}
            onClick={handleCardClick}
          />
        );
      })}
    </div>
  );
}

export default connect(mapStateToProps)(Board);

function mapStateToProps(state) {
  const {
    app: { bpoom },
  } = state;

  return {
    bpoom,
  };
}
