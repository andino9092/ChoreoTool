from django.urls import path
from django.views.generic import TemplateView
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('create', index),
    path('dashboard', index),
    path('infoPage', index),
]
