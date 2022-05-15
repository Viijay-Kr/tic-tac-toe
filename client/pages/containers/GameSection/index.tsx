import React from "react";
import { ActiveGames } from "./ActiveGames";
import styles from "./GameSection.module.scss";
import { IdleGames } from "./IdleGames";
import { YourGame } from "./YourGame";

export const GameSection = () => {
  return (
    <div className={styles["game-section"]}>
      <ActiveGames />
      <YourGame />
      <IdleGames />
    </div>
  );
};
