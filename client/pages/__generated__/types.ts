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
  __typename?: 'CreateGame';
  game?: Maybe<GameType>;
};

export type CreatePlayer = {
  __typename?: 'CreatePlayer';
  player?: Maybe<PlayerType>;
};

/** An enumeration. */
export enum GamePlayer1Mark {
  /** Circle */
  Circle = 'CIRCLE',
  /** Cross */
  Cross = 'CROSS'
}

/** An enumeration. */
export enum GamePlayer2Mark {
  /** Circle */
  Circle = 'CIRCLE',
  /** Cross */
  Cross = 'CROSS'
}

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
  __typename?: 'GameType';
  id: Scalars['ID'];
  player1?: Maybe<PlayerType>;
  player1Mark: GamePlayer1Mark;
  player2?: Maybe<PlayerType>;
  player2Mark: GamePlayer2Mark;
  playersCount: Scalars['Int'];
  status: GameStatus;
};

export type JoinGameMutation = {
  __typename?: 'JoinGameMutation';
  game?: Maybe<GameType>;
};

export type JoinGameSubscription = {
  __typename?: 'JoinGameSubscription';
  event?: Maybe<GameType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame?: Maybe<CreateGame>;
  createPlayer?: Maybe<CreatePlayer>;
  joinGame?: Maybe<JoinGameMutation>;
};


export type MutationCreateGameArgs = {
  player1: Scalars['ID'];
};


export type MutationCreatePlayerArgs = {
  name: Scalars['String'];
};


export type MutationJoinGameArgs = {
  gameId: Scalars['ID'];
  playerId: Scalars['ID'];
};

export type NewGameSubscription = {
  __typename?: 'NewGameSubscription';
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
  __typename?: 'PlayerType';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  player1: Array<GameType>;
  player2: Array<GameType>;
  status: PlayerStatus;
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
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
  __typename?: 'Subscriptions';
  onJoinGame?: Maybe<JoinGameSubscription>;
  onNewGame?: Maybe<NewGameSubscription>;
};


export type SubscriptionsOnJoinGameArgs = {
  gameId: Scalars['ID'];
};

export type NewGameMutationMutationVariables = Exact<{
  playerId: Scalars['ID'];
}>;


export type NewGameMutationMutation = { __typename?: 'Mutation', createGame?: { __typename?: 'CreateGame', game?: { __typename?: 'GameType', id: string, player1?: { __typename?: 'PlayerType', name: string, id: string } | null, player2?: { __typename?: 'PlayerType', name: string, id: string } | null } | null } | null };

export type CreatePlayerMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreatePlayerMutation = { __typename?: 'Mutation', createPlayer?: { __typename?: 'CreatePlayer', player?: { __typename?: 'PlayerType', name: string, id: string, status: PlayerStatus } | null } | null };

export type JoinGameMutationMutationVariables = Exact<{
  gameId: Scalars['ID'];
  playerId: Scalars['ID'];
}>;


export type JoinGameMutationMutation = { __typename?: 'Mutation', joinGame?: { __typename?: 'JoinGameMutation', game?: { __typename?: 'GameType', id: string, player1Mark: GamePlayer1Mark, player2Mark: GamePlayer2Mark, player1?: { __typename?: 'PlayerType', name: string, id: string } | null, player2?: { __typename?: 'PlayerType', name: string, id: string } | null } | null } | null };

export type PlayerFragment = { __typename?: 'PlayerType', name: string, id: string };

export type YourGamesQueryVariables = Exact<{
  playerId?: InputMaybe<Scalars['ID']>;
}>;


export type YourGamesQuery = { __typename?: 'Query', activeGamesOfPlayer?: Array<{ __typename?: 'GameType', id: string, playersCount: number, player1Mark: GamePlayer1Mark, player1?: { __typename?: 'PlayerType', name: string, id: string } | null, player2?: { __typename?: 'PlayerType', name: string, id: string } | null } | null> | null };

export type IdleGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type IdleGamesQuery = { __typename?: 'Query', idleGames?: Array<{ __typename?: 'GameType', id: string, playersCount: number, player1?: { __typename?: 'PlayerType', name: string, id: string } | null } | null> | null };

export type ActiveGamesOfPlayerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ActiveGamesOfPlayerQuery = { __typename?: 'Query', activeGamesOfPlayer?: Array<{ __typename?: 'GameType', id: string, player1?: { __typename?: 'PlayerType', name: string, id: string } | null, player2?: { __typename?: 'PlayerType', name: string, id: string } | null } | null> | null };

export type PlayerByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type PlayerByIdQuery = { __typename?: 'Query', playersById?: { __typename?: 'PlayerType', name: string, id: string } | null };

export type OnNewGameSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnNewGameSubscriptionSubscription = { __typename?: 'Subscriptions', onNewGame?: { __typename?: 'NewGameSubscription', event?: { __typename?: 'GameType', id: string, player1?: { __typename?: 'PlayerType', name: string, id: string } | null } | null } | null };

