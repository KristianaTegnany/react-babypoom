import React, { useEffect, useState } from "react";

import { Game } from "../common/styles";
import { GameContainer, WinContainer } from "./styles";
import DraggableList from "./components/DraggableList";
import getPhoto from "../../../../lib/get-photo";
import { getWinContainerHeight } from "../common/utils";

export default (props) => {
  const [completed, setCompleted] = useState(false);
  const currentImage = getPhoto(props.bpoom.photo_urls, "normal");

  let content = (
    <DraggableList
      items={"1 2 3 4 5".split(" ")}
      setCompleted={setCompleted}
      img={currentImage}
    />
  );

  if (completed) {
    content = (
      <WinContainer height={getWinContainerHeight()}>
        <img src={currentImage} alt="puzzle" />
      </WinContainer>
    );
  }

  return (
    <Game size="300px" filter="1">
      <GameContainer>
        <div>{content}</div>
      </GameContainer>
    </Game>
  );
};
