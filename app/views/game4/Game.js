import React from "react";
import useRouter from "./hooks/useRouter";
import { ImagesProvider } from "./contexts/ImagesContext";
import Puzzle from "./features/Puzzle/Puzzle";

const PuzzleGameInit = (props) => {
  return (
    <ImagesProvider
      r={require.context(
        "./features/Puzzle/images/",
        false,
        /\.(png|jpe?g|svg)$/
      )}
    >
      <Puzzle {...props} />
    </ImagesProvider>
  );
};

export default PuzzleGameInit;
