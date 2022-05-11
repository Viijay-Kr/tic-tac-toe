
from graphene_django import DjangoObjectType
from tictactoe.models import Player


class PlayerType(DjangoObjectType):
    class Meta:
        model = Player
        fields = '__all__'