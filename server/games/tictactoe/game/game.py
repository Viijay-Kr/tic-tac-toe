from graphene_django import DjangoObjectType
from tictactoe.models import Game 

class GameType(DjangoObjectType):
    class Meta:
        model = Game
        fields = '__all__'
        