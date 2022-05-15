import { Grid } from "pages/components/Grid";
import { usePlayerContext } from "pages/contexts/Player.context";
import {
  useNewGameMutationMutation,
  useOnJoinGameSubscriptionSubscription,
} from "pages/__generated__/types";
import React from "react";
import styles from "./GameSection.module.scss";

export const YourGame = () => {
  const player = usePlayerContext();
  const [circles, setCircles] = React.useState<number[]>([]);
  const [crosses, setCrosses] = React.useState<number[]>([]);
  const onBoxClick = (boxNumber: number) => {};
  const [result, createNewGame] = useNewGameMutationMutation();
  const [] = useOnJoinGameSubscriptionSubscription();
  const onNewGame = () => {
    if (player?.id) {
      createNewGame({
        playerId: player?.id,
      });
    }
  };
  return (
    <div className={styles["your-game"]}>
      <div className={styles["game-actions"]}>
        <button onClick={onNewGame} className={styles["new-game-btn"]}>
          New Game
        </button>
        <button className={styles["leave-game-btn"]}>Leave Game</button>
        <button className={styles["rematch-btn"]}>Rematch</button>
      </div>
      <Grid
        classes={styles["game-grid"]}
        circles={circles}
        crosses={crosses}
        onBoxClick={onBoxClick}
      />
      <div className={styles["current-game"]}>
        <h2 className={styles["head-title"]}>Current Game</h2>
        <div>{result.data?.createGame?.game?.player1?.name}</div>
        <div>{result.data?.createGame?.game?.player2?.name}</div>
      </div>
    </div>
  );
};
