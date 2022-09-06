
import graphene

from tictactoe.game.game import GameType
from tictactoe.models import Game


class GamesQuery(graphene.ObjectType):
    games = graphene.List(GameType)
    active_games_of_player = graphene.List(GameType, id=graphene.ID())
    idle_games = graphene.List(GameType)

    def resolve_games(self, info):
        return Game.objects.all().filter(status=Game.GameStatus.ACTIVE)

    def resolve_active_games_of_player(self, info, id):
        return Game.objects.filter(owner=id)

    def resolve_idle_games(self, info):
        return Game.objects.filter(status=Game.GameStatus.IDLE)
