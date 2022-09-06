import enum
from django.db import models


class Player(models.Model):
    class PlayerStatus(models.TextChoices):
        IDLE = "idle"
        WAITING = "waiting"
        PLAYING = "playing"
        FINISHED = "finished"

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    status = models.CharField(
        max_length=30, choices=PlayerStatus.choices, default=PlayerStatus.IDLE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Game(models.Model):
    class GameStatus(models.TextChoices):
        IDLE = 'idle'
        IN_PROGRESS = "in_progress"
        FINISHED = "finished"
        ACTIVE = 'active'

    class Mark(models.TextChoices):
        CIRCLE = 'circle'
        CROSS = 'cross'

    id = models.AutoField(primary_key=True)
    players_count = models.IntegerField()
    status = models.CharField(
        max_length=30, choices=GameStatus.choices, default=GameStatus.IDLE)
    owner = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name='owner', null=True)
    opponent = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name='opponent', null=True)
    owner_mark = models.CharField(
        max_length=30, choices=Mark.choices, default=Mark.CIRCLE)
    opponent_mark = models.CharField(
        max_length=30, choices=Mark.choices, default=Mark.CROSS)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
