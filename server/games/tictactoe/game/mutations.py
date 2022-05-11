import logging
import graphene
from tictactoe.models import Player
from tictactoe.player.player import PlayerType
from tictactoe.models import Game

from tictactoe.game.game import GameType


class CreateGame(graphene.Mutation):
  class Arguments:
      player_1 = graphene.ID(required=True)
  
  game = graphene.Field(lambda: GameType)
  
  def mutate(root, info, player_1):
    game = Game()
    player = Player.objects.get(pk=player_1)
    game = Game(
      id=None,
      player_1=player,
    )
    game.players_count = 1
    game.save()
    return CreateGame(game=game)

class GameMutation(graphene.ObjectType):
  create_game = CreateGame.Field()
