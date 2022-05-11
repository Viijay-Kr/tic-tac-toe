import graphene
from tictactoe.player.mutations import PlayerMutation
from tictactoe.game.mutations import GameMutation
from tictactoe.game.queries import GamesQuery
from tictactoe.player.queries import PlayersQuery


class Query(GamesQuery, PlayersQuery, graphene.ObjectType):
    pass

class Mutation(GameMutation,PlayerMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query,mutation=Mutation)    