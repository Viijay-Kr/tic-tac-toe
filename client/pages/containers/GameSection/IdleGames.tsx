import classNames from "classnames";
import { usePlayerContext } from "pages/contexts/Player.context";
import { useNewGames } from "pages/hooks/useNewGames";
import {
  GameType,
  useIdleGamesQuery,
  useJoinGameMutationMutation,
  useOnNewGameSubscription,
} from "pages/__generated__/types";
import React, { useEffect } from "react";
import styles from "./GameSection.module.scss";

export const IdleGames = () => {
  const player = usePlayerContext();
  const [idleGames] = useIdleGamesQuery();
  const [newGames] = useNewGames();
  const [, joinGame] = useJoinGameMutationMutation();

  const onJoinGame = (gameId?: GameType["id"]) => () => {
    if (gameId && player?.id) {
      player.subscribeForGame(gameId);
      joinGame({
        gameId,
        playerId: player?.id,
      });
    }
  };
  const idleGamesWithoutCurrentPlayer =
    idleGames.data?.idleGames
      ?.concat(newGames)
      .filter((game) => game?.owner?.id !== player?.id) || [];

  if (idleGames.data?.idleGames) {
    return (
      <div className={styles["idle-games"]}>
        <h2 className={styles["head-title"]}>Idle Games </h2>
        <div className={styles["table-section"]}>
          <div className={styles["table-head"]}>ID</div>
          <div className={styles["table-head"]}>Owner</div>
          <div className={styles["table-head"]}>Join</div>
          {idleGamesWithoutCurrentPlayer?.map((game) => {
            return (
              <React.Fragment key={"idle-games" + game?.id}>
                <div className={styles["table-item"]}>{game?.id}</div>
                <div className={styles["table-item"]}>{game?.owner?.name}</div>
                <div className={classNames(styles["table-item"])}>
                  <button
                    onClick={onJoinGame(game?.id)}
                    className={styles["join-game-btn"]}
                  >
                    Join
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};
