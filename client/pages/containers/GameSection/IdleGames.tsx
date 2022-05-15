import classNames from "classnames";
import { usePlayerContext } from "pages/contexts/Player.context";
import {
  useIdleGamesQuery,
  useOnNewGameSubscriptionSubscription,
} from "pages/__generated__/types";
import React, { useEffect } from "react";
import styles from "./GameSection.module.scss";

export const IdleGames = () => {
  const player = usePlayerContext();
  const [idleGames] = useIdleGamesQuery();
  const [newGames] = useOnNewGameSubscriptionSubscription();
  const [newGamesList, setNewGamesList] = React.useState<any[]>([]);
  useEffect(() => {
    if (
      newGames.data?.onNewGame?.event &&
      newGames.data.onNewGame.event.player1?.id !== player?.id
    ) {
      setNewGamesList((prev) => [...prev, newGames.data?.onNewGame?.event]);
    }
  }, [newGames, player?.id]);

  if (idleGames.data?.idleGames) {
    return (
      <div className={styles["idle-games"]}>
        <h2 className={styles["head-title"]}>Idle Games </h2>
        <div className={styles["table-section"]}>
          <div className={styles["table-head"]}>ID</div>
          <div className={styles["table-head"]}>Player 1</div>
          <div className={styles["table-head"]}>Join</div>
          {idleGames.data.idleGames
            .filter((g) => g?.player1?.id !== player?.id)
            .map((game) => {
              return (
                <React.Fragment key={"idle-games" + game?.id}>
                  <div className={styles["table-item"]}>{game?.id}</div>
                  <div className={styles["table-item"]}>
                    {game?.player1?.name}
                  </div>
                  <div className={classNames(styles["table-item"])}>
                    <button className={styles["join-game-btn"]}>Join</button>
                  </div>
                </React.Fragment>
              );
            })}

          {newGamesList.map((newGame) => (
            <React.Fragment key={newGame.id}>
              <div className={styles["table-item"]}>{newGame?.id}</div>
              <div className={styles["table-item"]}>
                {newGame?.player1?.name}
              </div>
              <div className={classNames(styles["table-item"])}>
                <button className={styles["join-game-btn"]}>Join</button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
  return null;
};
