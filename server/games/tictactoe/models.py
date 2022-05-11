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

    class PlayerMark(models.TextChoices):
        CIRCLE = 'circle'
        CROSS = 'cross'

    id = models.AutoField(primary_key=True)
    players_count = models.IntegerField()
    status = models.CharField(
        max_length=30, choices=GameStatus.choices, default=GameStatus.IDLE)
    player_1 = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name='player_1', null=True)
    player_2 = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name='player_2', null=True)
    player_1_mark = models.CharField(
        max_length=30, choices=PlayerMark.choices, default=PlayerMark.CIRCLE)
    player_2_mark = models.CharField(
        max_length=30, choices=PlayerMark.choices, default=PlayerMark.CROSS)
