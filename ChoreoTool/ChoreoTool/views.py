from requests import Request, post
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os

@api_view(['GET'])
def AuthURL(request):
    if request.method == 'GET':
        scopes = 'user-library-read user-read-email playlist-read-private'

        url = Request('GET', os.environ.get('AUTH_URL'), params= {
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': os.environ.get('REDIRECT_URI'),
            'client_id': os.environ.get('CLIENT_ID'),
        }).prepare().url

        return Response({'url':url}, status=status.HTTP_200_OK)

