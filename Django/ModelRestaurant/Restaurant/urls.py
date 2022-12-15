from django.urls import path
from .views import Restaurant

urlpatterns = [
  path('Restaurant/', Restaurant, name='Restaurant'),
]