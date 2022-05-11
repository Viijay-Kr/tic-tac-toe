import React, { useState } from "react";
import { Modal } from "react-responsive-modal";

import styles from "styles/Home.module.scss";
import { Circle } from "./Circle";
import { Cross } from "./Cross";
import { Grid } from "./Grid";
import { RadioGroup } from "./Radio/RadioGroup";
import { TextBox } from "./TextBox";
import gameStyles from "styles/Game.module.scss";
type Player =
  | {
      name: string;
      mark: "circle" | "cross" | string;
    }
  | undefined;

export const Game: React.FC = () => {
  const [circles, setCircles] = React.useState<number[]>([]);
  const [crosses, setCrosses] = React.useState<number[]>([]);
  const [player, setPlayer] = React.useState<Player>();
  const onBoxClick = (boxNumber: number) => {
    switch (player?.mark) {
      case "circle":
        setCircles([...circles, boxNumber]);
        break;
      case "cross":
        setCrosses([...crosses, boxNumber]);
        break;
      default:
        return;
    }
  };
  if (!player) {
    return <StartGame isPlayerReady={!!player} setPlayer={setPlayer} />;
  }
  return (
    <section className={styles.game}>
      <h1 className={gameStyles["player-title"]}>
        {player.name} Please wait for a player to join
      </h1>
      <h2 className={gameStyles["player-title"]}>You choose {player.mark} </h2>
      <Grid circles={circles} crosses={crosses} onBoxClick={onBoxClick} />
    </section>
  );
};

const StartGame = ({
  setPlayer,
  isPlayerReady,
}: {
  setPlayer: (player: Player) => void;
  isPlayerReady: boolean;
}) => {
  const [mark, selectMark] = useState<"cirle" | "cross" | string>("");
  const [name, setName] = useState<string>("");
  const onStartGame = () => {
    if (name && mark) {
      setPlayer({
        name,
        mark,
      });
    }
  };
  return (
    <Modal open={!isPlayerReady} onClose={() => {}}>
      <div className={gameStyles["modal-body"]}>
        <h2 className={gameStyles["modal-header"]}>
          Choose your name and your mark
        </h2>
        <TextBox
          classes={[gameStyles["player-name"]]}
          onChange={(val) => setName(val)}
          placeholder={"Your name"}
        />
        <RadioGroup
          onChange={(val) => selectMark(val)}
          values={["circle", "cross"]}
        />
        <div className={gameStyles["marks"]}>
          <Circle />
          <p>Circle</p>
          <Cross />
          <p>Cross</p>
        </div>
        <input onClick={onStartGame} type="button" value="Start" />
      </div>
    </Modal>
  );
};
