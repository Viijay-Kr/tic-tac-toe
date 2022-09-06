# Generated by Django 3.2.13 on 2022-05-15 17:29

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('tictactoe', '0004_game_player_1_mark_game_player_2_mark'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='player_1',
        ),
        migrations.RemoveField(
            model_name='game',
            name='player_2',
        ),
        migrations.AddField(
            model_name='game',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='game',
            name='opponent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='opponent', to='tictactoe.player'),
        ),
        migrations.AddField(
            model_name='game',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='owner', to='tictactoe.player'),
        ),
        migrations.AddField(
            model_name='game',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
