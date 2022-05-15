import React, { useState } from "react";
import { Modal } from "react-responsive-modal";

import styles from "styles/Home.module.scss";
import { Grid } from "../components/Grid";
import { TextBox } from "../components/TextBox";
import gameStyles from "styles/Game.module.scss";
import { useCreatePlayerMutation } from "pages/__generated__/types";
import { GameSection } from "./GameSection";
import { usePlayer } from "pages/hooks/usePlayer";
import { usePlayerContext } from "pages/contexts/Player.context";

export const SignUp: React.FC = () => {
  const player = usePlayerContext();
  const [result, createPlayer] = useCreatePlayerMutation();
  const [name, setName] = useState<string>("");
  const onCreatePlayer = () => {
    if (name) {
      createPlayer({
        name,
      }).then((res) => {
        localStorage.setItem(
          "player_id",
          res.data?.createPlayer?.player?.id as string
        );
      });
    }
  };

  if (!result.data?.createPlayer?.player && !player?.id) {
    return (
      <Modal open={true} onClose={() => {}}>
        <div className={gameStyles["modal-body"]}>
          <h2 className={gameStyles["modal-header"]}>Choose your name</h2>
          <TextBox
            classes={[gameStyles["player-name"]]}
            onChange={(val) => setName(val)}
            placeholder={"Your name"}
          />
          <input onClick={onCreatePlayer} type="button" value="Start" />
        </div>
      </Modal>
    );
  }
  const currentPlayer = player?.name || result.data?.createPlayer?.player?.name;
  return (
    <>
      <section className={styles.game}>
        <h1 className={gameStyles["player-title"]}>Welcome {currentPlayer}</h1>
        <h2 className={gameStyles["player-sub-line"]}>
          Create your own game or join one of the idle games
        </h2>
      </section>
      <GameSection />
    </>
  );
};
