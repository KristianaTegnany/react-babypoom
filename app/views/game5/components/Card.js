import classnames from "classnames";
import React from "react";
import { backSideImage } from "../images";
import "../scss/card.scss";

function Card(props) {
  // const backSide = "/images/backside.png";
  const backSide = backSideImage;

  const handleClick = () => {
    !props.isFlipped && !props.isDisabled && props.onClick(props.id);
  };
  console.log("image render", props.image);
  return (
    <div
      styleName={classnames("card", {
        "is-flipped": props.isFlipped,
        "is-inactive": props.isInactive,
      })}
      onClick={handleClick}
    >
      <div styleName="card-face">
        <img src={backSide} alt="card backside" />
      </div>
      <div styleName="card-face card-back-face">
        <img src={props.image} alt="card" />
      </div>
    </div>
  );
}

export default Card;
