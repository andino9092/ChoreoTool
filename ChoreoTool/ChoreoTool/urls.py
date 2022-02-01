from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('authorize/', views.AuthURL),
    path('redirect', views.spotifyCallback),
    path('isAuthenticated/', views.IsAuthenticated),
    path('getData/', views.Data.as_view())
]