from tokenize import group
import channels_graphql_ws
import graphene

from tictactoe.models import Game, Player


class JoinGame(channels_graphql_ws.Subscription):
    class Arguments:
        game_id = graphene.ID(required=True)

    event = graphene.String()

    @staticmethod
    def subscribe(self, info, game_id):
        """Called when user subscribes."""
        # Return the list of subscription group names.
        return ['game_' + str(game_id)]

    @staticmethod
    def publish(payload, info):
        return JoinGame(event=payload)

    @classmethod
    def on_join_game(cls, game_id, player_id):
        return cls.broadcast(group='game_'+str(game_id), payload={"event": "join_game", "game_id": game_id, "player_id": player_id})


class GameSubscriptions(graphene.ObjectType):
    on_join_game = JoinGame.Field()
