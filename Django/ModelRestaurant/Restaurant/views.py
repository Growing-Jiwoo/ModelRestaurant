#views.py
from .models import Modelrestaurant
from .serializers import ModelrestaurantSerializer
from rest_framework import viewsets

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Modelrestaurant.objects.all()
    serializer_class = ModelrestaurantSerializer