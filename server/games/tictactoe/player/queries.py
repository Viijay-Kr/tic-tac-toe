

import graphene
from tictactoe.models import Player

from tictactoe.player.player import PlayerType


class PlayersQuery(graphene.ObjectType):
    players = graphene.List(PlayerType)
    playersById = graphene.Field(PlayerType, id=graphene.Int())

    def resolve_players(self, info):
        return Player.objects.all()

    def resolve_playersById(self, info, id):
        return Player.objects.get(pk=id)    