export type OnJoinGameSubscriptionSubscriptionVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type OnJoinGameSubscriptionSubscription = { __typename?: 'Subscriptions', onJoinGame?: { __typename?: 'JoinGameSubscription', event?: { __typename?: 'GameType', id: string, player2?: { __typename?: 'PlayerType', name: string, id: string } | null } | null } | null };

export const PlayerFragmentDoc = gql`
    fragment Player on PlayerType {
  name
  id
}
    `;
export const NewGameMutationDocument = gql`
    mutation NewGameMutation($playerId: ID!) {
  createGame(player1: $playerId) {
    game {
      id
      player1 {
        ...Player
      }
      player2 {
        ...Player
      }
    }
  }
}
    ${PlayerFragmentDoc}`;

export function useNewGameMutationMutation() {
  return Urql.useMutation<NewGameMutationMutation, NewGameMutationMutationVariables>(NewGameMutationDocument);
};
export const CreatePlayerDocument = gql`
    mutation CreatePlayer($name: String!) {
  createPlayer(name: $name) {
    player {
      name
      id
      status
    }
  }
}
    `;

export function useCreatePlayerMutation() {
  return Urql.useMutation<CreatePlayerMutation, CreatePlayerMutationVariables>(CreatePlayerDocument);
};
export const JoinGameMutationDocument = gql`
    mutation JoinGameMutation($gameId: ID!, $playerId: ID!) {
  joinGame(gameId: $gameId, playerId: $playerId) {
    game {
      id
      player1 {
        ...Player
      }
      player2 {
        ...Player
      }
      player1Mark
      player2Mark
    }
  }
}
    ${PlayerFragmentDoc}`;

export function useJoinGameMutationMutation() {
  return Urql.useMutation<JoinGameMutationMutation, JoinGameMutationMutationVariables>(JoinGameMutationDocument);
};
export const YourGamesDocument = gql`
    query YourGames($playerId: ID) {
  activeGamesOfPlayer(id: $playerId) {
    id
    playersCount
    player1 {
      ...Player
    }
    player1Mark
    player2 {
      ...Player
    }
  }
}
    ${PlayerFragmentDoc}`;

export function useYourGamesQuery(options?: Omit<Urql.UseQueryArgs<YourGamesQueryVariables>, 'query'>) {
  return Urql.useQuery<YourGamesQuery>({ query: YourGamesDocument, ...options });
};
export const IdleGamesDocument = gql`
    query IdleGames {
  idleGames {
    id
    playersCount
    player1 {
      ...Player
    }
  }
}
    ${PlayerFragmentDoc}`;

export function useIdleGamesQuery(options?: Omit<Urql.UseQueryArgs<IdleGamesQueryVariables>, 'query'>) {
  return Urql.useQuery<IdleGamesQuery>({ query: IdleGamesDocument, ...options });
};
export const ActiveGamesOfPlayerDocument = gql`
    query ActiveGamesOfPlayer($id: ID!) {
  activeGamesOfPlayer(id: $id) {
    id
    player1 {
      ...Player
    }
    player2 {
      ...Player
    }
  }
}
    ${PlayerFragmentDoc}`;

export function useActiveGamesOfPlayerQuery(options: Omit<Urql.UseQueryArgs<ActiveGamesOfPlayerQueryVariables>, 'query'>) {
  return Urql.useQuery<ActiveGamesOfPlayerQuery>({ query: ActiveGamesOfPlayerDocument, ...options });
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
export const OnNewGameSubscriptionDocument = gql`
    subscription OnNewGameSubscription {
  onNewGame {
    event {
      id
      player1 {
        ...Player
      }
    }
  }
}
    ${PlayerFragmentDoc}`;

export function useOnNewGameSubscriptionSubscription<TData = OnNewGameSubscriptionSubscription>(options: Omit<Urql.UseSubscriptionArgs<OnNewGameSubscriptionSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<OnNewGameSubscriptionSubscription, TData>) {
  return Urql.useSubscription<OnNewGameSubscriptionSubscription, TData, OnNewGameSubscriptionSubscriptionVariables>({ query: OnNewGameSubscriptionDocument, ...options }, handler);
};
export const OnJoinGameSubscriptionDocument = gql`
    subscription onJoinGameSubscription($gameId: ID!) {
  onJoinGame(gameId: $gameId) {
    event {
      id
      player2 {
        ...Player
      }
    }
  }
}
    ${PlayerFragmentDoc}`;

export function useOnJoinGameSubscriptionSubscription<TData = OnJoinGameSubscriptionSubscription>(options: Omit<Urql.UseSubscriptionArgs<OnJoinGameSubscriptionSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<OnJoinGameSubscriptionSubscription, TData>) {
  return Urql.useSubscription<OnJoinGameSubscriptionSubscription, TData, OnJoinGameSubscriptionSubscriptionVariables>({ query: OnJoinGameSubscriptionDocument, ...options }, handler);
};