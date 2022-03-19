from rest_framework import serializers
from .models import SpotifyToken, UserData, Formations

class SpotifyTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotifyToken
        fields = ('user', 'created_at', 'refresh_token', 'access_token', 'expires_in', 'token_type')

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ('user', 'spotifyId', 'displayName', 'profilePic', 'formationNum')

class FormationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formations
        fields = ('id', 'title', 'formations', 'user')