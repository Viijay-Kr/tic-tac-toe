import classNames from "classnames";
import { usePlayerContext } from "pages/contexts/Player.context";
import { useNewGames } from "pages/hooks/useNewGames";
import {
  GameType,
  useYourGamesQuery,
  YourGamesQuery,
} from "pages/__generated__/types";
import React, { useMemo } from "react";
import styles from "./GameSection.module.scss";

export const ActiveGames = () => {
  const player = usePlayerContext();
  const [newGames] = useNewGames();
  const [yourGames] = useYourGamesQuery({
    variables: {
      playerId: player?.id,
    },
  });
  const subscribeToGame = (gameId?: GameType["id"]) => () =>
    gameId && player?.subscribeForGame(gameId);
  const unsubscribeFromGame = () => player?.subscribeForGame("");
  const activeGamesOfPlayer = yourGames.data?.activeGamesOfPlayer
    ?.concat(newGames)
    .filter((game) => game?.owner?.id === player?.id);
  return (
    <div className={styles["active-games"]}>
      <h2 className={styles["head-title"]}>Your Active Games</h2>
      <div className={styles["table-section"]}>
        <div className={styles["table-head"]}>ID</div>
        <div className={styles["table-head"]}>Owner</div>
        <div className={styles["table-head"]}>Subscribe</div>
        {activeGamesOfPlayer?.map((game) => {
          return (
            <React.Fragment key={"active-game" + game?.id}>
              <div className={styles["table-item"]}>{game?.id}</div>
              <div className={styles["table-item"]}>{game?.owner?.name}</div>
              <div className={classNames(styles["table-item"])}>
                <button
                  onClick={
                    player?.subscribedGame === game?.id
                      ? unsubscribeFromGame
                      : subscribeToGame(game?.id)
                  }
                  className={styles["subscribe-btn"]}
                >
                  {player?.subscribedGame === game?.id
                    ? "Unsubscribe"
                    : "Subscribe"}
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
