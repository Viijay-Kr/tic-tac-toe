import { usePlayerContext } from "pages/contexts/Player.context";
import {
  GameFragment,
  GameType,
  OnNewGameSubscription,
  useOnNewGameSubscription,
} from "pages/__generated__/types";
import { useEffect, useState } from "react";

export const useNewGames = () => {
  const player = usePlayerContext();
  const [games, setNewGamesList] = useState<Array<GameFragment>>([]);
  const [newGames] = useOnNewGameSubscription();
  useEffect(() => {
    if (newGames.data?.onNewGame?.event) {
      setNewGamesList((prev) => {
        if (newGames.data?.onNewGame?.event)
          return [...prev, newGames.data.onNewGame.event];
        return prev;
      });
    }
  }, [newGames, player?.id]);
  return [games];
};
