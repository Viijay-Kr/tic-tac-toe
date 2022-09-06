import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
};

export type CreateGame = {
  game?: Maybe<GameType>;
};

export type CreatePlayer = {
  player?: Maybe<PlayerType>;
};

/** An enumeration. */
export enum GameOpponentMark {
  /** Circle */
  Circle = 'CIRCLE',
  /** Cross */
  Cross = 'CROSS'
}

/** An enumeration. */
export enum GameOwnerMark {
  /** Circle */
  Circle = 'CIRCLE',
  /** Cross */
  Cross = 'CROSS'
}

export type GamePlayMutation = {
  message?: Maybe<Scalars['String']>;
};

export type GamePlaySubscription = {
  game?: Maybe<GameType>;
  grid?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
};

/** An enumeration. */
export enum GameStatus {
  /** Active */
  Active = 'ACTIVE',
  /** Finished */
  Finished = 'FINISHED',
  /** Idle */
  Idle = 'IDLE',
  /** In Progress */
  InProgress = 'IN_PROGRESS'
}

export type GameType = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  opponent?: Maybe<PlayerType>;
  opponentMark: GameOpponentMark;
  owner?: Maybe<PlayerType>;
  ownerMark: GameOwnerMark;
  playersCount: Scalars['Int'];
  status: GameStatus;
  updatedAt: Scalars['DateTime'];
};

export type JoinGameMutation = {
  game?: Maybe<GameType>;
};

export type JoinGameSubscription = {
  event?: Maybe<GameType>;
};

export type Mutation = {
  createGame?: Maybe<CreateGame>;
  createPlayer?: Maybe<CreatePlayer>;
  gamePlay?: Maybe<GamePlayMutation>;
  joinGame?: Maybe<JoinGameMutation>;
};


export type MutationCreateGameArgs = {
  player1: Scalars['ID'];
};


export type MutationCreatePlayerArgs = {
  name: Scalars['String'];
};


export type MutationGamePlayArgs = {
  gameId: Scalars['ID'];
  playerId: Scalars['ID'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};


export type MutationJoinGameArgs = {
  gameId: Scalars['ID'];
  playerId: Scalars['ID'];
};

export type NewGameSubscription = {
  event?: Maybe<GameType>;
};

/** An enumeration. */
export enum PlayerStatus {
  /** Finished */
  Finished = 'FINISHED',
  /** Idle */
  Idle = 'IDLE',
  /** Playing */
  Playing = 'PLAYING',
  /** Waiting */
  Waiting = 'WAITING'
}

export type PlayerType = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  opponent: Array<GameType>;
  owner: Array<GameType>;
  status: PlayerStatus;
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  activeGamesOfPlayer?: Maybe<Array<Maybe<GameType>>>;
  games?: Maybe<Array<Maybe<GameType>>>;
  idleGames?: Maybe<Array<Maybe<GameType>>>;
  players?: Maybe<Array<Maybe<PlayerType>>>;
  playersById?: Maybe<PlayerType>;
};


export type QueryActiveGamesOfPlayerArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryPlayersByIdArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Subscriptions = {
  onGamePlay?: Maybe<GamePlaySubscription>;
  onJoinGame?: Maybe<JoinGameSubscription>;
  onNewGame?: Maybe<NewGameSubscription>;
};


export type SubscriptionsOnGamePlayArgs = {
  gameId: Scalars['ID'];
};


export type SubscriptionsOnJoinGameArgs = {
  gameId: Scalars['ID'];
};

export type NewGameMutationMutationVariables = Exact<{
  playerId: Scalars['ID'];
}>;


export type NewGameMutationMutation = { createGame?: { game?: GameFragment | null } | null };

export type CreatePlayerMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreatePlayerMutation = { createPlayer?: { player?: PlayerFragment | null } | null };

export type JoinGameMutationMutationVariables = Exact<{
  gameId: Scalars['ID'];
  playerId: Scalars['ID'];
}>;


export type JoinGameMutationMutation = { joinGame?: { game?: GameFragment | null } | null };

export type StartGameMutationVariables = Exact<{
  gameId: Scalars['ID'];
  playerId: Scalars['ID'];
  x: Scalars['Int'];
  y: Scalars['Int'];
}>;


export type StartGameMutation = { gamePlay?: { message?: string | null } | null };

export type PlayerFragment = { name: string, id: string };

export type GameFragment = { id: string, ownerMark: GameOwnerMark, opponentMark: GameOpponentMark, owner?: PlayerFragment | null, opponent?: PlayerFragment | null };

export type YourGamesQueryVariables = Exact<{
  playerId?: InputMaybe<Scalars['ID']>;
}>;


export type YourGamesQuery = { activeGamesOfPlayer?: Array<GameFragment | null> | null };

export type IdleGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type IdleGamesQuery = { idleGames?: Array<GameFragment | null> | null };

export type PlayerByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type PlayerByIdQuery = { playersById?: PlayerFragment | null };

export type OnNewGameSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnNewGameSubscription = { onNewGame?: { event?: GameFragment | null } | null };

export type OnJoinGameSubscriptionVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type OnJoinGameSubscription = { onJoinGame?: { event?: GameFragment | null } | null };

export type OnGamePlayeSubscriptionVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type OnGamePlayeSubscription = { onGamePlay?: { grid?: Array<Array<string | null> | null> | null, game?: GameFragment | null } | null };

export const PlayerFragmentDoc = gql`
    fragment Player on PlayerType {
  name
  id
}
    `;
export const GameFragmentDoc = gql`
    fragment Game on GameType {
  id
  owner {
    ...Player
  }
  opponent {
    ...Player
  }
  ownerMark
  opponentMark
}
    ${PlayerFragmentDoc}`;
export const NewGameMutationDocument = gql`
    mutation NewGameMutation($playerId: ID!) {
  createGame(player1: $playerId) {
    game {
      ...Game
    }
  }
}
    ${GameFragmentDoc}`;

export function useNewGameMutationMutation() {
  return Urql.useMutation<NewGameMutationMutation, NewGameMutationMutationVariables>(NewGameMutationDocument);
};
export const CreatePlayerDocument = gql`
    mutation CreatePlayer($name: String!) {
  createPlayer(name: $name) {
    player {
      ...Player
    }
  }
}
    ${PlayerFragmentDoc}`;

export function useCreatePlayerMutation() {
  return Urql.useMutation<CreatePlayerMutation, CreatePlayerMutationVariables>(CreatePlayerDocument);
};
export const JoinGameMutationDocument = gql`
    mutation JoinGameMutation($gameId: ID!, $playerId: ID!) {
  joinGame(gameId: $gameId, playerId: $playerId) {
    game {
      ...Game
    }
  }
}
    ${GameFragmentDoc}`;

export function useJoinGameMutationMutation() {
  return Urql.useMutation<JoinGameMutationMutation, JoinGameMutationMutationVariables>(JoinGameMutationDocument);
};
export const StartGameDocument = gql`
    mutation StartGame($gameId: ID!, $playerId: ID!, $x: Int!, $y: Int!) {
  gamePlay(gameId: $gameId, playerId: $playerId, x: $x, y: $y) {
    message
  }
}
    `;

export function useStartGameMutation() {
  return Urql.useMutation<StartGameMutation, StartGameMutationVariables>(StartGameDocument);
};
export const YourGamesDocument = gql`
    query YourGames($playerId: ID) {
  activeGamesOfPlayer(id: $playerId) {
    ...Game
  }
}
    ${GameFragmentDoc}`;

export function useYourGamesQuery(options?: Omit<Urql.UseQueryArgs<YourGamesQueryVariables>, 'query'>) {
  return Urql.useQuery<YourGamesQuery>({ query: YourGamesDocument, ...options });
};
export const IdleGamesDocument = gql`
    query IdleGames {
  idleGames {
    ...Game
  }
}
    ${GameFragmentDoc}`;

export function useIdleGamesQuery(options?: Omit<Urql.UseQueryArgs<IdleGamesQueryVariables>, 'query'>) {
  return Urql.useQuery<IdleGamesQuery>({ query: IdleGamesDocument, ...options });
};
export const PlayerByIdDocument = gql`
    query PlayerById($id: Int) {
  playersById(id: $id) {
    ...Player
  }
}
    ${PlayerFragmentDoc}`;

export function usePlayerByIdQuery(options?: Omit<Urql.UseQueryArgs<PlayerByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<PlayerByIdQuery>({ query: PlayerByIdDocument, ...options });
};
export const OnNewGameDocument = gql`
    subscription onNewGame {
  onNewGame {
    event {
      ...Game
    }
  }
}
    ${GameFragmentDoc}`;

export function useOnNewGameSubscription<TData = OnNewGameSubscription>(options: Omit<Urql.UseSubscriptionArgs<OnNewGameSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<OnNewGameSubscription, TData>) {
  return Urql.useSubscription<OnNewGameSubscription, TData, OnNewGameSubscriptionVariables>({ query: OnNewGameDocument, ...options }, handler);
};
export const OnJoinGameDocument = gql`
    subscription onJoinGame($gameId: ID!) {
  onJoinGame(gameId: $gameId) {
    event {
      ...Game
    }
  }
}
    ${GameFragmentDoc}`;

export function useOnJoinGameSubscription<TData = OnJoinGameSubscription>(options: Omit<Urql.UseSubscriptionArgs<OnJoinGameSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<OnJoinGameSubscription, TData>) {
  return Urql.useSubscription<OnJoinGameSubscription, TData, OnJoinGameSubscriptionVariables>({ query: OnJoinGameDocument, ...options }, handler);
};
export const OnGamePlayeDocument = gql`
    subscription onGamePlaye($gameId: ID!) {
  onGamePlay(gameId: $gameId) {
    grid
    game {
      ...Game
    }
  }
}
    ${GameFragmentDoc}`;

export function useOnGamePlayeSubscription<TData = OnGamePlayeSubscription>(options: Omit<Urql.UseSubscriptionArgs<OnGamePlayeSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<OnGamePlayeSubscription, TData>) {
  return Urql.useSubscription<OnGamePlayeSubscription, TData, OnGamePlayeSubscriptionVariables>({ query: OnGamePlayeDocument, ...options }, handler);
};