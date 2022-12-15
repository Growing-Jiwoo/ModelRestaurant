from rest_framework import serializers
from .models import Modelrestaurant

class ModelrestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelrestaurant
        fields = '__all__'
