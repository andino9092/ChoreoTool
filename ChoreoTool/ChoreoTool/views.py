from tkinter import N
from requests import Request, post
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from dotenv import load_dotenv
from .util import update_or_create_user_tokens, is_spotify_authenticated
import os

load_dotenv()

AUTH_URL = os.environ.get('AUTH_URL')
REDIRECT_URI = os.environ.get('REDIRECT_URI')
CLIENT_ID = os.environ.get('CLIENT_ID')

@api_view(['GET'])
def AuthURL(request, format = None):
    if request.method == 'GET':
        scopes = 'user-library-read user-read-email playlist-read-private'
        print(os.environ.get('AUTH_URL'))
        url = Request('GET', AUTH_URL, params= {
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
        }).prepare().url
        print(url)

        return Response({'url':url}, status=status.HTTP_200_OK)

def spotifyCallback(request, format = None):
    print("hello")
    code = request.GET.get('code')
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type' : 'authorization_code',
        'code' : code,
        'redirect_uri' : os.environ.get('REDIRECT_URI'),
        'client_id': os.environ.get('CLIENT_ID'),
        'client_secret': os.environ.get('CLIENT_SECRET'),
    }).json()


    print(response)

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()
    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect("frontend:")

@api_view(['GET'])
def IsAuthenticated(request, format = None):
    is_authenticate = is_spotify_authenticated(request.session.session_key)
    return Response({'status': is_authenticate}, status.HTTP_200_OK)

class Data(APIView):
    def currentUser(request):
        user = request.user 
        return Response({'user': user})