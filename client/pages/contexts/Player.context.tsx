import { usePlayer } from "pages/hooks/usePlayer";
import { PlayerByIdQuery, PlayerType } from "pages/__generated__/types";
import React, { useContext } from "react";

export type Player = PlayerByIdQuery["playersById"];

const PlayerContext = React.createContext<Player | null>(null);

export const PlayerContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [result] = usePlayer();
  const player = result.data?.playersById ?? null;
  return (
    <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
