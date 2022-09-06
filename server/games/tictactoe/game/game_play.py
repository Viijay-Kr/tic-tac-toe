from array import *
from telnetlib import GA

from graphene import ObjectType
import graphene
from tictactoe.game.game import GameType
from tictactoe.models import Game, Player


class Circle(ObjectType):
    name = Game.Mark.CIRCLE
    value = graphene.List(graphene.Int)


class Cross(ObjectType):
    name = Game.Mark.CROSS
    value = graphene.List(graphene.Int)


def contains(list, filter):
    for x in list:
        if filter(x):
            return True
    return False


class Marks(graphene.Union):
    class Meta:
        types = (Circle, Cross)

    @classmethod
    def resolve_type(cls, instance, info):
        print(instance)
        if instance['name'] == Game.Mark.CIRCLE:
            return Circle
        if instance['name'] == Game.Mark.CROSS:
            return Cross


class GamePlay(ObjectType):
    grid = graphene.List(graphene.List(graphene.String))
    game = graphene.Field(GameType)
    marks = graphene.Field(Marks)

    def __init__(self, *args, game_id):
        self.active_game = Game.objects.get(pk=game_id)
        self.active_grid = [['', '', ''], ['', '', ''], ['', '', '']]
        self.active_marks = dict({Game.Mark.CIRCLE: [], Game.Mark.CROSS: []})
        super().__init__(*args)

    def resolve_grid(self, info):
        return self.active_grid

    def resolve_game(self, info):
        return self.active_game

    def mark_grid(self, x, y, mark):
        self.active_grid[x][y] = mark

    def is_owner(self, player_id):
        player = Player.objects.get(pk=player_id)
        return self.active_game.owner == player

    def is_opponent(self, player_id):
        player = Player.objects.get(pk=player_id)
        return self.active_game.opponent == player

    def get_mark(self, player_id):
        is_owner = self.is_owner(player_id)
        is_opponent = self.is_opponent(player_id)
        mark = None
        if is_owner:
            mark = self.active_game.owner_mark
        if is_opponent:
            mark = self.active_game.opponent_mark
        return mark

    def on_mark(self, player_id, x, y):
        mark = self.get_mark(player_id)
        self.mark_grid(x, y, mark)
        box = 1
        for i in range(x):
            print(box)
            for j in range(3):
                box += 1

        self.active_marks[mark].append(box)
        return {"name": mark, "value": self.active_marks[mark]}
