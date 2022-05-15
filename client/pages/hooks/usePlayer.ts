import { usePlayerByIdQuery } from "pages/__generated__/types";

export const usePlayer = () => {
  const isServer = typeof window === "undefined";
  const [result] = usePlayerByIdQuery({
    variables: {
      id: isServer
        ? undefined
        : parseInt(localStorage.getItem("player_id") ?? "-1", 10) ?? undefined,
    },
  });
  return [result];
};
