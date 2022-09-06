import logging
import graphene
from tictactoe.game.subscriptions import GamePlaySubscription
from tictactoe.models import Player
from tictactoe.models import Game
from tictactoe.game.subscriptions import JoinGameSubscription, NewGameSubscription
from tictactoe.game.game import GameType


class CreateGame(graphene.Mutation):
    class Arguments:
        player_1 = graphene.ID(required=True)

    game = graphene.Field(lambda: GameType)

    def mutate(root, info, player_1):
        player = Player.objects.get(pk=player_1)
        game = Game()
        game.owner = player
        game.players_count = 1
        game.save()
        NewGameSubscription.on_new_game(game)
        return CreateGame(game=game)


class JoinGameMutation(graphene.Mutation):
    class Arguments:
        game_id = graphene.ID(required=True)
        player_id = graphene.ID(required=True)

    game = graphene.Field(lambda: GameType)

    def mutate(root, info, game_id, player_id):
        game = Game.objects.get(pk=game_id)
        player = Player.objects.get(pk=player_id)
        game.opponent = player
        game.players_count = game.players_count + 1
        game.status = Game.GameStatus.ACTIVE
        game.save()
        JoinGameSubscription.on_join_game(game)
        return JoinGameMutation(game=game)


class GamePlayMutation(graphene.Mutation):
    class Arguments:
        game_id = graphene.ID(required=True)
        player_id = graphene.ID(required=True)
        x = graphene.Int(required=True)
        y = graphene.Int(required=True)

    message = graphene.String()

    def mutate(root, _, game_id, player_id, x, y):
        game = Game.objects.get(pk=game_id)
        if game.status == Game.GameStatus.ACTIVE:
            GamePlaySubscription.on_mark(
                game_id=game_id, player_id=player_id, x=x, y=y)
            GamePlayMutation.message = "Game is active"
        else:
            GamePlayMutation.message = "Game is not active"
        return GamePlayMutation(message=GamePlayMutation.message)


class GameMutation(graphene.ObjectType):
    create_game = CreateGame.Field()
    join_game = JoinGameMutation.Field()
    game_play = GamePlayMutation.Field()
