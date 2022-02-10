from rest_framework import serializers
from .models import SpotifyToken, UserData, Formations

class SpotifyTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotifyToken
        fields = ('user', 'created_at', 'refresh_token', 'access_token', 'expires_in', 'token_type')

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ('spotifyId', 'displayName', 'profilePic')