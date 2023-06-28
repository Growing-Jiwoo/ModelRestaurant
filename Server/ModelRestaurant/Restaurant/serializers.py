from rest_framework import serializers
from .models import Modelrestaurant
from .models import User

class ModelrestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelrestaurant
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')

class ModelrestaurantViewCntSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelrestaurant
        fields = ['viewcnt']