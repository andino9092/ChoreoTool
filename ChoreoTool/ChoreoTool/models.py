from pyexpat import model
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

class UserData(models.Model):
    spotifyId = models.CharField(max_length=64)

class Formations(models.Model):
    formations = ArrayField(
        ArrayField(
            ArrayField(
                models.IntegerField(),
                size = 2,
            )
        )
    )
    user = models.ForeignKey(
        UserData,
        on_delete=models.CASCADE,
    )