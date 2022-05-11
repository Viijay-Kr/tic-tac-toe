
import graphene
from tictactoe.models import Player

from tictactoe.player.player import PlayerType


class CreatePlayer(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)

    player = graphene.Field(lambda:PlayerType)

    def mutate(root, info, name):
        player = Player(name=name)
        player.save()
        return CreatePlayer(player=player)

class PlayerMutation(graphene.ObjectType):
    create_player = CreatePlayer.Field()