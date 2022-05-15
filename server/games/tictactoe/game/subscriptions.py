from tokenize import group
import channels_graphql_ws
import graphene
from tictactoe.game.game import GameType


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


class GameSubscriptions(graphene.ObjectType):
    on_join_game = JoinGameSubscription.Field()
    on_new_game = NewGameSubscription.Field()
