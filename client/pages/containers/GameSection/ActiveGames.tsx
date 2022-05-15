import classNames from "classnames";
import { usePlayerContext } from "pages/contexts/Player.context";
import { useYourGamesQuery } from "pages/__generated__/types";
import React from "react";
import styles from "./GameSection.module.scss";

export const ActiveGames = () => {
  const player = usePlayerContext();
  const [yourGames] = useYourGamesQuery({
    variables: {
      playerId: player?.id,
    },
  });
  return (
    <div className={styles["active-games"]}>
      <h2 className={styles["head-title"]}>Your Active Games</h2>
      <div className={styles["table-section"]}>
        <div className={styles["table-head"]}>ID</div>
        <div className={styles["table-head"]}>Name</div>
        <div className={styles["table-head"]}>Subscribe</div>
        {yourGames.data?.activeGamesOfPlayer?.map((game) => {
          return (
            <React.Fragment key={"active-game" + game?.id}>
              <div className={styles["table-item"]}>{game?.id}</div>
              <div className={styles["table-item"]}>{game?.player1?.name}</div>
              <div className={classNames(styles["table-item"])}>
                <button className={styles["subscribe-btn"]}>Subscribe</button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
