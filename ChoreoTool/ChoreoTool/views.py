from email.policy import HTTP
from lib2to3.pgen2 import token
import profile
from tkinter.tix import Form
from requests import Request, post, get
from django.shortcuts import redirect, render
from .serializers import FormationsSerializer, SpotifyTokenSerializer, UserDataSerializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from dotenv import load_dotenv
from .util import get_user_tokens, update_or_create_user_tokens, is_spotify_authenticated
from .models import SpotifyToken, UserData, Formations
import os

load_dotenv()

AUTH_URL = os.environ.get('AUTH_URL')
REDIRECT_URI = os.environ.get('REDIRECT_URI')
CLIENT_ID = os.environ.get('CLIENT_ID')
CLIENT_SECRET = os.environ.get('CLIENT_SECRET')

@api_view(['GET'])
def AuthURL(request, format = None):
    if request.method == 'GET':
        print(request.session.session_key)
        scopes = 'user-library-read user-read-email playlist-read-private'
        url = Request('GET', AUTH_URL, params= {
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
        }).prepare().url
        return Response({'url':url}, status=status.HTTP_200_OK)

@api_view(['GET'])
def spotifyCallback(request, format = None):
    if request.method == 'GET':
        code = request.GET.get('code')
        error = request.GET.get('error')

        response = post('https://accounts.spotify.com/api/token', data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }).json()

        access_token = response.get('access_token')
        token_type = response.get('token_type')
        refresh_token = response.get('refresh_token')
        expires_in = response.get('expires_in')
        error = response.get('error')

        print(refresh_token)

        if not request.session.exists(request.session.session_key):
            request.session.create()
        print(request.session.session_key)
        update_or_create_user_tokens(
            request.session.session_key, access_token, token_type, expires_in, refresh_token)

        return redirect('frontend:')


@api_view(['GET'])
def IsAuthenticated(request, format = None):
    is_authenticate = is_spotify_authenticated(request.session.session_key)
    tokens = get_user_tokens(request.session.session_key)
    if tokens:
        expires = tokens.expires_in
        return Response({'status': is_authenticate, 'expires':expires}, status.HTTP_200_OK)
    return Response({'status': is_authenticate}, status.HTTP_200_OK)

@api_view(['GET'])
def LogOut(request, format = None):
    tokens = get_user_tokens(request.session.session_key)
    tokens.delete()
    return Response({'status': False}, status.HTTP_200_OK)

@api_view(['GET'])
def getUsers(request):
    userTokens = get_user_tokens(request.session.session_key)
    if (userTokens):
        spotifyAccessToken = userTokens.access_token
    else:
        return Response({'status':False})
    userData = get("https://api.spotify.com/v1/me",headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + spotifyAccessToken,
    }).json()
    data = {
        'user': request.session.session_key,
        'spotifyId' : userData.get('id'),
        'displayName' : userData.get('display_name'),
        'profilePic' : userData.get('images')[0].get('url')
    }
    user = UserData.objects.filter(spotifyId=data['spotifyId'])
    if len(user) < 1:
        user = UserData(user=data['user'], spotifyId=data['spotifyId'], displayName=data['displayName'], profilePic=data['profilePic'])
        user.save()
    else:
        user[0].user = request.session.session_key
        user[0].save(update_fields=['user'])
    serializer = UserDataSerializer(user[0])
    return Response({'data':serializer.data}, status.HTTP_200_OK)

@api_view(['GET'])
def getAllUsers(request):
    data = UserData.objects.all()
    serializer = UserDataSerializer(data, many=True)
    print(data)
    return Response({'data':serializer.data}, status.HTTP_200_OK)

@api_view(['GET'])
def getTokens(request):
    print(get_user_tokens("rzy46klsf3m3ak7bl28bdvc3y70dlutq").refresh_token)
    tokens = SpotifyToken.objects.all()
    serializer = SpotifyTokenSerializer(tokens, many=True)
    # tokens = SpotifyToken(user=session_id, access_token=access_token, 
    #                             refresh_token=10, token_type=token_type, expires_in=expires_in)
    return Response({'data':serializer.data}, status.HTTP_200_OK)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def formations(request):
    user__in = UserData.objects.get(user=request.session.session_key)
    if request.method == 'GET':
        formations = Formations.objects.filter(user=user__in)
        serializer = FormationsSerializer(formations, many=True)
        if formations:
            return Response({'data':serializer.data}, status.HTTP_200_OK)
        return Response({'data':0}, status.HTTP_200_OK)
    elif request.method == 'POST':
        formation = Formations(formations=request.data['formations'], user=user__in, title=request.data['title'])
        formation.save()
        return Response({'data': request.data})
    elif request.method == 'PUT':
        data = request.data
        formation = Formations.objects.get(id=data['id'])
        formation.formations = data['formations']
        formation.title = data['title']
        formation.save()

        serializer = FormationsSerializer(formation)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        formation = Formations.objects.get(id=request.data['id'])
        formation.delete()
        return Response(status=status.HTTP_200_OK)

        

@api_view(['GET'])
def test(request):
    formations = Formations.objects.all()
    serializer = FormationsSerializer(formations, many=True)
    return Response(serializer.data, status.HTTP_200_OK)