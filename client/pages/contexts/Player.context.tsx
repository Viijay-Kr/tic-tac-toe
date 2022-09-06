import { usePlayer } from "pages/hooks/usePlayer";
import {
  GameType,
  Maybe,
  PlayerByIdQuery,
  PlayerType,
} from "pages/__generated__/types";
import React, { useContext, useState } from "react";

export interface Player {
  id?: PlayerType["id"];
  name?: PlayerType["name"];
  subscribedGame?: GameType["id"] | null;
  subscribeForGame: (gameId: GameType["id"]) => void;
}

const PlayerContext = React.createContext<Player | null>(null);

export const PlayerContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [result] = usePlayer();
  const player = result.data?.playersById ?? null;
  const [subscribedGame, setSubcribeGame] = useState<GameType["id"]>("");
  return (
    <PlayerContext.Provider
      value={{
        name: player?.name,
        id: player?.id,
        subscribedGame,
        subscribeForGame: (gameId) => setSubcribeGame(gameId),
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
