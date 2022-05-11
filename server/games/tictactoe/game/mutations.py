import logging
import graphene
from tictactoe.models import Player
from tictactoe.models import Game
from tictactoe.game.subscriptions import JoinGameSubscription
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


class JoinGameMutation(graphene.Mutation):
    class Arguments:
        game_id = graphene.ID(required=True)
        player_id = graphene.ID(required=True)

    game = graphene.Field(lambda: GameType)

    def mutate(root, info, game_id, player_id):
        game = Game.objects.get(pk=game_id)
        player = Player.objects.get(pk=player_id)
        game.player_2 = player
        game.players_count = game.players_count + 1
        game.status = Game.GameStatus.ACTIVE
        game.save()
        JoinGameSubscription.on_join_game(game)
        return JoinGameMutation(game=game)


class GameMutation(graphene.ObjectType):
    create_game = CreateGame.Field()
    join_game = JoinGameMutation.Field()
