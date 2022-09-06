import { Circle } from "pages/components/Circle";
import { Cross } from "pages/components/Cross";
import { Grid } from "pages/components/Grid";
import { usePlayerContext } from "pages/contexts/Player.context";
import {
  useNewGameMutationMutation,
  useOnJoinGameSubscription,
  useStartGameMutation,
} from "pages/__generated__/types";
import React, { useEffect } from "react";
import styles from "./GameSection.module.scss";

export const YourGame = () => {
  const player = usePlayerContext();
  const [circles, setCircles] = React.useState<number[]>([]);
  const [crosses, setCrosses] = React.useState<number[]>([]);
  const onBoxClick = (boxNumber: number) => {};
  const [, createNewGame] = useNewGameMutationMutation();
  const [onJoinGame] = useOnJoinGameSubscription({
    variables: {
      gameId: player?.subscribedGame ?? "",
    },
  });
  const onNewGame = () => {
    if (player?.id) {
      createNewGame({
        playerId: player?.id,
      });
    }
  };

  const owner = onJoinGame.data?.onJoinGame?.event?.owner;
  const opponent = onJoinGame.data?.onJoinGame?.event?.opponent;

  const areYouOwner = player?.id === owner?.id;
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
      {player?.subscribedGame && (
        <div className={styles["current-game"]}>
          <h2 className={styles["head-title"]}>Current Game</h2>
          {!owner || (!opponent && <span>Waiting for Player to join</span>)}
          {owner && opponent && (
            <span>
              {areYouOwner
                ? `Your are hosting ${opponent.name}`
                : `You joined ${owner.name}'s game`}
            </span>
          )}
          {owner && (
            <div className={styles["player-marks"]}>
              {owner.name}
              {/* {getMark(player1Mark)} */}
            </div>
          )}
          {opponent && (
            <div className={styles["player-marks"]}>
              {opponent.name}
              {/* {getMark(player2Mark)} */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
