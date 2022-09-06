import channels_graphql_ws
import graphene
from tictactoe.game.game_play import GamePlay, Marks
from tictactoe.game.game import GameType
from tictactoe.models import Game, Player


class JoinGameSubscription(channels_graphql_ws.Subscription):
    class Arguments:
        game_id = graphene.ID(required=True)

    event = graphene.Field(lambda: GameType)

    @staticmethod
    def subscribe(self, info, game_id):
        """Called when user subscribes."""
        # Return the list of subscription group names.
        return ['game_' + str(game_id)]

    @staticmethod
    def publish(payload, info, game_id=None):
        return JoinGameSubscription(event=payload)

    @classmethod
    def on_join_game(cls, game):
        return cls.broadcast(group='game_'+str(game.id), payload=game)


class NewGameSubscription(channels_graphql_ws.Subscription):
    event = graphene.Field(lambda: GameType)

    @staticmethod
    def subscribe(self, info):
        return ['new_game']

    @staticmethod
    def publish(payload, info):
        return NewGameSubscription(event=payload)

    @classmethod
    def on_new_game(cls, game):
        return cls.broadcast(group='new_game', payload=game)


class GamePlayResult(graphene.ObjectType):
    marks = graphene.List(lambda: Marks)
    game = graphene.Field(lambda: GameType)


class GamePlaySubscription(channels_graphql_ws.Subscription):
    result = graphene.Field(lambda: GamePlayResult)
    games = dict()

    class Arguments:
        game_id = graphene.ID(required=True)

    @staticmethod
    def subscribe(self, info, game_id):
        GamePlaySubscription.games[game_id] = GamePlay(game_id=game_id)
        return ['game_play_'+str(game_id)]

    @staticmethod
    def unsubscribe(self, info, game_id):
        del self.games[game_id]
        return ['game_play_' + str(game_id)]

    @staticmethod
    def publish(payload, info, game_id=None):
        return GamePlaySubscription(result=payload)

    @classmethod
    def on_mark(self, game_id, player_id, x, y):
        game_play = GamePlaySubscription.games.get(game_id)
        active_marks = game_play.on_mark(player_id, x, y)
        return self.broadcast(group='game_play_'+str(game_id), payload={
            'marks': [active_marks],
            'game': game_play.active_game,
        })


class GameSubscriptions(graphene.ObjectType):
    on_join_game = JoinGameSubscription.Field()
    on_new_game = NewGameSubscription.Field()
    on_game_play = GamePlaySubscription.Field()
