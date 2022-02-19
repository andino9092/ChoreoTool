from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('authorize/', views.AuthURL),
    path('redirect', views.spotifyCallback),
    path('isAuthenticated/', views.IsAuthenticated),
    path('getUsers/', views.getUsers),
    path('getTokens/', views.getTokens),
    path('getAllUsers/', views.getAllUsers),
    path('formations/', views.formations),
    path('test', views.test),
]